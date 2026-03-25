(function() {
    const adHTML = `
        <div id="adOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); justify-content: center; align-items: center; z-index: 1000;">
            <div id="adContainer" style="position: relative; width: 300px; height: 250px; text-align: center;">   
                <p id="countdown" style="color: white; font-size: 14px;">5 seconds until you can close the ad</p>
                <div id="adContent" width="100%" height="auto" style="width:100%; height:auto;">\
                    <a class="editorcenter-ads-link" href="#" rel="nofollow" alt="ad link"><img class="editorcenter-ads-image" src="#" alt=
                    "ad image" style="width:300px;height:auto;max-width:100%;" /></a><img class="editorcenter-ads-check" border="0" width="1" height="1" src="#">
                </div>
                <div id="closeButton" style="display: none; position: absolute; top: 25px; right: 30px;  margin-top:35px; cursor: pointer; background: red; color: white; width: 12px; height: 12px; text-align: center; border-radius: 50%; font-size: 9px; line-height: 12px;">            ✕        </div>
            </div>
        </div>
    `;
    document.addEventListener('DOMContentLoaded', function() {
        const containers = document.querySelectorAll('.editorproof-widget');
        containers.forEach(function(container) {
            container.innerHTML = adHTML;
            
        });
    });
    const centercombinations = [
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage1.jpg",
            "siteUrl": "https://note.com/hayadebi_ai/n/n9f71a3b80529",
            "checkUrl": "#"
        },
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage2.jpg",
            "siteUrl": "https://hayadebi.github.io/Accounting-ai-app/adnextcenter.html?q=hayadebi.github.io%2FAccounting-ai-app%2FTools%2FInfoGuild%2Finfoguild.html",
            "checkUrl": "#"
        },
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage6.jpg",
            "siteUrl": "https://hayadebi.github.io/Accounting-ai-app/Tools/BlogEditor/blogeditor.html",
            "checkUrl": "#"
        },
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage10.jpg",
            "siteUrl": "https://note.com/hayadebi_ai/n/n9679ee17ac93",
            "checkUrl": "#"
        },
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage11.jpg",
            "siteUrl": "https://note.com/hayadebi_ai/n/n9b28923fbcd6",
            "checkUrl": "#"
        },
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage12.jpg",
            "siteUrl": "https://freecash.com/r/devilnessie",
            "checkUrl": "#"
        },
        {
            "imageUrl": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage13.jpg",
            "siteUrl": "https://timebucks.com/?refID=223743191",
            "checkUrl": "#"
        }
    ];
    const centerselected = centercombinations[Math.floor(Math.random() * centercombinations.length)];
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceCombination);
    } else {
        replaceCombination();
    }
    function replaceCombination() {
        const centerimages = document.querySelectorAll('.editorcenter-ads-image');
        centerimages.forEach(function(img) {
        img.src = centerselected.imageUrl;
        });
        const centerchecks = document.querySelectorAll('.editorcenter-ads-check');
        centerchecks.forEach(function(img) {
        img.src = centerselected.checkUrl;
        });
        const centerlinks = document.querySelectorAll('.editorcenter-ads-link');
        centerlinks.forEach(function(link) {
        link.href = centerselected.siteUrl;
        });
    }
    let adDisplayed = false;
    let adClosed = false;
    var url = location.href;
    function isMobile() {
    return window.innerWidth <= 600;
    }
    window.addEventListener("scroll", function() {
    if (url.indexOf("cms.e.jimdo.com") === -1) {
        if (adDisplayed || adClosed) return;
        let scrollPosition = window.scrollY + window.innerHeight;
        let pageHeight = document.body.scrollHeight;
        if (scrollPosition >= pageHeight / 2) {
            adDisplayed = true;
            showAd();
        }
    }
    });
    function showAd() {
    if (url.indexOf("cms.e.jimdo.com") === -1 && Math.random()<0.05) {
        let adContainer = document.getElementById("adContainer");
        let closeButton = document.getElementById("closeButton");
        if (isMobile()) {
            adContainer.style.width = "90%";
            closeButton.style.top = "25px";
            closeButton.style.right = "30px";
        } else {
            adContainer.style.width = "300px";
            closeButton.style.top = "25px";
            closeButton.style.right = "30px";
        }
        document.getElementById("adOverlay").style.display = "flex";
        disableScroll();
        startCountdown();
    }
    }
    function startCountdown() {
    if (url.indexOf("cms.e.jimdo.com") === -1) {
        let timeLeft = 5;
        let countdownInterval = setInterval(() => {
        document.getElementById("countdown").innerText = timeLeft + " seconds until you can close the ad";
        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            document.getElementById("closeButton").style.display = "block";
            document.getElementById("countdown").innerText = "You can now close the ad";
        }
        timeLeft--;
        }, 1000);
        document.getElementById("closeButton").addEventListener("click", closeAd);
    }
    }
    function closeAd() {
    if (url.indexOf("cms.e.jimdo.com") === -1) {
        document.getElementById("adOverlay").style.display = "none";
        enableScroll();
        adClosed = true;
        let pageHeight = document.body.scrollHeight;
        window.scrollTo({
        top: pageHeight / 2,
        behavior: "smooth"
        });
    }
    }
    function disableScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    }
    function enableScroll() {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    }
})();