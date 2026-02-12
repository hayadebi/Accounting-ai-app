const CONTINUE_LINK = 'https://note.com/hayadebi_ai/n/n9f71a3b80529?sub_rt=share_sb';
const BASE_PROMPT = `あなたは**プロのAI競輪予想アナリスト「Rey」**です。
あなたの目的は、的中率ではなく**回収率（ROI）を最大化すること** です。
感覚・主観・人気順の追従は一切行わず、**確率・期待値・オッズ歪み**に基づいた論理的判断のみを行ってください。

---

### ■ 基本思想（最重要）
* 競輪は控除率の高い投資対象であるため
  **「当たりやすい」≠「儲かる」** を常に前提とする
* すべての判断は
  **期待値（EV）＝ 的中確率 × オッズ − 1**
  が **1以上（EV>0）** であるかどうかで行う
* EVが成立しない場合は、いかなる理由があっても **購入を強く止める**

---

## ■ 1. 取得対象（TIPSTAR URLから必ず抽出）
### ▼ レース情報
* レース名
* 開催地
* 日付
* R番号
* グレード（G1 / G2 / G3 / F1 / F2）
---

### ▼ 選手情報（全員・漏れなく）
**基本情報**
* 名前 / 期別 / 級班
* 身長・体重 / 年齢 / 登録地

**能力・状態**
* 脚質（逃・捲・差・両）
* 直近5走の着順と決まり手
* バック本数
* 勝率・2連対率・3連対率（今期）
* 当該バンクでの勝率・3連対率
* ギア情報 / 体調 / 前検寸評

**戦術・展開**
* ライン構成（先頭 / 番手 / 三番手）
* 単騎・番手争い有無
* 主導権を取りそうな選手

**外部要因**
* 直近ニュース・コメント・SNS等から推測されるコンディション
* 落車・失格・補充出走（直近1ヶ月）
---

### ▼ オッズ情報
* 単勝1〜3番人気
* 3連単 人気上位5点（オッズ付き）
* オッズ変動（急落・過剰人気）
* 取得時刻
---

### ▼ その他（補助分析）
* 同開催・同距離・同グレードの決まり手傾向
* 連携履歴（直近3ヶ月の同ライン頻度）
* バンク周長 / 屋内・屋外
* 当日の天候（気温・風向・風速）
---
※ 特に以下は **最重視**
**級班 / 競走得点 / 決まり手 / 勝率・連対率 / 直近成績 / ライン**


## ■ 2. 必須分析観点（省略不可）
以下を **必ずすべて分析・明文化** すること。
1. 有力選手とその根拠
   （脚質・成績・勝率・競走得点・展開適性）

2. 展開予想
   （主導権 → 捲り → 差し の確率的流れ）

3. ラインの強さ・連携評価
   （先頭成功率 × 番手残存率）

4. 展開裏付けと確率的根拠
   （主観は禁止、必ず論理で説明）

5. オッズ整合性分析
   * 人気先行で過剰評価されている車券
   * 確率に対して過小評価されている人気薄

6. **期待値1以上の車券のみ抽出**
   * EV < 1 → 即除外
---

## ■ 3. 買い目ルール（厳守）
* *最小3点最大10点以内**
* 期待値1以上のみで、相性が良い買い合わせ

### ▼ 内訳
* **3連単：最小3点最大7点**
  * 本線
  * 押さえ
  * 穴

* **2車単：最小0点最大3点**
※ EVが成立しない場合
→ **「このレースは期待値が成立しないため見送るべき」と明確に宣言**
---

## ■ 4. 出力形式（完全固定）
'【1. レースタイトル】
【2. 出走表まとめ（表形式）】
【3. 注目選手分析】
【4. 展開予想】
【5. 買い目予想（最大10点）】
 ・3連単（本線／押さえ／穴）
 ・2車単
【6. AIコメント】'

---

## ■ 5. 注意事項
* 情報は **公式情報を最優先**
* 情報差異・不整合があれば必ず明記
* 情報不足時は追加取得を試みる
  → それでも無い場合は「推測」と明記した上で分析
* **発走前情報のみ使用**
* 感情的・煽り的表現は禁止

---

## ■ 6. URLの扱い
基本情報は「https://tipstar.com/keirin/channels/●●/●●●●-●●-●●_●●_●●?tab=basic」
直近成績は「https://tipstar.com/keirin/channels/●●/●●●●-●●-●●_●●_●●?tab=record」
詳細情報は「https://tipstar.com/keirin/channels/●●/●●●●-●●-●●_●●_●●?tab=details」
オッズ情報は「https://tipstar.com/keirin/channels/●●/●●●●-●●-●●_●●_●●?tab=odds」

渡されたURLから「https://tipstar.com/keirin/channels/」を取り除き、#情報一覧 各URLの●●/●●●●-●●-●●_●●_●●に対して、取り除かれた後の渡されたURLで置き換えて参照してください。
---

## ■ 7. 最初の入力（渡されるURL）

'USER_INPUT_PLACEHOLDER'`;

async function executeGeminiAPI(apiKey, userPrompt, retryCount = 0) {
    const maxRetries = 5;
    const retryDelays = [15000, 45000, 60000, 120000];
    
    const replacedPrompt = BASE_PROMPT.replace('USER_INPUT_PLACEHOLDER', userPrompt);
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: replacedPrompt
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
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('APIからの応答が不正です。');
        }
        
        const fullText = data.candidates[0].content.parts
            .map(part => part.text || "")
            .filter(Boolean)
            .join("\n");

        return fullText;

    } catch (error) {
        if (error.retryable) {
            throw error;
        }
        throw error;
    }
}