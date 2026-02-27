(function() {
    // ========================================
    // ここでコンテンツを編集できます
    // ========================================
    const contents =     [
        {
            "title": "ビジュアルブログエディタ",
            "image": "https://pbs.twimg.com/media/HBODZTzaUAA9Z7e?format=jpg&amp;name=large",
            "link": "https://hayadebi.github.io/Accounting-ai-app/Tools/BlogEditor/blogeditor.html"
        },
        {
            "title": "ゲームジャム企画ジェネレーター",
            "image": "https://pbs.twimg.com/media/HBHfcGXa4AAuZQS?format=jpg&amp;name=large",
            "link": "https://hayadebi.github.io/Accounting-ai-app/Tools/GameJamGenerator/gamajamgenerator.html"
        },
        {
            "title": "YouTubeアラーム",
            "image": "https://pbs.twimg.com/media/HASPSB1aMAA3jp9?format=jpg&amp;name=large",
            "link": "https://hayadebi.github.io/Accounting-ai-app/Tools/YoutubeAuto/youtubeauto.html"
        },
        {
            "title": "ファクト探偵君",
            "image": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage7.jpg",
            "link": "https://hayadebi.github.io/Accounting-ai-app/Tools/FactChecker/factcheck.html"
        },
        {
            "title": "自動スクロールバナー広告作成ウェブツール",
            "image": "https://hayadebi.github.io/Accounting-ai-app/Images/autoscrollbanner.jpg",
            "link": "https://hayadebi.github.io/Accounting-ai-app/Tools/AutoScrollBanner/autoscrollbanner.html"
        },
        {
            "title": "InfoGuild",
            "image": "https://hayadebi.github.io/Accounting-ai-app/Ads/CenterImage/AdsImage2.jpg",
            "link": "https://hayadebi.github.io/Accounting-ai-app/Tools/InfoGuild/infoguild.html"
        }
    ];
    // ========================================

    let currentIndex = 0;
    let autoScrollTimer;
    const autoScrollInterval = 8000; // 8秒ごとに自動スクロール

    const contentWrapper = document.getElementById('contentWrapper');
    const indicatorsDiv = document.getElementById('indicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // レスポンシブ判定
    function isMobile() {
        return window.innerWidth < 768;
    }

    // 1ページあたりの表示数
    function getItemsPerPage() {
        return isMobile() ? 1 : 3;
    }

    // 総ページ数
    function getTotalPages() {
        return Math.ceil(contents.length / getItemsPerPage());
    }

    // コンテンツHTML生成
    function createContentHTML(content, index) {
        const itemsPerPage = getItemsPerPage();
        const width = isMobile() ? '100%' : 'calc(33.333% - 10px)';
        
        return `
        <div style="flex: 0 0 ${width}; min-width: ${width}; padding: 10px; box-sizing: border-box;">
            <a href="${content.link}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
            <div style=" background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; height: 100%;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)';">
                <div style="position: relative; padding-top: 133.33%; overflow: hidden;  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <img src="${content.image}" alt="${content.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';">
                </div>
                <div style="padding: 12px;">
                <div style="font-size: 14px; font-weight: bold; line-height: 1.4; color: #ffffff; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.8em;">${content.title}</div>
                </div>
            </div>
            </a>
        </div>
        `;
    }

    // コンテンツ描画
    function renderContents() {
        contentWrapper.innerHTML = contents.map((content, index) => createContentHTML(content, index)).join('');
    }

    // インジケーター描画
    function renderIndicators() {
        const totalPages = getTotalPages();
        indicatorsDiv.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${i === currentIndex ? '#007bff' : '#ccc'};
            cursor: pointer;
            transition: background 0.3s;
        `;
        dot.addEventListener('click', () => goToPage(i));
        indicatorsDiv.appendChild(dot);
        }
    }

    // ページ移動
    function goToPage(index) {
        const totalPages = getTotalPages();
        currentIndex = (index + totalPages) % totalPages;
        
        const itemsPerPage = getItemsPerPage();
        const wrapperWidth = contentWrapper.offsetWidth;
        const offset = currentIndex * wrapperWidth;
        contentWrapper.style.transform = `translateX(-${offset}px)`;
        
        renderIndicators();
        resetAutoScroll();
    }

    // 次へ
    function nextPage() {
        goToPage(currentIndex + 1);
    }

    // 前へ
    function prevPage() {
        goToPage(currentIndex - 1);
    }

    // 自動スクロールリセット
    function resetAutoScroll() {
        clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(nextPage, autoScrollInterval);
    }

    // イベントリスナー
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);

    // リサイズ対応
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
        currentIndex = 0;
        renderContents();
        goToPage(0);
        }, 250);
    });

    // 初期化
    renderContents();
    renderIndicators();
    goToPage(0);

    // マウスオーバーで自動スクロール一時停止
    contentWrapper.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoScrollTimer);
    });

    contentWrapper.parentElement.addEventListener('mouseleave', () => {
        resetAutoScroll();
    });
})();