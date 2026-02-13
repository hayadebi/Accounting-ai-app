(function() {
    const adHTML = `
        <div id="adOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); justify-content: center; align-items: center; z-index: 1000;">
            <div id="adContainer" style="position: relative; width: 300px; height: 250px; text-align: center;">   
                <p id="countdown" style="color: white; font-size: 14px;">5 seconds until you can close the ad</p>
                <div id="adContent" width="100%" height="auto" style="width:100%; height:auto;">
                    <!--センター広告依頼無い場合のデフォルト-->
                    <!-- admax -->
                    <!-- <script src="https://adm.shinobi.jp/s/84c2657d08a586f94aa872f50f07d618" rel="preload"></script> -->
                    <!-- admax -->
                    
                    <!--センター広告依頼で有効化-->
                    <a class="center-ads-link" href="#" target="_blank" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" alt="広告リンク"><img class="center-ads-image" src="#" alt=
                    "広告画像" style="width:300px;height:auto;max-width:100%;" /></a>
                </div>
                <div id="closeButton" style="display: none; position: absolute; top: 25px; right: 30px;  margin-top:35px; cursor: pointer; background: red; color: white; width: 12px; height: 12px; text-align: center; border-radius: 50%; font-size: 9px; line-height: 12px;">            ✕        </div>
            </div>
        </div>

    `;


    // ページ読み込み完了後に自動挿入
    document.addEventListener('DOMContentLoaded', function() {
        const containers = document.querySelectorAll('.centerad-widget');
        containers.forEach(function(container) {
            container.innerHTML = adHTML;

            //メイン機能
            // 組み合わせリスト
            const centercombinations = [
                {
                    "imageUrl": "../../Ads/CenterImage/AdsImage1.jpg",
                    "siteUrl": "https://note.com/hayadebi_ai/n/n9f71a3b80529"
                },
                {
                    "imageUrl": "../../Ads/CenterImage/AdsImage2.jpg",
                    "siteUrl": "https://hayadebi.github.io/Accounting-ai-app/Tools/DevilGame/devilgame.html"
                },
                {
                    "imageUrl": "../../Ads/CenterImage/AdsImage3.jpg",
                    "siteUrl": "https://cointiply.com/r/KrAZKx"
                },
                {
                    "imageUrl": "../../Ads/CenterImage/AdsImage4.gif",
                    "siteUrl": "https://dlaf.jp/home/dlaf/=/aid/githubhayadebitools/url/https%3A%2F%2Fwww.dlsite.com%2Fhome%2Franking%2Fweek%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dtext"
                }
            ];
            // ランダムに1つ選択
            const centerselected = centercombinations[Math.floor(Math.random() * centercombinations.length)];
            // DOMが読み込まれた後に実行
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', replaceCombination);
            } else {
                replaceCombination();
            }
            function replaceCombination() {
                // 画像の置き換え
                const centerimages = document.querySelectorAll('.center-ads-image');
                centerimages.forEach(function(img) {
                img.src = centerselected.imageUrl;
                });
                // リンクの置き換え
                const centerlinks = document.querySelectorAll('.center-ads-link');
                centerlinks.forEach(function(link) {
                link.href = centerselected.siteUrl;
                });
            }
        });
    });

})();