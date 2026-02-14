const verbBank = [
    '走る', '飛ぶ', '跳ねる', '転がる', '滑る', '登る', '落ちる', '浮く', '沈む', '回る',
    '投げる', '蹴る', '打つ', '押す', '引く', '掴む', '持つ', '運ぶ', '積む', '並べる',
    '壊す', '作る', '描く', '消す', '塗る', '切る', '繋ぐ', '分ける', '混ぜる', '育てる',
    '集める', '探す', '見つける', '隠す', '逃げる', '追う', '守る', '攻める', '避ける', '当てる',
    '跳ぶ', '泳ぐ', '潜る', '這う', '歩く', '止まる', '進む', '戻る', '曲がる', '向く',
    '開く', '閉じる', '伸びる', '縮む', '広がる', '狭まる', '増える', '減る', '変わる', '動く',
    '鳴る', '光る', '燃える', '凍る', '溶ける', '乾く', '濡れる', '汚れる', '綺麗にする', '直す',
    '届く', '渡す', '受ける', '取る', '返す', '借りる', '貸す', '買う', '売る', '交換する'
];

const abstractBank = [
    '光', '影', '音', '色', '夢', '時', '空', '命', '心', '魂',
    '火', '水', '風', '土', '雷', '氷', '闇', '星', '月', '日',
    '線', '点', '円', '波', '渦', '流', '粒', '塊', '層', '膜',
    '始', '終', '間', '境', '端', '核', '軸', '環', '輪', '鎖',
    '記憶', '意志', '感情', '理性', '本能', '欲望', '恐怖', '希望', '絆', '孤独',
    '秩序', '混沌', '調和', '対立', '均衡', '崩壊', '再生', '循環', '変容', '静寂',
    '破片', '残響', '痕跡', '余韻', '予兆', '兆し', '種', '芽', '根', '枝'
];

const symbolBank = [
    'space', 'Re', 'Un', 'Ex', 'De', 'X', 'O', '+', '∞', '×',
    '2', '3', '5', '7', '10', '100', '0', '1', '∅', '!',
    'A', 'Z', 'α', 'ω', '?', '*', '#', '@', '&', '~',
    'and', 'or', 'not', 'if', 'loop', 'end', 'start', 'go', 'stop', 'return'
];

const dailyBank = [
    '朝', '昼', '夜', '家', '部屋', '窓', '扉', '鍵', '箱', '袋',
    '道', '橋', '坂', '階段', '角', '広場', '公園', '森', '海', '山',
    '本', '紙', '鉛筆', '消しゴム', '鏡', '時計', '電話', 'カメラ', 'ボタン', 'スイッチ',
    '食べ物', '飲み物', 'パン', '果物', '野菜', '肉', '魚', 'お菓子', 'ケーキ', 'スープ',
    '服', '靴', '帽子', '傘', '鞄', '財布', 'ポケット', 'リボン', 'ベルト', '手袋',
    '犬', '猫', '鳥', '魚', '虫', '花', '木', '草', '葉', '種',
    '友達', '家族', '子供', '大人', '先生', '生徒', '店員', '客', '隣人', '通行人',
    '笑顔', '涙', '声', '手', '足', '頭', '目', '耳', '口', '鼻',
    '雨', '雪', '雲', '風', '虹', '雷', '霧', '霜', '露', '氷',
    'ゲーム', 'パズル', '謎', 'クイズ', 'カード', 'サイコロ', '駒', '盤', 'ルール', 'スコア'
];

let lastGenerateTime = 0;
const RATE_LIMIT_MS = 3000;

function getRandomWord(bankArray) {
    return bankArray[Math.floor(Math.random() * bankArray.length)];
}

function shuffleWord1() {
    const rand = Math.random();
    let word;
    if (rand < 0.4) {
        word = getRandomWord(verbBank);
    } else if (rand < 0.7) {
        word = getRandomWord(abstractBank);
    } else if (rand < 0.85) {
        word = getRandomWord(dailyBank);
    } else {
        word = getRandomWord(symbolBank);
    }
    document.getElementById('word1').value = word;
}

function shuffleWord2() {
    const rand = Math.random();
    let word;
    if (rand < 0.35) {
        word = getRandomWord(abstractBank);
    } else if (rand < 0.65) {
        word = getRandomWord(dailyBank);
    } else if (rand < 0.85) {
        word = getRandomWord(verbBank);
    } else {
        word = getRandomWord(symbolBank);
    }
    document.getElementById('word2').value = word;
}

async function generateIdeas() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const word1 = document.getElementById('word1').value.trim();
    const word2 = document.getElementById('word2').value.trim();
    
    if (!apiKey) {
        alert('APIキーを入力してください');
        return;
    }
    
    if (!word1 || !word2) {
        return;
    }
    
    const now = Date.now();
    if (now - lastGenerateTime < RATE_LIMIT_MS) {
        alert(`連続実行を防ぐため、${Math.ceil((RATE_LIMIT_MS - (now - lastGenerateTime)) / 1000)}秒後に再試行してください`);
        return;
    }
    lastGenerateTime = now;
    
    const generateBtn = document.getElementById('generateBtn');
    const btnIcon = generateBtn.querySelector('.btn-icon');
    const btnText = generateBtn.querySelector('.btn-text');
    
    generateBtn.disabled = true;
    btnIcon.classList.add('loading');
    btnText.textContent = '企画を生成中...';
    
    const ideasSection = document.getElementById('ideasSection');
    const ideasText = document.getElementById('ideasText');
    ideasSection.style.display = 'none';
    ideasText.textContent = '';
    
    const maxRetries = 5;  // この行を移動
    const retryDelays = [15000, 45000, 60000, 120000];  // この行を移動
    let retryCount = 0;  // ★この行を追加★
    
    try {
        const prompt = `あなたは1週間のゲームジャム経験豊富なゲームデザイナーです。
以下の2つのテーマワードを組み合わせて、1週間で実際に作れるゲーム企画を5つ提案してください。

テーマワード：「${word1}」×「${word2}」

企画の条件：
- 1週間（実質5-7日の開発時間）で完成できる規模
- シンプルだが面白いコアメカニクス
- 小規模チーム（1-3人）でも実現可能
- 2Dまたは簡易3Dで実装可能
- アセットストアやフリー素材の活用を前提にしてもOK

各企画には以下を含めてください：
1. ゲームタイトル案
2. ジャンル（アクション、パズル、アドベンチャーなど）
3. コアメカニクス（1-2文で）
4. 1週間で作れる理由・実装の工夫

フォーマット：
「番号. 【タイトル】（ジャンル） - コアメカニクスの説明。実装面での工夫や1週間で作れる理由。」

例：
「1. 【重力パズル】（パズルゲーム） - プレイヤーは重力の向きを90度ずつ回転させて、ボールをゴールまで導く。ステージはタイルベースで作成でき、物理エンジンの基本機能だけで実装可能。10-15ステージで完結する構成にすれば1週間で十分完成できる。」

このフォーマットで5つの企画を提案してください。`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (response.status === 429 || response.status === 503) {
            if (retryCount < maxRetries) {
                const delay = retryDelays[retryCount] || 30000;
                throw { 
                    retryable: true, 
                    delay: delay, 
                    count: retryCount,
                    message: `サーバーが混雑しています。${delay/1000}秒後に自動的に再試行します... (試行回数: ${retryCount + 1}/${maxRetries})`
                };
            } else {
                throw new Error('サーバーが混雑しているため、処理を完了できませんでした。しばらく時間をおいてから再度お試しください。');
            }
        }
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 400 && errorData.error && errorData.error.message.includes('API key')) {
                throw new Error('APIキーが無効です。正しいGemini APIキーを入力してください。');
            }
            throw new Error(`エラーが発生しました (ステータス: ${response.status})`);
        }
        
        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            const fullText = data.candidates[0].content.parts
            .map(part => part.text || "")
            .filter(Boolean)
            .join("\n");
            const text = fullText;
            ideasText.textContent = text;
            ideasSection.style.display = 'block';
        } else {
            throw new Error('予期しないレスポンス形式');
        }
        
    } catch (error) {
        alert('申し訳ありません。アイデアの生成中にエラーが発生しました。APIキーを確認してもう一度お試しください。');
        console.error('Error:', error);
    } finally {
        generateBtn.disabled = false;
        btnIcon.classList.remove('loading');
        btnText.textContent = 'ゲーム企画を生成';
        adDisplayed = true;
        showAd();
    }
}

function resetApp() {
    document.getElementById('word1').value = '';
    document.getElementById('word2').value = '';
    document.getElementById('ideasSection').style.display = 'none';
    document.getElementById('ideasText').textContent = '';
}

document.getElementById('shuffle1').addEventListener('click', shuffleWord1);
document.getElementById('shuffle2').addEventListener('click', shuffleWord2);
document.getElementById('generateBtn').addEventListener('click', generateIdeas);
document.getElementById('resetBtn').addEventListener('click', resetApp);