// notice-bar メッセージローテーション
(function() {
const bar = document.getElementById('notice-bar');
if (!bar) return;
const spans = Array.from(bar.querySelectorAll('span'));
if (spans.length <= 1) return;

// 全spanのHTMLを配列に退避し、span要素を1つに集約
const msgs = spans.map(s => s.innerHTML);
spans.forEach((s, i) => { if (i > 0) s.remove(); });
const el = spans[0];
let idx = 0;

function showNext() {
    // アニメーション停止 → 内容差し替え → リフロー強制 → 再開
    el.style.animation = 'none';
    el.innerHTML = msgs[idx];
    idx = (idx + 1) % msgs.length;
    void el.offsetWidth; // リフロー強制（これがないとリセットされない）
    el.style.animation = '';
}

showNext();
setInterval(showNext, 12000); // CSSのアニメーション duration(25s)と合わせる
})();