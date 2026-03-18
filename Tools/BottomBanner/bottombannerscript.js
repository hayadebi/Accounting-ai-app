function generateAffiliateCode() {
    const affiliateUrl = document.getElementById('affiliateUrl').value;
    const productName = document.getElementById('productName').value;
    const productImageUrl = document.getElementById('productImageUrl').value;
    const productFreeText = document.getElementById('productFreeText').value;
 
    if (!validateUrl(affiliateUrl) || !validateUrl(productImageUrl)) {
        alert('無効なURLです。');
        return;
    }
 
    const safeProductName = escapeHtml(productName);
    const safeProductFreeText = escapeHtml(productFreeText);
 
    const template = `
<div class="affiliate-banner" style="border: 1px solid #5592b7; padding: 10px; display: flex; flex-wrap: wrap; align-items: flex-start; max-width: 100%; box-sizing: border-box; position: fixed; bottom: 0px; left: 0; right: 0; transition: bottom 0.5s ease; background: rgba(255, 255, 255, 0.9);">
    <div class="affiliate-image-container" style="flex: 0 0 120px; margin-right: 15px; max-width: 100%;">
        <a href="${escapeHtml(affiliateUrl)}" target="_top">
            <img class="affiliate-image" src="${escapeHtml(productImageUrl)}" alt="アソシエイト画像" style="width:120px; max-width: 100%; height: auto; display: block;">
        </a>
    </div>
    <div style="flex: 1;">
        <p class="affiliate-title">
            <a href="${escapeHtml(affiliateUrl)}" class="affititle" style="color: #2a7186; text-decoration: none;" target="_top">${safeProductName}</a>
        </p>
        <p class="affiliate-description" style="color: #666; margin: 0px 0;">${safeProductFreeText}</p>
        
    </div>
</div>`;
 
    document.getElementById('outputText').value = template;
    adDisplayed = true;
    showAd();
}
 
function copyToClipboard() {
    const text = document.getElementById('outputText').value;
    navigator.clipboard.writeText(text).then(() => {
        alert('コードがコピーされました！');
    });
}
 
function validateUrl(url) {
    const urlPattern = /^(https?:\/\/)?([a-z0-9]+[.-])*[a-z0-9]+\.[a-z]{2,}(:\d{1,5})?(\/.*)?$/i;
    return urlPattern.test(url);
}
 
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
    
function copyToClipboard2() {
    var copyText = document.getElementById("outputText2");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // モバイル対応
    document.execCommand("copy");
    alert("内容をコピーしました！");
}