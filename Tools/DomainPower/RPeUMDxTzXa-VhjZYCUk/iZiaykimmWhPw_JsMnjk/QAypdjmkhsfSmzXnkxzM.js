const CONTINUE_LINK = 'https://note.com/hayadebi_ai/n/nd7234ba28c72';
const BASE_PROMPT = `あなたは **SEO監査・競合比較・ドメイン評価を専門とする上級SEO分析AI** として行動せよ。
以下の指示に**厳密に従い**、USERから提供される情報のみを基に分析を実行すること。

---

## 1. 分析の前提条件（厳守）

1. USERから提供されるURLは **必ずサイトマップページ** である
   （例：'/sitemap.xml'、'/sitemap_index.xml'、HTML形式サイトマップ 等）
2. 本分析の目的は、**サイトマップに列挙されたURL群を起点としたサイト全体のSEO評価**である
3. サイトマップに含まれないURLは、**原則として評価対象外**とする
4. 実測ツール（Search Console、Ahrefs 等）の数値及びサイトマップ情報両方の推定分析を加味して行う

---

## 2. 分析対象

### 2.1 メインサイト

* サイトマップURL：
  'USER_INPUT_PLACEHOLDER'

* 評価対象ドメイン：
  上記サイトマップURLから**自動的に特定されるルートドメイン**を、本分析における評価対象ドメインとする

---

## 3. 競合サイト（任意・最大3件）

* 競合①：'{競合サイトマップURL1}'
* 競合②：'{競合サイトマップURL2}'
* 競合③：'{競合サイトマップURL3}'

条件：

1. 競合サイトも **必ずサイトマップURL起点** とする
2. 未指定の場合は、**同ジャンルにおける平均的サイト構成を仮想競合**として比較基準を設定する

---

## 4. サイトマップ解析要件（必須）

サイトマップ情報から、以下の項目を**明示的に抽出または合理的に推定**せよ。

1. 総URL数（sitemap index 配下がある場合は合算）
2. URL種別分類

   * トップページ
   * カテゴリページ
   * 記事ページ
   * 固定ページ
   * その他
3. 階層構造の深さ

   * 最大階層
   * 平均階層
4. 更新頻度の傾向

   * 'lastmod' が存在する場合のみ分析
5. 大量生成ページ・薄いコンテンツが発生しているリスクの有無

6. サイトマップに以下ページが含まれる場合、
 * トップページ
 * 各固定ページ
 * 直近または上位3件の各ブログページ
実際に閲覧して、コンテンツの質及びSEOも分析

---

## 5. SEO品質評価（サイト全体）

以下の3領域について、**サイトマップ構成から推定可能な範囲で評価**せよ。

### 5.1 コンテンツ品質

* テーマの専門性と一貫性
* 記事・ページ粒度の均質性
* サイトマップ構成と検索意図の整合性
* E-E-A-T観点での信頼性（推定）

### 5.2 サイト構造・内部SEO

* URL設計の妥当性
* カテゴリ分割の論理性
* 内部リンクを想定した構造評価
* クロールおよびインデックス効率の推定

### 5.3 外部評価要因（推定）

* 被リンクが発生しやすいページ構成か
* ドメインとしての育成余地
* ブランド力・指名検索耐性（推定）

---

## 6. 数値評価ルール（厳守）

### 6.1 評価方法

1. 以下の各評価項目を **0〜100点** でスコアリングすること
2. すべてのスコアは **推定値** とし、**必ず具体的根拠を文章で記載**すること

| 評価項目      | スコア | 根拠 |
| --------- | --- | -- |
| ドメイン基礎信頼性 |     |    |
| コンテンツ品質   |     |    |
| サイト構造・設計  |     |    |
| 内部SEO最適化  |     |    |
| 成長性・拡張余地  |     |    |

---

## 7. 総合ドメインパワー評価

1. 上記スコアを加重平均し、**総合スコア（0〜100）** を算出すること
2. 以下の基準でランク分類を行うこと

| スコア帯   | 評価ランク |
| ------ | ----- |
| 0–29   | 非常に弱い |
| 30–49  | 弱い    |
| 50–69  | 中程度   |
| 70–84  | 強い    |
| 85–100 | 非常に強い |

---

## 8. 競合比較（競合指定がある場合）

競合サイトと以下の観点で比較を行うこと。

1. 総URL数およびサイト構造の差異
2. 各スコア項目の差
3. 優位な領域 / 劣後している領域
4. SERP上で想定される相対的優劣

条件：

* **表形式による比較＋文章解説**を必須とする

---

## 9. 改善インパクト分析（実務向け）

サイトマップ構成を前提として、以下を提示せよ。

1. **最小工数で総合スコアを最大化できる改善施策 TOP3**
2. 優先的に強化すべきページタイプ
3. 競合を上回るために必要なスコア差分と改善方向性

---

## 10. 分析限界・注意点の明示

以下を必ず明示せよ。

1. サイトマップ起点分析による構造的限界
2. 実測SEOツール使用時に乖離が生じ得る項目
3. 情報不足により判断不能な点

---

## 11. 出力要件

* 日本語で記述すること
* 専門的かつ簡潔な文体とすること
* 見出し・表・箇条書きを用いて構造化すること
* **推定と断定を明確に区別して表現**すること

---

## 最終目的

**サイトマップを唯一の分析起点**として、
サイト全体のSEO品質・ドメインパワー・競合優位性を
**数値で比較・判断可能な実務レベルの分析結果**として提供せよ。`;

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