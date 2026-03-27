'use strict';

const pm = new PasswordManager();
const decrypted = pm.fromSpellRestoration('けらめぜほくいずそもびげへだせじひねいぜしらほげふだほがはてでやふだぜげふぬかやへらぶずしぢすげちなぎらまぬせもまといぜのぜちじへとかごふやにかひゆせらまぬつげひずはゆへえいしなゆはろちななごつぬできならすごそなざよひよぶとちぜぞずひぬはもとおでねはぬぶえなにかれひきゆぜつかかじてなすずひぜおげはねめよのじけん');
const GAS_URL = typeof decrypted === 'string' ? decrypted : JSON.stringify(decrypted, null, 2);
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_BASE = ['https://generative', 'language.googleapis.com', '/v1beta/models/'].join('');

const DEFAULT_LIMIT = 3;         
const DEFAULT_INTERVAL_MS = 60000; 
const SPECIAL_LIMIT = 100;        
const SPECIAL_INTERVAL_MS = 15000; 

const AppState = {
  loggedIn: false,
  currentUser: null, 
  userApiKey: '',    
  geminiApiKeys: [],  
  geminiPrompt: '',   
  specialQuery: '',   
  isSpecial: false,   
  maxUsage: DEFAULT_LIMIT,
  intervalMs: DEFAULT_INTERVAL_MS,
  lastUsedAt: 0,
  isLoading: false,
  cooldownTimer: null,
  inquiryUsedToday: false,
};

class GASStorageClient {
  constructor(url) {
    if (!url || url.includes('YOUR_GAS')) {
      console.warn('URLが設定されていません。通信はできません。');
    }
    this.gasUrl = url;
  }

  async _request(params) {
    if (!this.gasUrl || this.gasUrl.includes('YOUR_GAS')) {
      throw new Error('URLが設定されていません。index.html内の _s2 を設定してください。');
    }
    const formData = new URLSearchParams(params);
    const resp = await fetch(this.gasUrl, { method: 'POST', body: formData, redirect: 'follow' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    if (json.status === 'error') throw new Error(json.message || '不明なエラー');
    return json;
  }

  async get(parentKey, childKey) {
    const r = await this._request({ action: 'get', parentKey, childKey });
    return r.data;
  }

  async getAll(parentKey) {
    const r = await this._request({ action: 'getAll', parentKey });
    return JSON.parse(r.data);
  }

  async set(parentKey, childKey, data) {
    // objectの場合はJSON文字列化、それ以外はそのまま渡す (inquiry.js準拠)
    const d = typeof data === 'object' ? JSON.stringify(data) : data;
    const r = await this._request({ action: 'set', parentKey, childKey, data: d });
    return r.data;
  }

  async delete(parentKey, childKey) {
    const r = await this._request({ action: 'delete', parentKey, childKey });
    return r.data;
  }
}

const gas = new GASStorageClient(GAS_URL);

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password + 'gemini_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function renderMarkdown(text) {
  if (!text) return '';
  let html = escapeHtml(text);
  // コードブロック
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // インラインコード
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 太字
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // 見出し
  html = html.replace(/^### (.+)$/gm, '<h4 style="color:var(--blue-5);margin:8px 0 4px">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 style="color:var(--blue-5);margin:10px 0 6px">$1</h3>');
  html = html.replace(/^# (.+)$/gm, '<h2 style="color:var(--blue-4);margin:12px 0 8px">$1</h2>');
  // リスト
  html = html.replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)+/g, s => `<ul style="padding-left:20px;margin:6px 0">${s}</ul>`);
  // 改行を<br>に
  html = html.replace(/\n/g, '<br>');
  // コードブロック内の<br>を戻す
  html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (m, code) =>
    `<pre><code>${code.replace(/<br>/g, '\n')}</code></pre>`
  );
  return html;
}

function showToast(message, type = 'info', duration = 4000) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${escapeHtml(message)}</span>`;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ============================================================
// ハンバーガーメニュー
// ============================================================
function toggleMenu() {
  document.getElementById('dropdownMenu').classList.toggle('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.hamburger-wrap')) {
    document.getElementById('dropdownMenu').classList.remove('open');
  }
});

// ============================================================
// アコーディオン
// ============================================================
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const isOpen = body.classList.contains('open');
  // 全部閉じる
  document.querySelectorAll('.accordion-body.open').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.accordion-header.open').forEach(h => h.classList.remove('open'));
  if (!isOpen) {
    body.classList.add('open');
    header.classList.add('open');
  }
}

// ============================================================
// UIヘルパー
// ============================================================
function setBtn(id, html, disabled = false) {
  const btn = document.getElementById(id);
  if (btn) { btn.innerHTML = html; btn.disabled = disabled; }
}

function setAlert(id, html, type = 'error') {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html ? `<div class="alert alert-${type}">${html}</div>` : '';
}

function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
  document.getElementById('charCount').textContent = textarea.value.length + '文字';
}

// ============================================================
// ヘッダーUI更新
// ============================================================
function updateHeaderUI() {
  const loggedIn = AppState.loggedIn;
  document.getElementById('btnRegister').style.display = loggedIn ? 'none' : '';
  document.getElementById('btnLogin').style.display = loggedIn ? 'none' : '';
  document.getElementById('btnContact').style.display = loggedIn ? 'none' : '';
  document.getElementById('btnContactLogged').style.display = loggedIn ? '' : 'none';
  document.getElementById('hamburgerWrap').style.display = loggedIn ? '' : 'none';
  // APIキーパネル
  document.getElementById('apiKeyPanel').classList.toggle('visible', !loggedIn);
  updateUsageDisplay();
}

function updateUsageDisplay() {
  if (!AppState.currentUser && !AppState.userApiKey) return;

  const used = getCurrentUsed();
  const max = AppState.maxUsage;
  const pct = Math.min(100, (used / max) * 100);

  document.getElementById('usageLabelText').textContent =
    AppState.isSpecial ? '本日の利用回数（特例モード）' : '本日の利用回数';
  document.getElementById('usageLabelCount').textContent = `${used} / ${max}`;
  document.getElementById('usageBadge').textContent = `${max - used}回`;

  const fill = document.getElementById('usageFill');
  fill.style.width = pct + '%';
  fill.className = 'usage-bar-fill' + (pct >= 100 ? ' danger' : pct >= 80 ? ' warn' : '');
}

const SESSION_KEY = 'geminiApp_session';

function saveSession(email) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email, ts: Date.now() }));
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    // 24時間でセッション切れ
    if (Date.now() - s.ts > 86400000) { sessionStorage.removeItem(SESSION_KEY); return null; }
    return s;
  } catch { return null; }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getCurrentUsed() {
  if (AppState.currentUser) {
    const ud = AppState.currentUser.userData;
    if (ud.aiDate === getTodayStr()) return ud.aiCount || 0;
    return 0;
  } else {
    // 未ログイン: sessionStorageに保持
    try {
      const raw = sessionStorage.getItem('geminiApp_guestUsage');
      if (!raw) return 0;
      const d = JSON.parse(raw);
      if (d.date !== getTodayStr()) return 0;
      return d.count || 0;
    } catch { return 0; }
  }
}

async function incrementUsed() {
  if (AppState.currentUser) {
    const ud = AppState.currentUser.userData;
    const today = getTodayStr();
    if (ud.aiDate !== today) { ud.aiDate = today; ud.aiCount = 0; }
    ud.aiCount = (ud.aiCount || 0) + 1;
    ud.updatedAt = new Date().toISOString();
    // 保存
    try {
      await gas.set('users', AppState.currentUser.email,
        JSON.stringify(ud));
    } catch (err) {
      console.error('利用回数保存失敗:', err);
    }
  } else {
    const today = getTodayStr();
    const cur = getCurrentUsed();
    sessionStorage.setItem('geminiApp_guestUsage', JSON.stringify({ date: today, count: cur + 1 }));
  }
  AppState.lastUsedAt = Date.now();
  updateUsageDisplay();
}

// ============================================================
// APIキー設定 (未ログイン)
// ============================================================
function saveUserApiKey() {
  const key = document.getElementById('userApiKey').value.trim();
  if (!key || !key.startsWith('AIza')) {
    showToast('有効なAPIキーを入力してください (AIza... で始まる文字列)', 'error');
    return;
  }
  AppState.userApiKey = key;
  showToast('APIキーを設定しました', 'success');
  document.getElementById('apiKeyPanel').classList.remove('visible');
  updateUsageDisplay();
}

// ============================================================
// GASから設定取得
// ============================================================
async function loadConfigFromGAS() {
  try {
    // APIキー配列取得
    const keysRaw = await gas.get('config', 'api_keys');
    if (keysRaw) AppState.geminiApiKeys = JSON.parse(keysRaw);

    // プロンプト取得
    const prompt = await gas.get('config', 'prompt');
    if (prompt) AppState.geminiPrompt = prompt;

    // 特例クエリ文字列取得
    const sq = await gas.get('config', 'special_query');
    if (sq) AppState.specialQuery = sq;

    console.log('[Config] 設定を読み込みました');
  } catch (err) {
    console.warn('[Config] 設定取得失敗 (URLが未設定の可能性):', err.message);
    // フォールバック: APIキーなし、プロンプトはデフォルト
    AppState.geminiPrompt = 'ユーザーからの質問に丁寧に回答してください。\n\nUSER_INPUT_PLACEHOLDER';
  }
}

// ============================================================
// 特例モード判定
// ============================================================
function checkSpecialMode() {
  if (!AppState.loggedIn) return;
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  if (qParam && AppState.specialQuery && qParam === AppState.specialQuery) {
    AppState.isSpecial = true;
    AppState.maxUsage = SPECIAL_LIMIT;
    AppState.intervalMs = SPECIAL_INTERVAL_MS;
    console.log('[Special] 特例モード有効');
  } else {
    AppState.isSpecial = false;
    AppState.maxUsage = DEFAULT_LIMIT;
    AppState.intervalMs = DEFAULT_INTERVAL_MS;
  }
}

// ============================================================
// 登録処理
// ============================================================
async function register() {
  // バリデーション
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const question = document.getElementById('regQuestion').value;
  const answer = document.getElementById('regAnswer').value.trim();

  let valid = true;
  const clearErr = () => {
    ['regEmailErr','regPassErr','regPass2Err','regQErr','regAErr'].forEach(id => {
      document.getElementById(id).textContent = '';
    });
  };
  clearErr();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('regEmailErr').textContent = '有効なメールアドレスを入力してください';
    valid = false;
  }
  if (!pass || pass.length < 8) {
    document.getElementById('regPassErr').textContent = 'パスワードは8文字以上で入力してください';
    valid = false;
  }
  if (pass !== pass2) {
    document.getElementById('regPass2Err').textContent = 'パスワードが一致しません';
    valid = false;
  }
  if (!question) {
    document.getElementById('regQErr').textContent = '秘密の質問を選択してください';
    valid = false;
  }
  if (!answer) {
    document.getElementById('regAErr').textContent = '秘密の質問の答えを入力してください';
    valid = false;
  }
  if (!valid) return;

  setBtn('regSubmitBtn', '<span class="spinner"></span> 登録中...', true);
  setAlert('registerAlert', '', '');

  try {
    // 重複チェック
    let existing = null;
    try {
      existing = await gas.get('users', email);
    } catch (e) { /* 存在しない場合エラーになる */ }

    if (existing) {
      setAlert('registerAlert', 'このメールアドレスはすでに登録されています。', 'error');
      return;
    }

    // パスワードハッシュ化
    const passHash = await hashPassword(pass);
    const answerHash = await hashPassword(answer.toLowerCase());

    const userData = {
      email,
      passHash,
      secretQuestion: question,
      secretAnswerHash: answerHash,
      aiCount: 0,
      aiDate: '',
      inquiryCount: 0,
      inquiryDate: '',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await gas.set('users', email, JSON.stringify(userData));

    // 自動ログイン
    AppState.loggedIn = true;
    AppState.currentUser = { email, userData };
    saveSession(email);
    checkSpecialMode();

    showToast('登録が完了しました！', 'success');
    closeModal('registerModal');
    updateHeaderUI();
    addWelcomeMessage();

  } catch (err) {
    setAlert('registerAlert', `エラー: ${err.message}`, 'error');
  } finally {
    setBtn('regSubmitBtn', '登録する', false);
  }
}

// ============================================================
// ログイン処理
// ============================================================
async function login() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;

  if (!email || !pass) {
    setAlert('loginAlert', 'メールアドレスとパスワードを入力してください。', 'error');
    return;
  }

  setBtn('loginSubmitBtn', '<span class="spinner"></span> ログイン中...', true);
  setAlert('loginAlert', '', '');

  try {
    const raw = await gas.get('users', email);
    const userData = JSON.parse(raw);
    const passHash = await hashPassword(pass);

    if (userData.passHash !== passHash) {
      setAlert('loginAlert', 'パスワードが正しくありません。', 'error');
      return;
    }

    // ログイン成功
    userData.lastLogin = new Date().toISOString();
    userData.updatedAt = new Date().toISOString();
    await gas.set('users', email, JSON.stringify(userData));

    AppState.loggedIn = true;
    AppState.currentUser = { email, userData };
    saveSession(email);
    checkSpecialMode();

    showToast('ログインしました', 'success');
    closeModal('loginModal');
    updateHeaderUI();
    addWelcomeMessage();

  } catch (err) {
    if (err.message.includes('not found') || err.message.includes('Data not found')) {
      setAlert('loginAlert', 'メールアドレスが登録されていません。', 'error');
    } else {
      setAlert('loginAlert', `ログインエラー: ${err.message}`, 'error');
    }
  } finally {
    setBtn('loginSubmitBtn', 'ログイン', false);
  }
}

// ============================================================
// ログアウト
// ============================================================
function logout() {
  AppState.loggedIn = false;
  AppState.currentUser = null;
  AppState.isSpecial = false;
  AppState.maxUsage = DEFAULT_LIMIT;
  AppState.intervalMs = DEFAULT_INTERVAL_MS;
  clearSession();
  updateHeaderUI();
  document.getElementById('dropdownMenu').classList.remove('open');
  showToast('ログアウトしました', 'info');
  // APIキーパネル表示
  document.getElementById('apiKeyPanel').classList.add('visible');
}

// ============================================================
// パスワードリカバリー
// ============================================================
let _forgotUserData = null;

async function checkForgotEmail() {
  const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
  if (!email) { showToast('メールアドレスを入力してください', 'error'); return; }

  try {
    const raw = await gas.get('users', email);
    _forgotUserData = { email, data: JSON.parse(raw) };

    const qMap = {
      pet: '最初のペットの名前は？', school: '初めて通った学校の名前は？',
      city: '生まれた都市は？', mother: '母親の旧姓は？', book: '好きな本のタイトルは？'
    };
    document.getElementById('forgotQuestionLabel').textContent =
      qMap[_forgotUserData.data.secretQuestion] || '秘密の質問';

    document.getElementById('forgotStep1').style.display = 'none';
    document.getElementById('forgotStep2').style.display = 'block';
  } catch {
    setAlert('forgotAlert', 'このメールアドレスは登録されていません。', 'error');
  }
}

function showForgotStep1() {
  document.getElementById('forgotStep1').style.display = 'block';
  document.getElementById('forgotStep2').style.display = 'none';
  document.getElementById('forgotFail').style.display = 'none';
}

async function verifyForgot() {
  const answer = document.getElementById('forgotAnswer').value.trim().toLowerCase();
  if (!answer || !_forgotUserData) return;

  const answerHash = await hashPassword(answer);
  if (answerHash === _forgotUserData.data.secretAnswerHash) {
    // 成功 — パスワードを表示する代わりに、パスワードリセットを促す
    setAlert('forgotAlert',
      `本人確認が完了しました。新しいパスワードを設定するにはお問い合わせください。<br>
       メール: <a href="mailto:devilnessie@gmail.com" style="color:var(--blue-5)">devilnessie@gmail.com</a>`, 'success');
    document.getElementById('forgotStep2').style.display = 'none';
  } else {
    document.getElementById('forgotFail').style.display = 'flex';
  }
}

// ============================================================
// お問い合わせ
// ============================================================
async function submitInquiry() {
  const name = document.getElementById('inqName').value.trim();
  const email = document.getElementById('inqEmail').value.trim();
  const subject = document.getElementById('inqSubject').value.trim();
  const body = document.getElementById('inqBody').value.trim();

  if (!name || !email || !subject || !body) {
    setAlert('inquiryAlert', 'すべての必須項目を入力してください。', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setAlert('inquiryAlert', '有効なメールアドレスを入力してください。', 'error');
    return;
  }

  // 1日1回制限チェック
  if (AppState.inquiryUsedToday) {
    setAlert('inquiryAlert', '本日はすでにお問い合わせ済みです。明日またお試しください。', 'warn');
    return;
  }

  setBtn('inqSubmitBtn', '<span class="spinner"></span> 送信中...', true);
  setAlert('inquiryAlert', '', '');

  try {
    const inqData = {
      name: escapeHtml(name), email: escapeHtml(email),
      subject: escapeHtml(subject), body: escapeHtml(body),
      sentAt: new Date().toISOString(),
      userId: AppState.currentUser?.email || 'anonymous',
    };

    const key = `inq_${Date.now()}`;
    await gas.set('inquiries', key, JSON.stringify(inqData));

    // ユーザーデータに問い合わせ回数記録
    if (AppState.currentUser) {
      const ud = AppState.currentUser.userData;
      const today = getTodayStr();
      if (ud.inquiryDate !== today) ud.inquiryCount = 0;
      ud.inquiryCount = (ud.inquiryCount || 0) + 1;
      ud.inquiryDate = today;
      ud.updatedAt = new Date().toISOString();
      await gas.set('users', AppState.currentUser.email, JSON.stringify(ud));
    }

    AppState.inquiryUsedToday = true;
    document.getElementById('inquiryForm').style.display = 'none';
    document.getElementById('inquiryDone').style.display = 'block';

  } catch (err) {
    setAlert('inquiryAlert', `送信エラー: ${err.message}`, 'error');
  } finally {
    setBtn('inqSubmitBtn', '送信する', false);
  }
}

// アカウント削除申請 (問い合わせフォームに自動入力)
function requestDeleteAccount() {
  document.getElementById('dropdownMenu').classList.remove('open');
  const email = AppState.currentUser?.email || '';
  document.getElementById('inqEmail').value = email;
  document.getElementById('inqSubject').value = 'アカウント削除申請';
  document.getElementById('inqBody').value = `以下のアカウントの削除をお願いします。\n\nメールアドレス: ${email}\n\n削除理由: (ご記入ください)`;
  openModal('inquiryModal');
}

// ============================================================
// Gemini AI 呼び出し
// ============================================================
async function callGeminiWithFallback(userText) {
  // プロンプト構築
  let prompt = AppState.geminiPrompt ||
    'ユーザーの質問に対して詳しく回答してください。\n\nUSER_INPUT_PLACEHOLDER';
  prompt = prompt.replace('USER_INPUT_PLACEHOLDER', escapeHtml(userText));

  // APIキー選択
  let apiKeys = [];
  if (AppState.loggedIn && AppState.geminiApiKeys.length > 0) {
    apiKeys = AppState.geminiApiKeys;
  } else if (AppState.userApiKey) {
    apiKeys = [AppState.userApiKey];
  } else {
    throw new Error('APIキーが設定されていません。ログインするか、APIキーを入力してください。');
  }

  // APIキーを順番に試す
  for (let i = 0; i < apiKeys.length; i++) {
    const key = apiKeys[i];
    try {
      const result = await callGeminiAPI(key, prompt);
      return result;
    } catch (err) {
      const msg = err.message || '';
      const isQuotaError = msg.includes('429') || msg.includes('quota') ||
                           msg.includes('RESOURCE_EXHAUSTED') || msg.includes('credit');
      if (isQuotaError && i < apiKeys.length - 1) {
        console.warn(`[Gemini] キー ${i} クォータ超過、次のキーへ`);
        continue;
      }
      // 最後のキーも失敗、またはクォータ以外のエラー
      if (i === apiKeys.length - 1 && isQuotaError) {
        throw new Error('CREDIT_EXHAUSTED');
      }
      throw err;
    }
  }
}

async function callGeminiAPI(apiKey, prompt) {
  const url = `${GEMINI_API_BASE}${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    tools: [{ google_search: {} }],
    generationConfig: {
      thinkingConfig: { thinkingBudget: -1 },
    },
  };

  // タイムアウト付きfetch (3分)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180000);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!resp.ok) {
      const errJson = await resp.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || `HTTP ${resp.status}`;
      throw new Error(errMsg);
    }

    const json = await resp.json();
    return parseGeminiResponse(json);
  } finally {
    clearTimeout(timeout);
  }
}

function parseGeminiResponse(json) {
  const candidates = json?.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error('Geminiから応答がありませんでした');
  }
  const content = candidates[0]?.content;
  if (!content) throw new Error('レスポンス形式が不正です');

  let thinkingText = '';
  let mainText = '';

  for (const part of content.parts || []) {
    if (part.thought) {
      thinkingText += part.text || '';
    } else if (part.text) {
      mainText += part.text;
    }
  }

  // 代替: candidatesのfinishReason確認
  const finishReason = candidates[0]?.finishReason;
  if (finishReason === 'SAFETY') throw new Error('安全フィルターによりブロックされました');
  if (!mainText) mainText = json?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || 'レスポンスが空です';

  return { mainText, thinkingText };
}

// ============================================================
// メッセージ送信・UI
// ============================================================
function handleInputKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

async function sendMessage() {
  if (AppState.isLoading) return;

  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  // APIキーチェック
  if (!AppState.loggedIn && !AppState.userApiKey) {
    showToast('APIキーを入力してください', 'error');
    document.getElementById('apiKeyPanel').classList.add('visible');
    document.getElementById('userApiKey').focus();
    return;
  }

  // 利用回数チェック
  const used = getCurrentUsed();
  if (used >= AppState.maxUsage) {
    showLimitPanel();
    return;
  }

  // クールダウンチェック
  const now = Date.now();
  const elapsed = now - AppState.lastUsedAt;
  if (AppState.lastUsedAt > 0 && elapsed < AppState.intervalMs) {
    const remaining = Math.ceil((AppState.intervalMs - elapsed) / 1000);
    showToast(`次の送信まで ${remaining} 秒お待ちください`, 'warn');
    return;
  }

  // UI設定
  AppState.isLoading = true;
  document.getElementById('sendBtn').disabled = true;
  input.value = '';
  input.style.height = 'auto';
  document.getElementById('charCount').textContent = '0文字';

  // ユーザーメッセージ追加
  addMessage('user', escapeHtml(text));

  // ローディングメッセージ
  const loadingId = addLoadingMessage();

  // クールダウン表示
  startCooldownDisplay();

  try {
    const result = await callGeminiWithFallback(text);
    removeMessage(loadingId);
    addMessage('ai', result.mainText, result.thinkingText);
    await incrementUsed();
    updateUsageDisplay();
  } catch (err) {
    removeMessage(loadingId);
    if (err.message === 'CREDIT_EXHAUSTED') {
      addMessage('ai', '本日のクレジットを使い切りました。明日またお試しいただくか、アプリ版のご利用をご検討ください。', '', true);
      alert('本日のクレジットを使い切りました。\n明日またお試しください。');
    } else if (err.message.includes('APIキー')) {
      addMessage('ai', `エラー: ${err.message}`, '', true);
    } else {
      addMessage('ai', `エラーが発生しました: ${escapeHtml(err.message)}\n\nもう一度お試しください。`, '', true);
    }
  } finally {
    AppState.isLoading = false;
    document.getElementById('sendBtn').disabled = false;
    if(!AppState.isSpecial){
      adDisplayed = true;
      showAd();
    }
  }
}

let _msgId = 0;
function addMessage(role, text, thinkingText = '', isError = false) {
  const id = 'msg_' + (++_msgId);
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.id = id;

  const avatar = role === 'ai' ? '🕵️‍♂️' : '👤';
  const contentHtml = role === 'ai' ? renderMarkdown(text) : `<p>${text}</p>`;
  const thinkHtml = thinkingText
    ? `<div class="msg-thinking">🧠 思考中... (${thinkingText.length}文字の推論)</div>`
    : '';

  div.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-content" ${isError ? 'style="border-color:rgba(239,68,68,0.4)"' : ''}>
      ${thinkHtml}
      ${contentHtml}
    </div>
  `;
  container.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return id;
}

function addLoadingMessage() {
  const id = 'msg_' + (++_msgId);
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message ai';
  div.id = id;
  div.innerHTML = `
    <div class="msg-avatar">🕵️‍♂️</div>
    <div class="msg-content">
      <div class="msg-thinking">🔍 Google検索 + 🧠 思考中... しばらくお待ちください</div>
      <div class="loading-dots"><span></span><span></span><span></span></div>
    </div>
  `;
  container.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return id;
}

function removeMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function addWelcomeMessage() {
  if (!AppState.currentUser) return;
  const email = AppState.currentUser.email;
  addMessage('ai', `ようこそ、${escapeHtml(email)} さん！\nAPIキーなしでGemini AIをお使いいただけます。`);
}

// ============================================================
// 制限到達UI
// ============================================================
function showLimitPanel() {
  document.getElementById('limitPanel').classList.add('visible');
  document.getElementById('limitPanel').scrollIntoView({ behavior: 'smooth' });
  showToast('本日の利用上限に達しました', 'warn', 6000);
}

// ============================================================
// クールダウン表示
// ============================================================
function startCooldownDisplay() {
  if (AppState.cooldownTimer) clearInterval(AppState.cooldownTimer);
  const label = document.getElementById('cooldownLabel');

  AppState.cooldownTimer = setInterval(() => {
    const elapsed = Date.now() - AppState.lastUsedAt;
    const remaining = Math.ceil((AppState.intervalMs - elapsed) / 1000);
    if (remaining <= 0 || AppState.lastUsedAt === 0) {
      label.textContent = '';
      clearInterval(AppState.cooldownTimer);
      AppState.cooldownTimer = null;
    } else {
      label.textContent = `次回送信まで ${remaining}秒`;
    }
  }, 500);
}

// ============================================================
// セッション復元 (ページ読み込み時)
// ============================================================
async function restoreSession() {
  const session = loadSession();
  if (!session) return;

  try {
    const raw = await gas.get('users', session.email);
    const userData = JSON.parse(raw);

    // 日付チェック・リセット
    const today = getTodayStr();
    if (userData.aiDate !== today) { userData.aiCount = 0; userData.aiDate = today; }
    if (userData.inquiryDate !== today) { userData.inquiryCount = 0; userData.inquiryDate = today; }

    AppState.loggedIn = true;
    AppState.currentUser = { email: session.email, userData };
    checkSpecialMode();
    updateHeaderUI();
    console.log('[Session] セッション復元完了:', session.email);
  } catch (err) {
    console.warn('[Session] セッション復元失敗:', err.message);
    clearSession();
  }
}

// ============================================================
// 初期化
// ============================================================
async function init() {
  // 設定読み込み
  await loadConfigFromGAS();

  // セッション復元
  await restoreSession();

  // UI初期化
  updateHeaderUI();

  // 未ログイン時はAPIキーパネルを表示
  if (!AppState.loggedIn) {
    document.getElementById('apiKeyPanel').classList.add('visible');
  }

  // テキストエリアEnter
  document.getElementById('userInput').addEventListener('keydown', handleInputKey);

  // 文字数カウント
  document.getElementById('userInput').addEventListener('input', function() {
    document.getElementById('charCount').textContent = this.value.length + '文字';
  });

  console.log('[App] 初期化完了');
}

// アプリ起動
window.addEventListener('DOMContentLoaded', init);