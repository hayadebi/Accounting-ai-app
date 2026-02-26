'use strict';

const CFG = {
  ADMIN_EMAIL:   'devilnessie@gmail.com',
  ADMIN_WALLET:  '0x8592e5eB9896d928612e3935862c8DA794723e0f', 
  CACHE_MS:      10 * 60 * 1000,  
  MAX_INQUIRY:   1,                
  SHEET: {
    USERS:       'users',
    USERNAMES:   'usernames',
    QUESTS:      'quests',
    SUBMISSIONS: 'submissions'
  }
};

const App = {
  user:           null,   
  userCachedAt:   null,   
  quests:         [],     
  questsLoaded:   false
};

const api = GASStorage.createSimpleAPI();

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function linkify(s) {
  if (s == null) return '';
  const escaped = esc(s);
  return escaped.replace(
    /(https?:\/\/[^\s<>"&]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="steps-link">$1</a>'
  );
}

async function sha256(msg) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,9); }

function today() { return new Date().toISOString().slice(0,10); }

function now() { return new Date().toISOString(); }

function isValidEth(addr) { return /^0x[0-9a-fA-F]{40}$/.test(addr); }

function isValidName(n) { return /^[a-zA-Z0-9_]{3,20}$/.test(n); }

function recruitLabel(type, days) {
  if (type === 'once')     return '1人1回のみ';
  if (type === 'interval') return `${days}日ごと受注可`;
  return type || '通常';
}

const Q_LABELS = {
  pet:    '最初に飼ったペットの名前は？',
  school: '最初に通った小学校の名前は？',
  city:   '生まれた街の名前は？',
  hero:   '子供の頃の憧れの人物は？',
  food:   '一番好きな食べ物は？'
};

let _toastTimer = null;
function showToast(msg, duration=3200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

let _loadingCount = 0;
function startLoading(txt='処理中...') {
  _loadingCount++;
  document.getElementById('loading-text').textContent = txt;
  document.getElementById('loading-overlay').classList.add('show');
}
function endLoading() {
  _loadingCount = Math.max(0, _loadingCount - 1);
  if (_loadingCount === 0)
    document.getElementById('loading-overlay').classList.remove('show');
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  if (id === 'modal-account')     renderAccount();
  if (id === 'modal-submissions') loadSubmissions();
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
function switchModal(a, b) { closeModal(a); openModal(b); }

function toggleDropdown(e) {
  e.stopPropagation();
  document.getElementById('user-dropdown').classList.toggle('open');
}

document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
});

document.querySelectorAll('.modal-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
});

function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }

function updateNavUI() {
  if (App.user) {
    document.getElementById('nav-guest').style.display = 'none';
    document.getElementById('nav-user').style.display  = 'flex';
    document.getElementById('nav-uname').textContent   = App.user.accountName;
  } else {
    document.getElementById('nav-guest').style.display = 'flex';
    document.getElementById('nav-user').style.display  = 'none';
  }
}

async function doRegister(e) {
  e.preventDefault();
  const wallet = document.getElementById('reg-wallet').value.trim();
  const uname  = document.getElementById('reg-uname').value.trim();
  const pw     = document.getElementById('reg-pw').value;
  const pw2    = document.getElementById('reg-pw2').value;
  const q      = document.getElementById('reg-q').value;
  const ans    = document.getElementById('reg-ans').value.trim();

  ['err-reg-wallet','err-reg-uname','err-reg-pw','err-reg-general']
    .forEach(id => { document.getElementById(id).textContent = ''; });

  if (!isValidEth(wallet)) {
    document.getElementById('err-reg-wallet').textContent = '有効な Litecoinネットワーク アドレスを入力してください';
    return;
  }
  if (!isValidName(uname)) {
    document.getElementById('err-reg-uname').textContent = '3〜20 文字の半角英数字・アンダースコアのみ使用できます';
    return;
  }
  if (pw !== pw2) {
    document.getElementById('err-reg-pw').textContent = 'パスワードが一致しません';
    return;
  }
  if (pw.length < 8) {
    document.getElementById('err-reg-pw').textContent = 'パスワードは 8 文字以上必要です';
    return;
  }
  if (!q) {
    document.getElementById('err-reg-general').textContent = '秘密の質問を選択してください';
    return;
  }

  startLoading('登録処理中...');
  try {
    try {
      const r = await api.get(CFG.SHEET.USERS, wallet.toLowerCase());
      if (r) { document.getElementById('err-reg-wallet').textContent = 'このウォレットアドレスは既に登録済みです'; return; }
    } catch (_) { /* 未登録 → OK */ }

    try {
      const r = await api.get(CFG.SHEET.USERNAMES, uname.toLowerCase());
      if (r) { document.getElementById('err-reg-uname').textContent = 'このアカウント名は既に使用されています'; return; }
    } catch (_) { /* 未使用 → OK */ }

    const pwHash  = await sha256(pw + wallet.toLowerCase());
    const ansHash = await sha256(ans.toLowerCase());

    const userData = {
      accountName:     uname,
      passwordHash:    pwHash,
      secretQuestion:  q,
      secretAnswerHash: ansHash,
      walletAddress:   wallet.toLowerCase(),
      submittedCount:  0,
      todayInquiryCount: 0,
      lastLoginDate:   today(),
      updatedAt:       now(),
      createdAt:       now()
    };

    await api.set(CFG.SHEET.USERS,     wallet.toLowerCase(), JSON.stringify(userData));
    await api.set(CFG.SHEET.USERNAMES, uname.toLowerCase(),  wallet.toLowerCase());

    closeModal('modal-register');
    document.getElementById('form-register').reset();
    showToast('⚔ 冒険者登録完了！ログインしてください。');
  } catch (err) {
    console.error('Register:', err);
    document.getElementById('err-reg-general').textContent = '登録中にエラーが発生しました。しばらく後にお試しください。';
  } finally {
    endLoading();
  }
}

async function doLogin(e) {
  e.preventDefault();
  const uname = document.getElementById('login-uname').value.trim();
  const pw    = document.getElementById('login-pw').value;
  document.getElementById('err-login').textContent = '';

  startLoading('ログイン中...');
  try {
    let wallet;
    try { wallet = await api.get(CFG.SHEET.USERNAMES, uname.toLowerCase()); }
    catch (_) { wallet = null; }

    if (!wallet) {
      document.getElementById('err-login').textContent = 'アカウント名またはパスワードが正しくありません';
      return;
    }

    let userDataStr;
    try { userDataStr = await api.get(CFG.SHEET.USERS, wallet); }
    catch (_) {
      document.getElementById('err-login').textContent = 'ユーザーデータの取得に失敗しました';
      return;
    }

    const ud = JSON.parse(userDataStr);
    const hash = await sha256(pw + wallet);
    if (hash !== ud.passwordHash) {
      document.getElementById('err-login').textContent = 'アカウント名またはパスワードが正しくありません';
      return;
    }

    const td = today();
    if (ud.lastLoginDate !== td) { ud.todayInquiryCount = 0; }
    ud.lastLoginDate = td;
    ud.updatedAt = now();
    await api.set(CFG.SHEET.USERS, wallet, JSON.stringify(ud));

    App.user = ud;
    App.userCachedAt = Date.now();

    updateNavUI();
    closeModal('modal-login');
    document.getElementById('form-login').reset();
    showToast(`⚔ ようこそ、${esc(ud.accountName)} 殿！`);
  } catch (err) {
    console.error('Login:', err);
    document.getElementById('err-login').textContent = 'ログイン中にエラーが発生しました';
  } finally {
    endLoading();
  }
}

function doLogout() {
  App.user = null;
  App.userCachedAt = null;
  updateNavUI();
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  showToast('ログアウトしました');
}

async function refreshUserIfNeeded() {
  if (!App.user) return;
  if (App.userCachedAt && Date.now() - App.userCachedAt < CFG.CACHE_MS) return;
  try {
    const s = await api.get(CFG.SHEET.USERS, App.user.walletAddress);
    App.user = JSON.parse(s);
    App.userCachedAt = Date.now();
  } catch (err) { console.error('UserRefresh:', err); }
}

async function doPwReset(e) {
  e.preventDefault();
  const uname  = document.getElementById('reset-uname').value.trim();
  const curPw  = document.getElementById('reset-cur-pw').value;
  const ans    = document.getElementById('reset-ans').value.trim();
  const newPw  = document.getElementById('reset-new-pw').value;
  const newPw2 = document.getElementById('reset-new-pw2').value;
  document.getElementById('err-pw-reset').textContent = '';

  if (newPw !== newPw2) { document.getElementById('err-pw-reset').textContent = '新しいパスワードが一致しません'; return; }
  if (newPw.length < 8) { document.getElementById('err-pw-reset').textContent = '新しいパスワードは 8 文字以上必要です'; return; }

  startLoading('パスワード変更中...');
  try {
    let wallet;
    try { wallet = await api.get(CFG.SHEET.USERNAMES, uname.toLowerCase()); }
    catch (_) { wallet = null; }
    if (!wallet) { document.getElementById('err-pw-reset').textContent = 'アカウントが見つかりません'; return; }

    const s  = await api.get(CFG.SHEET.USERS, wallet);
    const ud = JSON.parse(s);

    const curHash = await sha256(curPw + wallet);
    if (curHash !== ud.passwordHash) { document.getElementById('err-pw-reset').textContent = '現在のパスワードが正しくありません'; return; }

    const ansHash = await sha256(ans.toLowerCase());
    if (ansHash !== ud.secretAnswerHash) { document.getElementById('err-pw-reset').textContent = '秘密の質問の回答が正しくありません'; return; }

    ud.passwordHash = await sha256(newPw + wallet);
    ud.updatedAt = now();
    await api.set(CFG.SHEET.USERS, wallet, JSON.stringify(ud));

    if (App.user && App.user.walletAddress === wallet) App.user = ud;
    closeModal('modal-pw-reset');
    document.getElementById('form-pw-reset').reset();
    showToast('✅ パスワードを変更しました');
  } catch (err) {
    console.error('PwReset:', err);
    document.getElementById('err-pw-reset').textContent = 'エラーが発生しました。もう一度お試しください。';
  } finally {
    endLoading();
  }
}

function renderAccount() {
  if (!App.user) return;
  const u = App.user;
  document.getElementById('account-body').innerHTML = `
    <div class="account-row"><label>アカウント名</label><span>${esc(u.accountName)}</span></div>
    <div class="account-row"><label>ウォレットアドレス</label><span style="font-size:11px">${esc(u.walletAddress)}</span></div>
    <div class="account-row"><label>秘密の質問</label><span>${esc(Q_LABELS[u.secretQuestion]||u.secretQuestion)}</span></div>
    <div class="account-row"><label>累計提出回数</label><span>${u.submittedCount||0} 回</span></div>
    <div class="account-row"><label>本日の問い合わせ</label><span>${u.todayInquiryCount||0} / ${CFG.MAX_INQUIRY} 回</span></div>
    <div class="account-row"><label>最終ログイン</label><span>${esc(u.lastLoginDate)}</span></div>
    <div class="account-row"><label>データ更新日時</label><span>${new Date(u.updatedAt).toLocaleString('ja-JP')}</span></div>
    <div class="warn-box" style="margin-top:14px">
      <h4>⚠ 変更不可項目</h4>
      <p>ウォレットアドレス・アカウント名・秘密の質問は変更できません。</p>
    </div>
  `;
}

async function loadQuests() {
  try {
    const [questResult, subResult] = await Promise.all([
      api.getAll(CFG.SHEET.QUESTS),
      api.getAll(CFG.SHEET.SUBMISSIONS)
    ]);

    const quests = [];
    for (let i = 0; i < questResult.keys.length; i++) {
      if (!questResult.keys[i]) continue;
      try { quests.push(JSON.parse(questResult.values[i])); } catch (_) {}
    }
    App.quests = quests;
    App.questsLoaded = true;
    renderBoard(quests);

    let approvedCount  = 0;
    let approvedReward = 0;
    for (let i = 0; i < subResult.keys.length; i++) {
      if (!subResult.keys[i]) continue;
      try {
        const sub = JSON.parse(subResult.values[i]);
        if (sub.status === 'approved') {
          approvedCount++;
          approvedReward += parseFloat(sub.rewardAmount) || 0;
        }
      } catch (_) {}
    }
    renderStats(approvedCount, approvedReward);

  } catch (err) {
    console.error('LoadQuests:', err);
    document.getElementById('quest-board').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="icon">⚠</div>
        <p>クエストの読み込みに失敗しました。<br>ページを再読み込みしてください。</p>
        <button class="btn btn-gold" style="margin-top:14px" onclick="loadQuests()">再読み込み</button>
      </div>`;
  }
}

function renderStats(count, totalReward) {
  const bar = document.getElementById('stats-bar');
  const rewardStr = totalReward.toFixed(8).replace(/\.?0+$/, '');
  document.getElementById('stat-count').textContent  = count.toLocaleString('ja-JP') + ' 件';
  document.getElementById('stat-reward').textContent = rewardStr + ' LTC';
  bar.style.display = 'block';
}

function renderBoard(quests) {
  const board = document.getElementById('quest-board');
  if (!quests.length) {
    board.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="icon">📋</div>
        <p>現在掲示されているクエストはありません。しばらくお待ちください。</p>
      </div>`;
    return;
  }
  board.innerHTML = quests.map((q, i) => `
    <div class="quest-card" data-idx="${i}">
      <div class="quest-card-top">
        <div>
          <div class="quest-title">${esc(q.title)}</div>
          <span class="quest-type-tag">${esc(recruitLabel(q.recruitType, q.reorderDays))}</span>
        </div>
        <div class="quest-reward-badge">${esc(String(q.reward))} LTC</div>
      </div>
      <div class="quest-desc">${esc((q.description||'').slice(0,90))}${(q.description||'').length>90?'…':''}</div>
      <div class="wax-seal">⚜</div>
    </div>`).join('');

  board.querySelectorAll('.quest-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx, 10);
      openQuestDetail(idx);
    });
  });
}

async function openQuestDetail(idx) {
  const quest = App.quests[idx];
  if (!quest) { showToast('クエストデータが見つかりません'); return; }

  document.getElementById('detail-title').textContent = `⚔ ${quest.title}`;

  document.getElementById('detail-body').innerHTML = `
    <div class="detail-reward">報酬：${esc(String(quest.reward))} LTC</div>
    <div class="detail-section">
      <h4>対象情報</h4>
      <p>${esc(quest.target||'—')}</p>
    </div>
    <div class="detail-section">
      <h4>概要</h4>
      <p>${esc(quest.description||'—')}</p>
    </div>
    <div class="detail-section">
      <h4>手順</h4>
      <p>${linkify(quest.steps||'—')}</p>
    </div>
    <div class="warn-box">
      <h4>⚠ 注意事項（必読）</h4>
      <p>${esc(quest.notes||'なし').replace(/\n/g,'<br>')}</p>
    </div>
    <div class="info-box">
      <p><strong>募集タイプ：</strong>${esc(recruitLabel(quest.recruitType, quest.reorderDays))}</p>
    </div>`;

  const actDiv = document.getElementById('detail-action');
  if (!App.user) {
    actDiv.innerHTML = `
      <p style="font-size:13px;color:var(--sepia-mid);margin-bottom:12px">受注するにはログインが必要です</p>
      <button class="btn btn-gold" id="btn-goto-login">ログインして受注する</button>`;
    document.getElementById('btn-goto-login').addEventListener('click', () => {
      switchModal('modal-quest-detail', 'modal-login');
    });
  } else {
    const check = await canOrder(quest, App.user.walletAddress);
    if (check.ok) {
      actDiv.innerHTML = `<button class="btn btn-gold" id="btn-submit-quest">⚔ 受注＆提出</button>`;
      document.getElementById('btn-submit-quest').addEventListener('click', () => {
        openSubmitModal(idx);
      });
    } else {
      actDiv.innerHTML = `<p style="color:var(--red-warn);font-size:13px;font-weight:600">${esc(check.reason)}</p>`;
    }
  }

  openModal('modal-quest-detail');
}

async function canOrder(quest, wallet) {
  try {
    const res = await api.getAll(CFG.SHEET.SUBMISSIONS);
    let latest = null;
    for (let i = 0; i < res.keys.length; i++) {
      if (!res.keys[i]) continue;
      try {
        const sub = JSON.parse(res.values[i]);
        if (sub.taskId === quest.taskId && sub.walletAddress === wallet) {
          if (!latest || new Date(sub.createdAt) > new Date(latest.createdAt)) latest = sub;
        }
      } catch (_) {}
    }
    if (!latest) return { ok: true };
    if (quest.recruitType === 'once') return { ok: false, reason: 'このクエストは 1 人 1 回のみ受注可能です。既に提出済みです。' };
    if (quest.recruitType === 'interval') {
      const days = (Date.now() - new Date(latest.createdAt)) / 86400000;
      const need = Number(quest.reorderDays) || 1;
      if (days < need) return { ok: false, reason: `再受注まで約 ${Math.ceil(need - days)} 日お待ちください。` };
    }
    return { ok: true };
  } catch (err) {
    console.error('CanOrder:', err);
    return { ok: true }; 
  }
}

function openSubmitModal(idx) {
  const q = App.quests[idx];
  if (!q) return;
  document.getElementById('submit-tid').value = q.taskId;
  document.getElementById('submit-reward-val').value = q.reward;
  document.getElementById('submit-content').value = '';
  document.getElementById('err-submit').textContent = '';
  document.getElementById('submit-quest-info').innerHTML = `
    <p><strong>クエスト：</strong>${esc(q.title)}</p>
    <p><strong>報酬：</strong>${esc(String(q.reward))} LTC</p>`;
  document.getElementById('submit-notes-box').innerHTML = `
    <h4>⚠ 提出前に再確認（注意事項）</h4>
    <p>${esc(q.notes||'なし').replace(/\n/g,'<br>')}</p>`;
  closeModal('modal-quest-detail');
  openModal('modal-submit');
}

async function doSubmitQuest(e) {
  e.preventDefault();
  if (!App.user) { document.getElementById('err-submit').textContent = 'ログインが必要です'; return; }
  const taskId  = document.getElementById('submit-tid').value;
  const reward  = document.getElementById('submit-reward-val').value;
  const content = document.getElementById('submit-content').value.trim();
  document.getElementById('err-submit').textContent = '';
  if (!content) { document.getElementById('err-submit').textContent = '提出内容を入力してください'; return; }

  startLoading('提出中...');
  try {
    const sid  = uid();
    const sub  = {
      submissionId: sid,
      taskId:       taskId,
      rewardAmount: reward,
      content:      content,
      walletAddress: App.user.walletAddress,
      status:       'pending',
      createdAt:    now()
    };
    await api.set(CFG.SHEET.SUBMISSIONS, sid, JSON.stringify(sub));

    App.user.submittedCount = (App.user.submittedCount || 0) + 1;
    App.user.updatedAt = now();
    await api.set(CFG.SHEET.USERS, App.user.walletAddress, JSON.stringify(App.user));

    closeModal('modal-submit');
    openModal('modal-submit-done');
  } catch (err) {
    console.error('Submit:', err);
    document.getElementById('err-submit').textContent = '提出中にエラーが発生しました。もう一度お試しください。';
  } finally {
    endLoading();
  }
}

async function loadSubmissions() {
  if (!App.user) return;
  const body = document.getElementById('submissions-body');
  body.innerHTML = '<div class="empty-state"><div class="spinner" style="margin:0 auto 14px"></div><p>読み込み中...</p></div>';
  try {
    const res  = await api.getAll(CFG.SHEET.SUBMISSIONS);
    const mine = [];
    for (let i = 0; i < res.keys.length; i++) {
      if (!res.keys[i]) continue;
      try {
        const s = JSON.parse(res.values[i]);
        if (s.walletAddress === App.user.walletAddress) mine.push(s);
      } catch (_) {}
    }
    mine.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (!mine.length) {
      body.innerHTML = '<div class="empty-state"><div class="icon">📋</div><p>まだクエストを提出していません。</p></div>';
      return;
    }
    const qMap = {};
    App.quests.forEach(q => { qMap[q.taskId] = q; });

    const STATUS = {
      pending:  { label:'確認中（1〜3営業日）',   cls:'badge-pending'  },
      approved: { label:'承認：報酬支払済み',       cls:'badge-approved' },
      rejected: { label:'却下：注意事項該当',       cls:'badge-rejected' }
    };

    body.innerHTML = mine.map(s => {
      const q   = qMap[s.taskId] || {};
      const st  = STATUS[s.status] || STATUS.pending;
      const cls = s.status === 'approved' ? 'approved' : s.status === 'rejected' ? 'rejected' : '';
      return `
        <div class="sub-item ${cls}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:8px">
            <strong style="font-family:var(--font-display);font-size:14px;color:var(--sepia-dark)">${esc(q.title||s.taskId)}</strong>
            <span class="badge ${st.cls}">${esc(st.label)}</span>
          </div>
          <div style="font-size:12px;color:var(--gold-muted)">
            報酬：${esc(String(s.rewardAmount))} LTC　|　提出日：${new Date(s.createdAt).toLocaleString('ja-JP')}
          </div>
          <div style="font-size:13px;color:var(--sepia-mid);margin-top:7px;border-top:1px solid var(--bg-parchment3);padding-top:6px">
            ${esc((s.content||'').slice(0,120))}${(s.content||'').length>120?'…':''}
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    console.error('LoadSubmissions:', err);
    body.innerHTML = '<div class="empty-state"><p>読み込みに失敗しました。</p></div>';
  }
}

function openContactModal() {
  if (App.user) {
    openModal('modal-contact-user');
  } else {
    document.getElementById('guest-admin-wallet').textContent = CFG.ADMIN_WALLET;
    openModal('modal-contact-guest');
  }
}

async function doContactUser(e) {
  e.preventDefault();
  const content = document.getElementById('cu-content').value.trim();
  document.getElementById('err-cu').textContent = '';

  await refreshUserIfNeeded();
  const td = today();
  if (App.user.lastLoginDate !== td) App.user.todayInquiryCount = 0;

  if ((App.user.todayInquiryCount || 0) >= CFG.MAX_INQUIRY) {
    document.getElementById('err-cu').textContent = '本日のお問い合わせ上限（1回）に達しています。';
    return;
  }

  const subj = `[InfoGuild] お問い合わせ - ${App.user.accountName}`;
  const body = `アカウント名：${App.user.accountName}\nウォレット：${App.user.walletAddress}\n---\n${content}`;
  window.location.href = `mailto:${CFG.ADMIN_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;

  try {
    App.user.todayInquiryCount = (App.user.todayInquiryCount || 0) + 1;
    App.user.updatedAt = now();
    await api.set(CFG.SHEET.USERS, App.user.walletAddress, JSON.stringify(App.user));
  } catch (_) {}

  closeModal('modal-contact-user');
  document.getElementById('form-contact-user').reset();
  showToast('メーラーが起動しました。送信してください。');
}

function doContactGuest(e) {
  e.preventDefault();
  const eth     = document.getElementById('cg-eth').value.trim();
  const wallet  = document.getElementById('cg-wallet').value.trim();
  const content = document.getElementById('cg-content').value.trim();
  document.getElementById('err-cg').textContent = '';
  if (!isValidEth(wallet)) { document.getElementById('err-cg').textContent = '有効な LTC ウォレットアドレスを入力してください'; return; }

  const subj = '[InfoGuild] 非会員お問い合わせ';
  const body = `送金元ウォレット：${wallet}\n送金 LTC 額：${eth}\n送金先ウォレット：${CFG.ADMIN_WALLET}\n---\n${content}`;
  window.location.href = `mailto:${CFG.ADMIN_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  closeModal('modal-contact-guest');
  document.getElementById('form-contact-guest').reset();
  showToast('メーラーが起動しました。送信してください。');
}

function doLoginIssue(e) {
  e.preventDefault();
  const uname   = document.getElementById('li-uname').value.trim();
  const ans     = document.getElementById('li-ans').value.trim();
  const wallet  = document.getElementById('li-wallet').value.trim();
  const newPw   = document.getElementById('li-new-pw').value.trim();
  const eth     = document.getElementById('li-eth').value.trim();
  const detail  = document.getElementById('li-detail').value.trim();

  const subj = '[InfoGuild] ログイン不能サポート申請';
  const body = `アカウント名：${uname}\n秘密の質問の回答：${ans}\n登録ウォレット（送金元）：${wallet}\n仮パスワード：${newPw}\n送金 LTC 額：${eth}\n送金先：${CFG.ADMIN_WALLET}\n---\n${detail}`;
  window.location.href = `mailto:${CFG.ADMIN_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  closeModal('modal-login-issue');
  document.getElementById('form-login-issue').reset();
  showToast('メーラーが起動しました。送信してください。');
}

async function doDeleteReq(e) {
  e.preventDefault();
  if (!App.user) return;
  const pw     = document.getElementById('dr-pw').value;
  const reason = document.getElementById('dr-reason').value.trim();
  document.getElementById('err-dr').textContent = '';

  const hash = await sha256(pw + App.user.walletAddress);
  if (hash !== App.user.passwordHash) {
    document.getElementById('err-dr').textContent = 'パスワードが正しくありません';
    return;
  }

  const subj = '[InfoGuild] アカウント削除申請';
  const body = `アカウント名：${App.user.accountName}\nウォレット：${App.user.walletAddress}\n削除理由：${reason}`;
  window.location.href = `mailto:${CFG.ADMIN_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  closeModal('modal-delete-req');
  document.getElementById('form-delete-req').reset();
  showToast('削除申請を送信しました。処理まで数日かかる場合があります。');
}

function checkDailyReset() {
  if (!App.user) return;
  const td = today();
  if (App.user.lastLoginDate !== td) {
    App.user.todayInquiryCount = 0;
    App.user.lastLoginDate = td;
    App.user.updatedAt = now();
    api.set(CFG.SHEET.USERS, App.user.walletAddress, JSON.stringify(App.user))
       .catch(err => console.error('DailyReset:', err));
  }
}

document.addEventListener('visibilitychange', async () => {
  if (!document.hidden && App.user) {
    await refreshUserIfNeeded();
    checkDailyReset();
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  updateNavUI();
  await loadQuests();
  checkDailyReset();
});