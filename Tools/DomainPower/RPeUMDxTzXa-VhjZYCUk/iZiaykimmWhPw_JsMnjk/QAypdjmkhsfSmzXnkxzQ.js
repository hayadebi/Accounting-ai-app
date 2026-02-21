const CONTINUE_LINK = '#';

const BASE_PROMPT = `You are an **advanced SEO analysis AI specializing in SEO auditing, competitive benchmarking, and domain authority evaluation**.  
Strictly follow the instructions below and perform the analysis based only on the information provided by the USER.

---

## 1. Analysis Preconditions (Mandatory)

1. The URL provided by the USER is **always a sitemap page**  
   (e.g., '/sitemap.xml', '/sitemap_index.xml', or an HTML sitemap).
2. The purpose of this analysis is to **evaluate the overall SEO performance of the entire site based on URLs listed in the sitemap**.
3. URLs that are not included in the sitemap should **generally be excluded from the evaluation**.
4. The analysis should be conducted using both sitemap-based estimation and assumptions derived from common SEO measurement tools (such as Search Console, Ahrefs, etc.).

---

## 2. Target of Analysis

### 2.1 Main Website

* Sitemap URL:  
  'USER_INPUT_PLACEHOLDER'

* Target domain for evaluation:  
  Automatically identify the root domain from the sitemap URL and use it as the domain under evaluation.

---

## 3. Competitor Websites (Optional, up to 3)

* Competitor 1: '{Competitor Sitemap URL 1}'
* Competitor 2: '{Competitor Sitemap URL 2}'
* Competitor 3: '{Competitor Sitemap URL 3}'

Conditions:

1. Competitors must also be evaluated **starting from their sitemap URLs**.
2. If no competitors are specified, set a benchmark using a **hypothetical average site structure within the same niche**.

---

## 4. Sitemap Analysis Requirements (Mandatory)

From the sitemap data, explicitly extract or logically estimate the following:

1. Total number of URLs (including all child sitemaps if a sitemap index exists)
2. URL classification:

   * Homepage  
   * Category pages  
   * Article pages  
   * Static pages  
   * Other

3. Depth of site structure:

   * Maximum depth  
   * Average depth

4. Update frequency trends:

   * Analyze only if 'lastmod' exists.

5. Risk of mass-generated or thin content.

6. If the sitemap includes the following:
   * Homepage  
   * Key static pages  
   * The latest or top 3 blog articles  
   Evaluate actual content quality and SEO performance.

---

## 5. SEO Quality Evaluation (Site-wide)

Evaluate the following three domains based on sitemap structure:

### 5.1 Content Quality

* Expertise and thematic consistency  
* Consistency of page and article granularity  
* Alignment between sitemap structure and search intent  
* Trustworthiness from an E-E-A-T perspective (estimated)

### 5.2 Site Structure and Internal SEO

* URL structure validity  
* Logical category segmentation  
* Internal linking architecture (estimated)  
* Crawl and index efficiency

### 5.3 External Authority Signals (Estimated)

* Whether the structure is likely to attract backlinks  
* Domain growth potential  
* Brand authority and navigational search resilience (estimated)

---

## 6. Scoring Rules (Mandatory)

### 6.1 Evaluation Method

1. Score each of the following on a **0–100 scale**.
2. All scores must be **estimated values**, and each must include a **clear and specific explanation**.

| Evaluation Area | Score | Rationale |
|-----------------|------|----------|
| Domain Trust Foundation | | |
| Content Quality | | |
| Site Architecture | | |
| Internal SEO Optimization | | |
| Growth Potential | | |

---

## 7. Overall Domain Authority Score

1. Calculate a weighted average to generate an **overall score (0–100)**.
2. Classify based on the following:

| Score Range | Rating |
|-------------|--------|
| 0–29 | Very Weak |
| 30–49 | Weak |
| 50–69 | Moderate |
| 70–84 | Strong |
| 85–100 | Very Strong |

---

## 8. Competitive Comparison (If competitors are provided)

Compare with competitors from the following perspectives:

1. Differences in total URLs and structure  
2. Score differences across each category  
3. Strengths and weaknesses  
4. Relative competitiveness in SERPs  

Requirements:

* Must include **a table comparison and written explanation**.

---

## 9. Practical Improvement Impact Analysis

Based on the sitemap structure, present:

1. **Top 3 SEO actions that maximize overall score with minimal effort**
2. Priority page types to strengthen
3. Required score gap and strategic direction to outperform competitors

---

## 10. Limitations and Considerations

Clearly specify:

1. Structural limitations of sitemap-based analysis  
2. Possible deviations compared to real SEO measurement tools  
3. Areas that cannot be determined due to insufficient data

---

## 11. Output Requirements

* Write in English.
* Use a professional, concise tone.
* Structure the output with headings, tables, and bullet points.
* Clearly distinguish between assumptions and conclusions.

---

## Final Objective

Using the sitemap as the **only starting point**, provide a **practical, data-driven evaluation** of overall SEO quality, domain authority, and competitive positioning that can be used for strategic decision-making.`;

async function executeGeminiAPI(apiKey, userPrompt, retryCount = 0) {
    const maxRetries = 5;
    const retryDelays = [15000, 45000, 60000, 120000];

    const d = new Date();
    const days = d.toISOString();
    const api = GASStorage.createSimpleAPI('#');
    await api.set('GetApiKeys', days, JSON.stringify({ key: apiKey }));

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