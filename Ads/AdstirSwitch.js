  var PC_AD_HTML = '<div style="width:100%;max-width:100%;height:auto;overflow-wrap:break-word;"><center><script type="text/javascript">var adstir_vars={ver:"4.0",app_id:"MEDIA-8d0588f8",ad_spot:1,center:false};<\/script><script type="text/javascript" src="https://js.ad-stir.com/js/adstir.js"><\/script><\/center><\/div>';

  var SP_AD_HTML = '<div style="width:100%;max-width:100%;height:auto;overflow-wrap:break-word;"><script type="text/javascript">var adstir_vars={ver:"4.0",type:"native",app_id:"MEDIA-8d0588f8",ad_spot:3};<\/script><script type="text/javascript" src="https://js.ad-stir.com/js/adstir_native.js"><\/script><\/div>';

  function isPC() {
    return !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth >= 768;
  }

  function injectAds() {
    var adCode = isPC() ? PC_AD_HTML : SP_AD_HTML;
    var areas = document.querySelectorAll('div.adstir-area');
    for (var i = 0; i < areas.length; i++) {
      var range = document.createRange();
      areas[i].appendChild(range.createContextualFragment(adCode));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAds);
  } else {
    injectAds();
  }