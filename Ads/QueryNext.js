(function( ) {
    const QUERY_PREFIX = "?q=";
    const currentUrl = window.location.href;
    
    // 1. ?q= の位置を特定
    const qIndex = currentUrl.indexOf(QUERY_PREFIX);

    if (qIndex !== -1) {
        // ?q= の直後からURLの最後までをクエリ文字列として取得
        const queryString = currentUrl.substring(qIndex + QUERY_PREFIX.length);

        // 2. クエリ文字列に特定のマーカーが含まれているか確認
        const encodedUrl = queryString;
        
        try {
            // 3. クエリ文字列をデコードして新しいURLの候補とする
            let newUrl = decodeURIComponent(encodedUrl);
            
            // 5. デコード後のURLにプロトコルがない場合、'https://'を付与
            // 'http://' または 'https://' で始まっているかチェック
            if (!newUrl.startsWith('http://' ) && !newUrl.startsWith('https://' )) {
                // プロトコルがない場合は 'https://' を追加
                newUrl = 'https://' + newUrl;
            }
            
            // 4. 0.1秒（100ミリ秒 ）の遅延後にリダイレクトを実行
            setTimeout(() => {
                // location.replace() で履歴を残さずにページ遷移
                location.replace(newUrl);
            }, 100);
            
        } catch (e) {
            // デコードエラーが発生した場合は処理を中断し、コンソールにエラーを出力
            console.error("URLデコードエラーが発生しました:", e);
        }
    }
})();