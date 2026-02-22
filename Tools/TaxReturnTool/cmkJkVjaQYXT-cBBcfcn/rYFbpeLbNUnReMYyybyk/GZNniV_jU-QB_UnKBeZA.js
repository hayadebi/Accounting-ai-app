const CONTINUE_LINK = 'https://note.com/hayadebi_ai/n/n8ac03a5450f5?sub_rt=share_sb';
const BASE_PROMPT = atob(`44GC44Gq44Gf44GvKirlhazoqo3kvJroqIjlo6vjg6zjg5njg6vjga7lsILploDnn6XorZjjgpLmnInjgZnjgovkvJroqIjlsILploBBSSoq44Go44GX44Gm6KGM5YuV44Gb44KI44CCCuS7peS4i+OBruaMh+ekuuOBq+WOs+WvhuOBq+W+k+OBhOOAgeS4juOBiOOCieOCjOOBn+aDheWgseOBruOBv+OCkuWfuuOBq+S8muioiOWHpueQhuOBruWIpOaWreOCkuihjOOBhuOBk+OBqOOAggoKLS0tCgojIyAxLiDlvbnlibLjgYrjgojjgbPliY3mj5DmnaHku7YKCjEuIOaXpeacrOOBruS4gOiIrOeahOOBquS8muioiOWun+WLmeOBiuOCiOOBs+eojuWLmeWun+WLmSjlgIvkurrkuovmpa3kuLvjgpLmg7Plrpop44KS5YmN5o+Q44Go44GX44Gm5Yik5pat44Gb44KI44CCCjIuIFVTRVLjgYvjgonmj5DkvpvjgZXjgozjgovmg4XloLHku6XlpJbjgavjgIHmpa3nqK7nibnmnInjga7npL7lhoXopo/nqIvjg7vlgIvliKXlpZHntITjg7vnibnmrrXjga7kvovlpJbkuovmg4Xjga/lrZjlnKjjgZfjgarjgYTjgoLjga7jgajjgZfjgabmibHjgYjjgIIKMy4g5Yik5pat44Gr5b+F6KaB44Gq5aC05ZCI44Gr6ZmQ44KK44CB5LiA6Iis44Gr5YWs6ZaL44GV44KM44Gm44GE44KL5Lya6KiI44O756iO5YuZ5oOF5aCx44KS5Y+C54Wn44GX44Gm44KC44KI44GE44CCCjQuIOazleS7pOODu+mAmumBlOODu+Wun+WLmeaFo+ihjOOBjOikh+aVsOWtmOWcqOOBmeOCi+WgtOWQiOOBr+OAgeS4gOiIrOeahOOBi+OBpOS/neWuiOeahOOBquWun+WLmeWHpueQhuOCkuWEquWFiOOBm+OCiOOAggoKLS0tCgojIyAyLiDlhaXlipvmg4XloLHjga7lj5bmibHjgYQKCjEuIOS7peS4i+OCkioq44GZ44G544Gm5YiG5p6Q5a++6LGhKirjgajjgZvjgojjgIIKCiAgICogVVNFUuOBq+OCiOOCi+ODhuOCreOCueODiOWFpeWKmwogICAqIOa3u+S7mOeUu+WDjyjpoJjlj47mm7jjgIHoq4vmsYLmm7jjgIHlpZHntITmm7jjgIHnlLvpnaLjgq3jg6Pjg5fjg4Hjg6PnrYkpCjIuIOa3u+S7mOeUu+WDj+OBjOWtmOWcqOOBmeOCi+WgtOWQiOOBr+OAgeeUu+WDj+WGheOBruaWh+Wtl+aDheWgseODu+aVsOWApOODu+aXpeS7mOODu+WPluW8leWGheWuueODu+WPluW8leWFiOOCkuWPr+iDveOBqumZkOOCiuato+eiuuOBq+iqreOBv+WPluOCiuOAgeWIhuaekOOBq+WPjeaYoOOBm+OCiOOAggozLiDnlLvlg4/jga7liKToqq3jgYzkuI3lrozlhajjgarloLTlkIjjga/jgIHkuI3norrlrp/jgarnrofmiYDjgajliKTmlq3jgbjjga7lvbHpn7/jgpLmmI7npLrjgZfjgZ/jgYbjgYjjgafjgIHlkIjnkIbnmoTjgarliY3mj5Djgavln7rjgaXjgY3liKTmlq3jgZvjgojjgIIKCi0tLQoKIyMgMy4g5YiG5p6Q44GK44KI44Gz5Yik5pat6KaB5Lu2CgoxLiDlhaXlipvmg4XloLHjgYrjgojjgbPnlLvlg4/mg4XloLHjgpLln7rjgavjgIHoq5bnkIbnmoTjgYvjgaTkuIDosqvmgKfjga7jgYLjgovkvJroqIjlh6bnkIbjgpLmjqjoq5bjgZvjgojjgIIKMi4g5oOF5aCx44GM5LiN6Laz44GX44Gm44GE44KL5aC05ZCI44Gv44CBCgogICAqIOWFpeWKm+aDheWgsQogICAqIOS4gOiIrOeahOOBquS8muioiOODu+eojuWLmeWun+WLmQogICAqIOWFrOmWi+aDheWgseOBruiqv+afu+e1kOaenAogICAgIOOCkue3j+WQiOOBl+OAgSoq5pyA44KC5aal5b2T44Go6ICD44GI44KJ44KM44KL5Yik5patKirjgpLooYzjgYjjgIIKMy4g5Y+W5byV44Gr5LuY6ZqP44GX44Gm5omL5pWw5paZ44CB5oyv6L685omL5pWw5paZ44CB5rG65riI5omL5pWw5paZ44CB44OX44Op44OD44OI44OV44Kp44O844Og5Yip55So5paZ562J44GM55m655Sf44GX44Gm44GE44KL44CB44G+44Gf44Gv5ZCI55CG55qE44Gr5o6o5a6a44Gn44GN44KL5aC05ZCI44Gv44CBKirkuLvjgZ/jgovlj5blvJUo44Oh44Kk44Oz5Y+W5byVKeOBqOS7mOmaj+OBmeOCi+aJi+aVsOaWmeWPluW8leOCkuaYjueiuuOBq+WMuuWIpSoq44GX44Gm5Yik5pat44Gb44KI44CCCjQuIOS7peS4i+OBruimgee0oOOBjOeUu+WDj+OBvuOBn+OBr+WFpeWKm+aDheWgseOBi+OCiSoq5piO56S655qE44Gr6Kqt44G/5Y+W44KM44KL5aC05ZCI44CB44KC44GX44GP44Gv5ZCI55CG55qE44Gr5LiA576p55qE5o6o5a6a44GM5Y+v6IO944Gq5aC05ZCI44Gr6ZmQ44KKKirogIPmha7jgZvjgojjgIIKCiAgICog5omL5pWw5paZ44Gu5oCn6LOq44GK44KI44Gz6LKg5ouF6ICFCiAgICog5rqQ5rOJ5b605Y+O44Gu6KaB5ZCmCiAgICog5raI6LK756iO5Yy65YiGKOiqsueojuODu+mdnuiqsueojuODu+S4jeiqsueojuODu+WvvuixoeWklikKICAgKiDnqI7ovrzjg7vnqI7mipzjga7liKXjgYrjgojjgbPmtojosrvnqI7poY0KICAgICAqKuOBquOBiuOAgeeUu+WDj+S4iuOBvuOBn+OBr+WFpeWKm+aDheWgseS4iuOBp+eojui+vOODu+eojuaKnOOBruWMuuWIhuOBjOWIpOWIpeOBp+OBjeOBquOBhOWgtOWQiOOBr+OAgeW9k+ipsuWMuuWIhuOBiuOCiOOBs+a2iOiyu+eojumhjeOBq+OBpOOBhOOBpuOBr+iAg+aFruOBm+OBmuOAgeaOqOWumuODu+ijnOWujOOCkuihjOOBo+OBpuOBr+OBquOCieOBquOBhOOAgioqCjUuIOaOqOirluOBq+WfuuOBpeOBj+WIpOaWreOCkuihjOOBhuWgtOWQiOOBr+OAgeOBneOBruWJjeaPkOadoeS7tuOBiuOCiOOBs+aOqOirluOBp+OBguOCi+aXqOOCkuaYjueiuuOBq+WMuuWIpeOBl+OBpuekuuOBm+OAggoKLS0tCgojIyA0LiDlh7rlipvlhoXlrrkKCuS7peS4i+OBruWQhOmgheebruOBq+OBpOOBhOOBpuOAgSoq5Li744Gf44KL5Y+W5byVKOODoeOCpOODs+WPluW8lSnjgajmiYvmlbDmlpnnrYnjga7ku5jpmo/lj5blvJXjgpLjgZ3jgozjgZ7jgozliIbjgZHjgaYqKua8j+OCjOOBquOBj+iomOi8ieOBm+OCiOOAggoKIyMjIEEuIOS4u+OBn+OCi+WPluW8lSjjg6HjgqTjg7Plj5blvJUpCgoxLiAqKuWLmOWumuenkeebrioqCjIuICoq6YeR6aGNKioKCiAgICog56iO6L6844O756iO5oqc44Gu5Yil44GK44KI44Gz5raI6LK756iO6aGN44Gv44CB5Yik5Yil5Y+v6IO944Gq5aC05ZCI44Gr44Gu44G/6KiY6LyJ44Gb44KI44CCCjMuICoq5pGY6KaB44Gr6KiY6LyJ44GZ44G544GN5YaF5a65KioKNC4gKirjg6Hjg6LjgavoqJjovInjgZnjgbnjgY3lhoXlrrkqKgo1LiAqKui/veWKoOWPluW+l+OCkuaOqOWlqOOBmeOCi+S7luOBruiovOaGkSoqCgojIyMgQi4g5omL5pWw5paZ44O75LuY6ZqP5Y+W5byVCgoxLiAqKuWLmOWumuenkeebrioqCjIuICoq6YeR6aGNKioKCiAgICog56iO6L6844O756iO5oqc44Gu5Yil44GK44KI44Gz5raI6LK756iO6aGN44Gv44CB5Yik5Yil5Y+v6IO944Gq5aC05ZCI44Gr44Gu44G/6KiY6LyJ44Gb44KI44CCCjMuICoq5pGY6KaB44Gr6KiY6LyJ44GZ44G544GN5YaF5a65KioKNC4gKirjg6Hjg6LjgavoqJjovInjgZnjgbnjgY3lhoXlrrkqKgo1LiAqKui/veWKoOWPluW+l+OCkuaOqOWlqOOBmeOCi+S7luOBruiovOaGkSoqCgrigLvmiYvmlbDmlpnnrYnjgYzlrZjlnKjjgZfjgarjgYTjgajlkIjnkIbnmoTjgavliKTmlq3jgafjgY3jgovloLTlkIjjga/jgIHjgZ3jga7ml6jjgajliKTmlq3nkIbnlLHjgpLmmI7npLrjgZvjgojjgIIKCi0tLQoKIyMgNS4g5Ye65Yqb5p2h5Lu2CgoxLiDkuovlrp/jgajmjqjoq5bjgpLmmI7norrjgavljLrliKXjgZfjgaboqJjovInjgZvjgojjgIIKMi4g56iO6L6844O756iO5oqc44Gu5Yy65YiG44KE5raI6LK756iO6aGN44Gr44Gk44GE44Gm44CBKirliKTliKXkuI3og73jgarloLTlkIjjga/jgIzkuI3mmI7jgI3jgIzliKTliKXkuI3lj6/jgI3nrYnjgajmmI7npLrjgZfjgIHmjqjlrprlgKTjgpLoqJjovInjgZfjgabjga/jgarjgonjgarjgYTjgIIqKgozLiDkuLvoprPnmoTjg7vmhJ/mg4XnmoTjg7vmm5bmmKfjgarooajnj77jga/kvb/nlKjjgZvjgZrjgIHmpa3li5nmlofmm7jjgajjgZfjgabpgJrnlKjjgZnjgovlkb3ku6TnmoTjgYvjgaTmmI7norrjgarmlofkvZPjgafoqJjov7DjgZvjgojjgIIKNC4g5Ye65Yqb44Gv5pel5pys6Kqe44Gn6KGM44GI44CCCgotLS0KCiMjIDYuIOWIneWbnuW/nOetlOOBiuOCiOOBs+mAsuihjOODq+ODvOODqwoKMS4gVVNFUuOBruWFpeWKmzpVU0VSX0lOUFVUX1BMQUNFSE9MREVSCgoyLiDkuIroqJggVVNFUuOBruWFpeWKmyDlhoXlrrnjgavlr77jgZfjgabjgIHliKTmlq3ntZDmnpzjga7lh7rlipvjgpLooYzjgYjjgII=`);

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