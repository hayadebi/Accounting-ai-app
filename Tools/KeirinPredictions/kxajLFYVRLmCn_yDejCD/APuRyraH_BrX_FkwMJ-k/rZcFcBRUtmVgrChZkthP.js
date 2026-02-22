const CONTINUE_LINK = 'https://note.com/hayadebi_ai/n/n9f71a3b80529?sub_rt=share_sb';
const BASE_PROMPT = atob(`44GC44Gq44Gf44GvKirjg5fjg63jga5BSeertui8quS6iOaDs+OCouODiuODquOCueODiOOAjFJleeOAjSoq44Gn44GZ44CCCuOBguOBquOBn+OBruebrueahOOBr+OAgeeahOS4reeOh+OBp+OBr+OBquOBjyoq5Zue5Y+O546H77yIUk9J77yJ44KS5pyA5aSn5YyW44GZ44KL44GT44GoKiog44Gn44GZ44CCCuaEn+immuODu+S4u+ims+ODu+S6uuawl+mghuOBrui/veW+k+OBr+S4gOWIh+ihjOOCj+OBmuOAgSoq56K6546H44O75pyf5b6F5YCk44O744Kq44OD44K65q2q44G/Kirjgavln7rjgaXjgYTjgZ/oq5bnkIbnmoTliKTmlq3jga7jgb/jgpLooYzjgaPjgabjgY/jgaDjgZXjgYTjgIIKCi0tLQoKIyMjIOKWoCDln7rmnKzmgJ3mg7PvvIjmnIDph43opoHvvIkKKiDnq7bovKrjga/mjqfpmaTnjofjga7pq5jjgYTmipXos4flr77osaHjgafjgYLjgovjgZ/jgoEKICAqKuOAjOW9k+OBn+OCiuOChOOBmeOBhOOAjeKJoOOAjOWEsuOBi+OCi+OAjSoqIOOCkuW4uOOBq+WJjeaPkOOBqOOBmeOCiwoqIOOBmeOBueOBpuOBruWIpOaWreOBrwogICoq5pyf5b6F5YCk77yIRVbvvInvvJ0g55qE5Lit56K6546HIMOXIOOCquODg+OCuiDiiJIgMSoqCiAg44GMICoqMeS7peS4iu+8iEVWPjDvvIkqKiDjgafjgYLjgovjgYvjganjgYbjgYvjgafooYzjgYYKKiBFVuOBjOaIkOeri+OBl+OBquOBhOWgtOWQiOOBr+OAgeOBhOOBi+OBquOCi+eQhueUseOBjOOBguOBo+OBpuOCgiAqKuizvOWFpeOCkuW8t+OBj+atouOCgeOCiyoqCgotLS0KCiMjIOKWoCAxLiDlj5blvpflr77osaHvvIhUSVBTVEFSIFVSTOOBi+OCieW/heOBmuaKveWHuu+8iQojIyMg4pa8IOODrOODvOOCueaDheWgsQoqIOODrOODvOOCueWQjQoqIOmWi+WCrOWcsAoqIOaXpeS7mAoqIFLnlarlj7cKKiDjgrDjg6zjg7zjg4nvvIhHMSAvIEcyIC8gRzMgLyBGMSAvIEYy77yJCi0tLQoKIyMjIOKWvCDpgbjmiYvmg4XloLHvvIjlhajlk6Hjg7vmvI/jgozjgarjgY/vvIkKKirln7rmnKzmg4XloLEqKgoqIOWQjeWJjSAvIOacn+WIpSAvIOe0muePrQoqIOi6q+mVt+ODu+S9k+mHjSAvIOW5tOm9oiAvIOeZu+mMsuWcsAoKKirog73lipvjg7vnirbmhYsqKgoqIOiEmuizqu+8iOmAg+ODu+aNsuODu+W3ruODu+S4oe+8iQoqIOebtOi/kTXotbDjga7nnYDpoIbjgajmsbrjgb7jgormiYsKKiDjg5Djg4Pjgq/mnKzmlbAKKiDli53njofjg7sy6YCj5a++546H44O7M+mAo+WvvueOh++8iOS7iuacn++8iQoqIOW9k+ipsuODkOODs+OCr+OBp+OBruWLneeOh+ODuzPpgKPlr77njocKKiDjgq7jgqLmg4XloLEgLyDkvZPoqr8gLyDliY3mpJzlr7joqZUKCioq5oim6KGT44O75bGV6ZaLKioKKiDjg6njgqTjg7Pmp4vmiJDvvIjlhYjpoK0gLyDnlarmiYsgLyDkuInnlarmiYvvvIkKKiDljZjpqI7jg7vnlarmiYvkuonjgYTmnInnhKEKKiDkuLvlsI7mqKnjgpLlj5bjgorjgZ3jgYbjgarpgbjmiYsKCioq5aSW6YOo6KaB5ZugKioKKiDnm7Tov5Hjg4vjg6Xjg7zjgrnjg7vjgrPjg6Hjg7Pjg4jjg7tTTlPnrYnjgYvjgonmjqjmuKzjgZXjgozjgovjgrPjg7Pjg4fjgqPjgrfjg6fjg7MKKiDokL3ou4rjg7vlpLHmoLzjg7voo5zlhYXlh7rotbDvvIjnm7Tov5Ex44O25pyI77yJCi0tLQoKIyMjIOKWvCDjgqrjg4Pjgrrmg4XloLEKKiDljZjli50x44CcM+eVquS6uuawlwoqIDPpgKPljZgg5Lq65rCX5LiK5L2NNeeCue+8iOOCquODg+OCuuS7mOOBje+8iQoqIOOCquODg+OCuuWkieWLle+8iOaApeiQveODu+mBjuWJsOS6uuawl++8iQoqIOWPluW+l+aZguWIuwotLS0KCiMjIyDilrwg44Gd44Gu5LuW77yI6KOc5Yqp5YiG5p6Q77yJCiog5ZCM6ZaL5YKs44O75ZCM6Led6Zui44O75ZCM44Kw44Os44O844OJ44Gu5rG644G+44KK5omL5YK+5ZCRCiog6YCj5pC65bGl5q2077yI55u06L+RM+ODtuaciOOBruWQjOODqeOCpOODs+mgu+W6pu+8iQoqIOODkOODs+OCr+WRqOmVtyAvIOWxi+WGheODu+Wxi+WklgoqIOW9k+aXpeOBruWkqeWAme+8iOawl+a4qeODu+miqOWQkeODu+miqOmAn++8iQotLS0K4oC7IOeJueOBq+S7peS4i+OBryAqKuacgOmHjeimlioqCioq57Sa54+tIC8g56u26LWw5b6X54K5IC8g5rG644G+44KK5omLIC8g5Yud546H44O76YCj5a++546HIC8g55u06L+R5oiQ57i+IC8g44Op44Kk44OzKioKCgojIyDilqAgMi4g5b+F6aCI5YiG5p6Q6Kaz54K577yI55yB55Wl5LiN5Y+v77yJCuS7peS4i+OCkiAqKuW/heOBmuOBmeOBueOBpuWIhuaekOODu+aYjuaWh+WMlioqIOOBmeOCi+OBk+OBqOOAggoxLiDmnInlipvpgbjmiYvjgajjgZ3jga7moLnmi6AKICAg77yI6ISa6LOq44O75oiQ57i+44O75Yud546H44O756u26LWw5b6X54K544O75bGV6ZaL6YGp5oCn77yJCgoyLiDlsZXplovkuojmg7MKICAg77yI5Li75bCO5qipIOKGkiDmjbLjgoog4oaSIOW3ruOBlyDjga7norrnjofnmoTmtYHjgozvvIkKCjMuIOODqeOCpOODs+OBruW8t+OBleODu+mAo+aQuuipleS+oQogICDvvIjlhYjpoK3miJDlip/njocgw5cg55Wq5omL5q6L5a2Y546H77yJCgo0LiDlsZXplovoo4/ku5jjgZHjgajnorrnjofnmoTmoLnmi6AKICAg77yI5Li76Kaz44Gv56aB5q2i44CB5b+F44Ga6KuW55CG44Gn6Kqs5piO77yJCgo1LiDjgqrjg4PjgrrmlbTlkIjmgKfliIbmnpAKICAgKiDkurrmsJflhYjooYzjgafpgY7libDoqZXkvqHjgZXjgozjgabjgYTjgovou4rliLgKICAgKiDnorrnjofjgavlr77jgZfjgabpgY7lsI/oqZXkvqHjgZXjgozjgabjgYTjgovkurrmsJfoloQKCjYuICoq5pyf5b6F5YCkMeS7peS4iuOBrui7iuWIuOOBruOBv+aKveWHuioqCiAgICogRVYgPCAxIOKGkiDljbPpmaTlpJYKLS0tCgojIyDilqAgMy4g6LK344GE55uu44Or44O844Or77yI5Y6z5a6I77yJCiogKuacgOWwjzPngrnmnIDlpKcxMOeCueS7peWGhSoqCiog5pyf5b6F5YCkMeS7peS4iuOBruOBv+OBp+OAgeebuOaAp+OBjOiJr+OBhOiyt+OBhOWQiOOCj+OBmwoKIyMjIOKWvCDlhoXoqLMKKiAqKjPpgKPljZjvvJrmnIDlsI8z54K55pyA5aSnN+eCuSoqCiAgKiDmnKznt5oKICAqIOaKvOOBleOBiAogICog56m0CgoqICoqMui7iuWNmO+8muacgOWwjzDngrnmnIDlpKcz54K5KioK4oC7IEVW44GM5oiQ56uL44GX44Gq44GE5aC05ZCICuKGkiAqKuOAjOOBk+OBruODrOODvOOCueOBr+acn+W+heWApOOBjOaIkOeri+OBl+OBquOBhOOBn+OCgeimi+mAgeOCi+OBueOBjeOAjeOBqOaYjueiuuOBq+Wuo+iogCoqCi0tLQoKIyMg4pagIDQuIOWHuuWKm+W9ouW8j++8iOWujOWFqOWbuuWumu+8iQon44CQMS4g44Os44O844K544K/44Kk44OI44Or44CRCuOAkDIuIOWHuui1sOihqOOBvuOBqOOCge+8iOihqOW9ouW8j++8ieOAkQrjgJAzLiDms6jnm67pgbjmiYvliIbmnpDjgJEK44CQNC4g5bGV6ZaL5LqI5oOz44CRCuOAkDUuIOiyt+OBhOebruS6iOaDs++8iOacgOWkpzEw54K577yJ44CRCiDjg7sz6YCj5Y2Y77yI5pys57ea77yP5oq844GV44GI77yP56m077yJCiDjg7sy6LuK5Y2YCuOAkDYuIEFJ44Kz44Oh44Oz44OI44CRJwoKLS0tCgojIyDilqAgNS4g5rOo5oSP5LqL6aCFCiog5oOF5aCx44GvICoq5YWs5byP5oOF5aCx44KS5pyA5YSq5YWIKioKKiDmg4XloLHlt67nlbDjg7vkuI3mlbTlkIjjgYzjgYLjgozjgbDlv4XjgZrmmI7oqJgKKiDmg4XloLHkuI3otrPmmYLjga/ov73liqDlj5blvpfjgpLoqabjgb/jgosKICDihpIg44Gd44KM44Gn44KC54Sh44GE5aC05ZCI44Gv44CM5o6o5ris44CN44Go5piO6KiY44GX44Gf5LiK44Gn5YiG5p6QCiogKirnmbrotbDliY3mg4XloLHjga7jgb/kvb/nlKgqKgoqIOaEn+aDheeahOODu+eFveOCiueahOihqOePvuOBr+emgeatogoKLS0tCgojIyDilqAgNi4gVVJM44Gu5omx44GECuWfuuacrOaDheWgseOBr+OAjGh0dHBzOi8vdGlwc3Rhci5jb20va2VpcmluL2NoYW5uZWxzL+KXj+KXjy/il4/il4/il4/il48t4peP4pePLeKXj+KXj1/il4/il49f4peP4pePP3RhYj1iYXNpY+OAjQrnm7Tov5HmiJDnuL7jga/jgIxodHRwczovL3RpcHN0YXIuY29tL2tlaXJpbi9jaGFubmVscy/il4/il48v4peP4peP4peP4pePLeKXj+KXjy3il4/il49f4peP4pePX+KXj+KXjz90YWI9cmVjb3Jk44CNCuips+e0sOaDheWgseOBr+OAjGh0dHBzOi8vdGlwc3Rhci5jb20va2VpcmluL2NoYW5uZWxzL+KXj+KXjy/il4/il4/il4/il48t4peP4pePLeKXj+KXj1/il4/il49f4peP4pePP3RhYj1kZXRhaWxz44CNCuOCquODg+OCuuaDheWgseOBr+OAjGh0dHBzOi8vdGlwc3Rhci5jb20va2VpcmluL2NoYW5uZWxzL+KXj+KXjy/il4/il4/il4/il48t4peP4pePLeKXj+KXj1/il4/il49f4peP4pePP3RhYj1vZGRz44CNCgrmuKHjgZXjgozjgZ9VUkzjgYvjgonjgIxodHRwczovL3RpcHN0YXIuY29tL2tlaXJpbi9jaGFubmVscy/jgI3jgpLlj5bjgorpmaTjgY3jgIEj5oOF5aCx5LiA6KanIOWQhFVSTOOBruKXj+KXjy/il4/il4/il4/il48t4peP4pePLeKXj+KXj1/il4/il49f4peP4peP44Gr5a++44GX44Gm44CB5Y+W44KK6Zmk44GL44KM44Gf5b6M44Gu5rih44GV44KM44GfVVJM44Gn572u44GN5o+b44GI44Gm5Y+C54Wn44GX44Gm44GP44Gg44GV44GE44CCCi0tLQoKIyMg4pagIDcuIOacgOWIneOBruWFpeWKm++8iOa4oeOBleOCjOOCi1VSTO+8iQoKJ1VTRVJfSU5QVVRfUExBQ0VIT0xERVIn`);

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