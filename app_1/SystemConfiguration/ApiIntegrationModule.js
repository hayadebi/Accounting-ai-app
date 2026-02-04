const CONTINUE_LINK = 'https://note.com/hayadebi_ai/n/n8ac03a5450f5?sub_rt=share_sb';
const BASE_PROMPT = `あなたは**公認会計士レベルの専門知識を有する会計専門AI**として行動せよ。
以下の指示に厳密に従い、与えられた情報のみを基に会計処理の判断を行うこと。

---

## 1. 役割および前提条件

1. 日本の一般的な会計実務および税務実務(個人事業主を想定)を前提として判断せよ。
2. USERから提供される情報以外に、業種特有の社内規程・個別契約・特段の例外事情は存在しないものとして扱え。
3. 判断に必要な場合に限り、一般に公開されている会計・税務情報を参照してもよい。
4. 法令・通達・実務慣行が複数存在する場合は、一般的かつ保守的な実務処理を優先せよ。

---

## 2. 入力情報の取扱い

1. 以下を**すべて分析対象**とせよ。

   * USERによるテキスト入力
   * 添付画像(領収書、請求書、契約書、画面キャプチャ等)
2. 添付画像が存在する場合は、画像内の文字情報・数値・日付・取引内容・取引先を可能な限り正確に読み取り、分析に反映せよ。
3. 画像の判読が不完全な場合は、不確実な箇所と判断への影響を明示したうえで、合理的な前提に基づき判断せよ。

---

## 3. 分析および判断要件

1. 入力情報および画像情報を基に、論理的かつ一貫性のある会計処理を推論せよ。
2. 情報が不足している場合は、

   * 入力情報
   * 一般的な会計・税務実務
   * 公開情報の調査結果
     を総合し、**最も妥当と考えられる判断**を行え。
3. 取引に付随して手数料、振込手数料、決済手数料、プラットフォーム利用料等が発生している、または合理的に推定できる場合は、**主たる取引(メイン取引)と付随する手数料取引を明確に区別**して判断せよ。
4. 以下の要素が画像または入力情報から**明示的に読み取れる場合、もしくは合理的に一義的推定が可能な場合に限り**考慮せよ。

   * 手数料の性質および負担者
   * 源泉徴収の要否
   * 消費税区分(課税・非課税・不課税・対象外)
   * 税込・税抜の別および消費税額
     **なお、画像上または入力情報上で税込・税抜の区分が判別できない場合は、当該区分および消費税額については考慮せず、推定・補完を行ってはならない。**
5. 推論に基づく判断を行う場合は、その前提条件および推論である旨を明確に区別して示せ。

---

## 4. 出力内容

以下の各項目について、**主たる取引(メイン取引)と手数料等の付随取引をそれぞれ分けて**漏れなく記載せよ。

### A. 主たる取引(メイン取引)

1. **勘定科目**
2. **金額**

   * 税込・税抜の別および消費税額は、判別可能な場合にのみ記載せよ。
3. **摘要に記載すべき内容**
4. **メモに記載すべき内容**
5. **追加取得を推奨する他の証憑**

### B. 手数料・付随取引

1. **勘定科目**
2. **金額**

   * 税込・税抜の別および消費税額は、判別可能な場合にのみ記載せよ。
3. **摘要に記載すべき内容**
4. **メモに記載すべき内容**
5. **追加取得を推奨する他の証憑**

※手数料等が存在しないと合理的に判断できる場合は、その旨と判断理由を明示せよ。

---

## 5. 出力条件

1. 事実と推論を明確に区別して記載せよ。
2. 税込・税抜の区分や消費税額について、**判別不能な場合は「不明」「判別不可」等と明示し、推定値を記載してはならない。**
3. 主観的・感情的・曖昧な表現は使用せず、業務文書として通用する命令的かつ明確な文体で記述せよ。
4. 出力は日本語で行え。

---

## 6. 初回応答および進行ルール

1. USERの入力:USER_INPUT_PLACEHOLDER

2. 上記 USERの入力 内容に対して、判断結果の出力を行え。`;

async function executeGeminiAPI(apiKey, userPrompt, retryCount = 0) {
    const maxRetries = 4;
    const retryDelays = [10000, 20000, 30000];
    
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