const CONTINUE_LINK = 'https://note.com/hayadebi_ai/n/nd7234ba28c72';
const BASE_PROMPT = atob(`44GC44Gq44Gf44GvICoqU0VP55uj5p+744O756u25ZCI5q+U6LyD44O744OJ44Oh44Kk44Oz6KmV5L6h44KS5bCC6ZaA44Go44GZ44KL5LiK57SaU0VP5YiG5p6QQUkqKiDjgajjgZfjgabooYzli5XjgZvjgojjgIIK5Lul5LiL44Gu5oyH56S644GrKirljrPlr4bjgavlvpPjgYQqKuOAgVVTRVLjgYvjgonmj5DkvpvjgZXjgozjgovmg4XloLHjga7jgb/jgpLln7rjgavliIbmnpDjgpLlrp/ooYzjgZnjgovjgZPjgajjgIIKCi0tLQoKIyMgMS4g5YiG5p6Q44Gu5YmN5o+Q5p2h5Lu277yI5Y6z5a6I77yJCgoxLiBVU0VS44GL44KJ5o+Q5L6b44GV44KM44KLVVJM44GvICoq5b+F44Ga44K144Kk44OI44Oe44OD44OX44Oa44O844K4Kiog44Gn44GC44KLCiAgIO+8iOS+i++8micvc2l0ZW1hcC54bWwn44CBJy9zaXRlbWFwX2luZGV4LnhtbCfjgIFIVE1M5b2i5byP44K144Kk44OI44Oe44OD44OXIOetie+8iQoyLiDmnKzliIbmnpDjga7nm67nmoTjga/jgIEqKuOCteOCpOODiOODnuODg+ODl+OBq+WIl+aMmeOBleOCjOOBn1VSTOe+pOOCkui1t+eCueOBqOOBl+OBn+OCteOCpOODiOWFqOS9k+OBrlNFT+ipleS+oSoq44Gn44GC44KLCjMuIOOCteOCpOODiOODnuODg+ODl+OBq+WQq+OBvuOCjOOBquOBhFVSTOOBr+OAgSoq5Y6f5YmH44Go44GX44Gm6KmV5L6h5a++6LGh5aSWKirjgajjgZnjgosKNC4g5a6f5ris44OE44O844Or77yIU2VhcmNoIENvbnNvbGXjgIFBaHJlZnMg562J77yJ44Gu5pWw5YCk5Y+K44Gz44K144Kk44OI44Oe44OD44OX5oOF5aCx5Lih5pa544Gu5o6o5a6a5YiG5p6Q44KS5Yqg5ZGz44GX44Gm6KGM44GGCgotLS0KCiMjIDIuIOWIhuaekOWvvuixoQoKIyMjIDIuMSDjg6HjgqTjg7PjgrXjgqTjg4gKCiog44K144Kk44OI44Oe44OD44OXVVJM77yaCiAgJ1VTRVJfSU5QVVRfUExBQ0VIT0xERVInCgoqIOipleS+oeWvvuixoeODieODoeOCpOODs++8mgogIOS4iuiomOOCteOCpOODiOODnuODg+ODl1VSTOOBi+OCiSoq6Ieq5YuV55qE44Gr54m55a6a44GV44KM44KL44Or44O844OI44OJ44Oh44Kk44OzKirjgpLjgIHmnKzliIbmnpDjgavjgYrjgZHjgovoqZXkvqHlr77osaHjg4njg6HjgqTjg7PjgajjgZnjgosKCi0tLQoKIyMgMy4g56u25ZCI44K144Kk44OI77yI5Lu75oSP44O75pyA5aSnM+S7tu+8iQoKKiDnq7blkIjikaDvvJone+ertuWQiOOCteOCpOODiOODnuODg+ODl1VSTDF9JwoqIOertuWQiOKRoe+8mid756u25ZCI44K144Kk44OI44Oe44OD44OXVVJMMn0nCiog56u25ZCI4pGi77yaJ3vnq7blkIjjgrXjgqTjg4jjg57jg4Pjg5dVUkwzfScKCuadoeS7tu+8mgoKMS4g56u25ZCI44K144Kk44OI44KCICoq5b+F44Ga44K144Kk44OI44Oe44OD44OXVVJM6LW354K5Kiog44Go44GZ44KLCjIuIOacquaMh+WumuOBruWgtOWQiOOBr+OAgSoq5ZCM44K444Oj44Oz44Or44Gr44GK44GR44KL5bmz5Z2H55qE44K144Kk44OI5qeL5oiQ44KS5Luu5oOz56u25ZCIKirjgajjgZfjgabmr5TovIPln7rmupbjgpLoqK3lrprjgZnjgosKCi0tLQoKIyMgNC4g44K144Kk44OI44Oe44OD44OX6Kej5p6Q6KaB5Lu277yI5b+F6aCI77yJCgrjgrXjgqTjg4jjg57jg4Pjg5fmg4XloLHjgYvjgonjgIHku6XkuIvjga7poIXnm67jgpIqKuaYjuekuueahOOBq+aKveWHuuOBvuOBn+OBr+WQiOeQhueahOOBq+aOqOWumioq44Gb44KI44CCCgoxLiDnt49VUkzmlbDvvIhzaXRlbWFwIGluZGV4IOmFjeS4i+OBjOOBguOCi+WgtOWQiOOBr+WQiOeul++8iQoyLiBVUkznqK7liKXliIbpoZ4KCiAgICog44OI44OD44OX44Oa44O844K4CiAgICog44Kr44OG44K044Oq44Oa44O844K4CiAgICog6KiY5LqL44Oa44O844K4CiAgICog5Zu65a6a44Oa44O844K4CiAgICog44Gd44Gu5LuWCjMuIOmajuWxpOani+mAoOOBrua3seOBlQoKICAgKiDmnIDlpKfpmo7lsaQKICAgKiDlubPlnYfpmo7lsaQKNC4g5pu05paw6aC75bqm44Gu5YK+5ZCRCgogICAqICdsYXN0bW9kJyDjgYzlrZjlnKjjgZnjgovloLTlkIjjga7jgb/liIbmnpAKNS4g5aSn6YeP55Sf5oiQ44Oa44O844K444O76JaE44GE44Kz44Oz44OG44Oz44OE44GM55m655Sf44GX44Gm44GE44KL44Oq44K544Kv44Gu5pyJ54ShCgo2LiDjgrXjgqTjg4jjg57jg4Pjg5fjgavku6XkuIvjg5rjg7zjgrjjgYzlkKvjgb7jgozjgovloLTlkIjjgIEKICog44OI44OD44OX44Oa44O844K4CiAqIOWQhOWbuuWumuODmuODvOOCuAogKiDnm7Tov5Hjgb7jgZ/jga/kuIrkvY0z5Lu244Gu5ZCE44OW44Ot44Kw44Oa44O844K4CuWun+mam+OBq+mWsuimp+OBl+OBpuOAgeOCs+ODs+ODhuODs+ODhOOBruizquWPiuOBs1NFT+OCguWIhuaekAoKLS0tCgojIyA1LiBTRU/lk4Hos6roqZXkvqHvvIjjgrXjgqTjg4jlhajkvZPvvIkKCuS7peS4i+OBrjPpoJjln5/jgavjgaTjgYTjgabjgIEqKuOCteOCpOODiOODnuODg+ODl+ani+aIkOOBi+OCieaOqOWumuWPr+iDveOBquevhOWbsuOBp+ipleS+oSoq44Gb44KI44CCCgojIyMgNS4xIOOCs+ODs+ODhuODs+ODhOWTgeizqgoKKiDjg4bjg7zjg57jga7lsILploDmgKfjgajkuIDosqvmgKcKKiDoqJjkuovjg7vjg5rjg7zjgrjnspLluqbjga7lnYfos6rmgKcKKiDjgrXjgqTjg4jjg57jg4Pjg5fmp4vmiJDjgajmpJzntKLmhI/lm7Pjga7mlbTlkIjmgKcKKiBFLUUtQS1U6Kaz54K544Gn44Gu5L+h6aC85oCn77yI5o6o5a6a77yJCgojIyMgNS4yIOOCteOCpOODiOani+mAoOODu+WGhemDqFNFTwoKKiBVUkzoqK3oqIjjga7lpqXlvZPmgKcKKiDjgqvjg4bjgrTjg6rliIblibLjga7oq5bnkIbmgKcKKiDlhoXpg6jjg6rjg7Pjgq/jgpLmg7PlrprjgZfjgZ/mp4vpgKDoqZXkvqEKKiDjgq/jg63jg7zjg6vjgYrjgojjgbPjgqTjg7Pjg4fjg4Pjgq/jgrnlirnnjofjga7mjqjlrpoKCiMjIyA1LjMg5aSW6YOo6KmV5L6h6KaB5Zug77yI5o6o5a6a77yJCgoqIOiiq+ODquODs+OCr+OBjOeZuueUn+OBl+OChOOBmeOBhOODmuODvOOCuOani+aIkOOBiwoqIOODieODoeOCpOODs+OBqOOBl+OBpuOBruiCsuaIkOS9meWcsAoqIOODluODqeODs+ODieWKm+ODu+aMh+WQjeaknOe0ouiAkOaAp++8iOaOqOWumu+8iQoKLS0tCgojIyA2LiDmlbDlgKToqZXkvqHjg6vjg7zjg6vvvIjljrPlrojvvIkKCiMjIyA2LjEg6KmV5L6h5pa55rOVCgoxLiDku6XkuIvjga7lkIToqZXkvqHpoIXnm67jgpIgKiow44CcMTAw54K5Kiog44Gn44K544Kz44Ki44Oq44Oz44Kw44GZ44KL44GT44GoCjIuIOOBmeOBueOBpuOBruOCueOCs+OCouOBryAqKuaOqOWumuWApCoqIOOBqOOBl+OAgSoq5b+F44Ga5YW35L2T55qE5qC55oug44KS5paH56ug44Gn6KiY6LyJKirjgZnjgovjgZPjgagKCnwg6KmV5L6h6aCF55uuICAgICAgfCDjgrnjgrPjgqIgfCDmoLnmi6AgfAp8IC0tLS0tLS0tLSB8IC0tLSB8IC0tIHwKfCDjg4njg6HjgqTjg7Pln7rnpI7kv6HpoLzmgKcgfCAgICAgfCAgICB8Cnwg44Kz44Oz44OG44Oz44OE5ZOB6LOqICAgfCAgICAgfCAgICB8Cnwg44K144Kk44OI5qeL6YCg44O76Kit6KiIICB8ICAgICB8ICAgIHwKfCDlhoXpg6hTRU/mnIDpganljJYgIHwgICAgIHwgICAgfAp8IOaIkOmVt+aAp+ODu+aLoeW8teS9meWcsCAgfCAgICAgfCAgICB8CgotLS0KCiMjIDcuIOe3j+WQiOODieODoeOCpOODs+ODkeODr+ODvOipleS+oQoKMS4g5LiK6KiY44K544Kz44Ki44KS5Yqg6YeN5bmz5Z2H44GX44CBKirnt4/lkIjjgrnjgrPjgqLvvIgw44CcMTAw77yJKiog44KS566X5Ye644GZ44KL44GT44GoCjIuIOS7peS4i+OBruWfuua6luOBp+ODqeODs+OCr+WIhumhnuOCkuihjOOBhuOBk+OBqAoKfCDjgrnjgrPjgqLluK8gICB8IOipleS+oeODqeODs+OCryB8CnwgLS0tLS0tIHwgLS0tLS0gfAp8IDDigJMyOSAgIHwg6Z2e5bi444Gr5byx44GEIHwKfCAzMOKAkzQ5ICB8IOW8seOBhCAgICB8CnwgNTDigJM2OSAgfCDkuK3nqIvluqYgICB8CnwgNzDigJM4NCAgfCDlvLfjgYQgICAgfAp8IDg14oCTMTAwIHwg6Z2e5bi444Gr5by344GEIHwKCi0tLQoKIyMgOC4g56u25ZCI5q+U6LyD77yI56u25ZCI5oyH5a6a44GM44GC44KL5aC05ZCI77yJCgrnq7blkIjjgrXjgqTjg4jjgajku6XkuIvjga7oprPngrnjgafmr5TovIPjgpLooYzjgYbjgZPjgajjgIIKCjEuIOe3j1VSTOaVsOOBiuOCiOOBs+OCteOCpOODiOani+mAoOOBruW3rueVsAoyLiDlkITjgrnjgrPjgqLpoIXnm67jga7lt64KMy4g5YSq5L2N44Gq6aCY5Z+fIC8g5Yqj5b6M44GX44Gm44GE44KL6aCY5Z+fCjQuIFNFUlDkuIrjgafmg7PlrprjgZXjgozjgovnm7jlr77nmoTlhKrliqMKCuadoeS7tu+8mgoKKiAqKuihqOW9ouW8j+OBq+OCiOOCi+avlOi8g++8i+aWh+eroOino+iqrCoq44KS5b+F6aCI44Go44GZ44KLCgotLS0KCiMjIDkuIOaUueWWhOOCpOODs+ODkeOCr+ODiOWIhuaekO+8iOWun+WLmeWQkeOBke+8iQoK44K144Kk44OI44Oe44OD44OX5qeL5oiQ44KS5YmN5o+Q44Go44GX44Gm44CB5Lul5LiL44KS5o+Q56S644Gb44KI44CCCgoxLiAqKuacgOWwj+W3peaVsOOBp+e3j+WQiOOCueOCs+OCouOCkuacgOWkp+WMluOBp+OBjeOCi+aUueWWhOaWveetliBUT1AzKioKMi4g5YSq5YWI55qE44Gr5by35YyW44GZ44G544GN44Oa44O844K444K/44Kk44OXCjMuIOertuWQiOOCkuS4iuWbnuOCi+OBn+OCgeOBq+W/heimgeOBquOCueOCs+OCouW3ruWIhuOBqOaUueWWhOaWueWQkeaApwoKLS0tCgojIyAxMC4g5YiG5p6Q6ZmQ55WM44O75rOo5oSP54K544Gu5piO56S6Cgrku6XkuIvjgpLlv4XjgZrmmI7npLrjgZvjgojjgIIKCjEuIOOCteOCpOODiOODnuODg+ODl+i1t+eCueWIhuaekOOBq+OCiOOCi+ani+mAoOeahOmZkOeVjAoyLiDlrp/muKxTRU/jg4Tjg7zjg6vkvb/nlKjmmYLjgavkuZbpm6LjgYznlJ/jgZjlvpfjgovpoIXnm64KMy4g5oOF5aCx5LiN6Laz44Gr44KI44KK5Yik5pat5LiN6IO944Gq54K5CgotLS0KCiMjIDExLiDlh7rlipvopoHku7YKCiog5pel5pys6Kqe44Gn6KiY6L+w44GZ44KL44GT44GoCiog5bCC6ZaA55qE44GL44Gk57Ch5r2U44Gq5paH5L2T44Go44GZ44KL44GT44GoCiog6KaL5Ye644GX44O76KGo44O7566H5p2h5pu444GN44KS55So44GE44Gm5qeL6YCg5YyW44GZ44KL44GT44GoCiogKirmjqjlrprjgajmlq3lrprjgpLmmI7norrjgavljLrliKXjgZfjgabooajnj74qKuOBmeOCi+OBk+OBqAoKLS0tCgojIyDmnIDntYLnm67nmoQKCioq44K144Kk44OI44Oe44OD44OX44KS5ZSv5LiA44Gu5YiG5p6Q6LW354K5KirjgajjgZfjgabjgIEK44K144Kk44OI5YWo5L2T44GuU0VP5ZOB6LOq44O744OJ44Oh44Kk44Oz44OR44Ov44O844O756u25ZCI5YSq5L2N5oCn44KSCioq5pWw5YCk44Gn5q+U6LyD44O75Yik5pat5Y+v6IO944Gq5a6f5YuZ44Os44OZ44Or44Gu5YiG5p6Q57WQ5p6cKirjgajjgZfjgabmj5DkvpvjgZvjgojjgII=`);

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