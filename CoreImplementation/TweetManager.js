/**
 * ツイート用のURLリンクを生成します。
 * @param {string} message - ツイート本文
 * @param {string} url - 共有するURL（オプション）
 * @param {string} hashtag - ハッシュタグ（カンマ区切りで複数指定可能）
 * @returns {string} ツイート用のURL
 */
function generateTweetURL(message, url = "", hashtag = "") {
    let fullText = message;
    var localurl = location.href;
    if (localurl && localurl.trim() !== "") {
        fullText += "\n" + localurl;
    }
    
    if (hashtag && hashtag.trim() !== "") {
        const tags = hashtag.split(',');
        tags.forEach(tag => {
            fullText += "\n#" + tag.trim();
        });
    }
    
    const encodedText = encodeURIComponent(fullText);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
}

// 使用例
// const tweetUrl = generateTweetURL(
//     "素晴らしいゲームをプレイしました！",
//     "https://example.com/game",
//     "ゲーム,Unity"
// );
// console.log(tweetUrl);

// ブラウザで開く場合
// window.open(tweetUrl, '_blank');