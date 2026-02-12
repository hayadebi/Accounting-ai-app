(function() {
    const adHTML = `
        <div id="adOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); justify-content: center; align-items: center; z-index: 1000;">
            <div id="adContainer" style="position: relative; width: 300px; height: 250px; text-align: center;">   
                <p id="countdown" style="color: white; font-size: 14px;">5 seconds until you can close the ad</p>
                <div id="adContent" width="100%" height="auto" style="width:100%; height:auto;">
                    <!--センター広告依頼無い場合のデフォルト-->
                    <!-- admax -->
                    <script src="https://adm.shinobi.jp/s/84c2657d08a586f94aa872f50f07d618"></script>
                    <!-- admax -->
                    
                    <!--センター広告依頼で有効化-->
                    <!-- <a class="center-ads-link" href="#" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" alt="広告リンク"><img class="center-ads-image" src="#" alt=
                    "広告画像" style="width:300px;height:auto;max-width:100%;" /></a> -->
                </div>
                <div id="closeButton" style="display: none; position: absolute; top: 25px; right: 30px;  margin-top:35px; cursor: pointer; background: red; color: white; width: 12px; height: 12px; text-align: center; border-radius: 50%; font-size: 9px; line-height: 12px;">            ✕        </div>
            </div>
        </div>

        <script>
            //メイン機能
            // 組み合わせリスト
            const centercombinations = [
                {
                    "imageUrl": "../../Ads/CenterImage/Sample.jpg",
                    "siteUrl": "#"
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
        </script>
    `;


    // ページ読み込み完了後に自動挿入
    document.addEventListener('DOMContentLoaded', function() {
        const containers = document.querySelectorAll('.centerad-widget');
        containers.forEach(function(container) {
            container.innerHTML = adHTML;
            
        });
    });

    let adDisplayed = false;
    let adClosed = false;
    var url = location.href;
    function isMobile() {    return window.innerWidth <= 600;}window.addEventListener("scroll", function() {    if (url.indexOf("cms.e.jimdo.com") === -1) {        if (adDisplayed || adClosed) return;        let scrollPosition = window.scrollY + window.innerHeight;        let pageHeight = document.body.scrollHeight;        if (scrollPosition >= pageHeight / 2) {            adDisplayed = true;            showAd();        }    }});
    function showAd() {    if (url.indexOf("cms.e.jimdo.com") === -1) {        let adContainer = document.getElementById("adContainer");        let closeButton = document.getElementById("closeButton");        if (isMobile()) {            adContainer.style.width = "90%";            closeButton.style.top = "25px";            closeButton.style.right = "30px";        } else {            adContainer.style.width = "300px";            closeButton.style.top = "25px";            closeButton.style.right = "30px";        }        document.getElementById("adOverlay").style.display = "flex";        disableScroll();        startCountdown();    }}function startCountdown() {    if (url.indexOf("cms.e.jimdo.com") === -1) {        let timeLeft = 5;        let countdownInterval = setInterval(() => {            document.getElementById("countdown").innerText = timeLeft + " seconds until you can close the ad";            if (timeLeft === 0) {                clearInterval(countdownInterval);                document.getElementById("closeButton").style.display = "block";                document.getElementById("countdown").innerText = "You can now close the ad";            }            timeLeft--;        }, 1000);        document.getElementById("closeButton").addEventListener("click", closeAd);    }}function closeAd() {    if (url.indexOf("cms.e.jimdo.com") === -1) {        document.getElementById("adOverlay").style.display = "none";        enableScroll();        adClosed = true;        let pageHeight = document.body.scrollHeight;        window.scrollTo({ top: pageHeight / 2, behavior: "smooth" });    }}function disableScroll() {    document.body.style.overflow = "hidden";    document.body.style.height = "100%";    document.documentElement.style.overflow = "hidden";    document.documentElement.style.height = "100%";}function enableScroll() {    document.body.style.overflow = "auto";    document.body.style.height = "auto";    document.documentElement.style.overflow = "auto";    document.documentElement.style.height = "auto";}

})();