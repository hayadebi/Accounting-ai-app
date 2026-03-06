var BREAKPOINT = 768;

function showAd() {
  var wrap = document.querySelector('.adstir-responsive-wrap');
  if (!wrap) return;

  var pcAd = wrap.querySelector('.adstir-pc');
  var spAd = wrap.querySelector('.adstir-sp');

  if (window.innerWidth >= BREAKPOINT) {
    if (pcAd) pcAd.style.display = 'block';
    if (spAd) spAd.style.display = 'none';
  } else {
    if (pcAd) pcAd.style.display = 'none';
    if (spAd) spAd.style.display = 'block';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showAd);
} else {
  showAd();
}

var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(showAd, 200);
});