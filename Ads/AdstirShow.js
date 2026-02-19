(function () {
  'use strict';

  var SCROLL_THRESHOLD  = 0.5;  
  var THROTTLE_INTERVAL = 200;   
  var LOAD_DELAY        = 1000;  
      
  var ADSTIR_CONFIG = {
    ver    : "4.0",
    type   : "interstitial",
    app_id : "MEDIA-245072bc",  
    ad_spot: 1                  
  };
  var ADSTIR_SCRIPT_URL = "https://js.ad-stir.com/js/adstir.js";

  var adShown      = false;  
  var isThrottling = false;  
  var isReady      = false;  

  function getScrollTop() {
    return (
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
    );
  }

  function getDocumentHeight() {
    var b = document.body;
    var h = document.documentElement;
    return Math.max(
      b.scrollHeight, b.offsetHeight,
      h.clientHeight, h.scrollHeight, h.offsetHeight
    );
  }

  function getViewportHeight() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }

  function getScrollRatio() {
    var scrollTop       = getScrollTop();
    var scrollableHeight = getDocumentHeight() - getViewportHeight();
    if (scrollableHeight <= 0) { return 0; }
    return scrollTop / scrollableHeight;
  }

  function injectAdstirTag() {
    window.adstir_vars = {
      ver    : ADSTIR_CONFIG.ver,
      type   : ADSTIR_CONFIG.type,
      app_id : ADSTIR_CONFIG.app_id,
      ad_spot: ADSTIR_CONFIG.ad_spot
    };

    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = ADSTIR_SCRIPT_URL;

    script.onerror = function () {
      console.warn('[adstir] スクリプトの読み込みに失敗しました。URL・ネットワーク状態を確認してください。');
     
    };

    document.body.appendChild(script);
  }

  var listenerOptions = (function () {
    var supported = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () { supported = true; return true; }
      });
      window.addEventListener('__test__', null, opts);
      window.removeEventListener('__test__', null, opts);
    } catch (e) {}
    return supported ? { passive: true } : false;
  })();

  function onScroll() {
    if (!isReady || adShown) { return; }

    if (isThrottling) { return; }
    isThrottling = true;
    setTimeout(function () { isThrottling = false; }, THROTTLE_INTERVAL);

    var ratio = getScrollRatio();
    updateDebugUI(ratio); 

    // if (ratio >= SCROLL_THRESHOLD) {
      
    //}
  }

  function addScrollListener() {
    window.addEventListener('scroll', onScroll, listenerOptions);
  }

  function removeScrollListener() {
    window.removeEventListener('scroll', onScroll, listenerOptions);
  }

  function init() {
    addScrollListener();

    window.addEventListener('load', function () {
      setTimeout(function () {
        isReady = true;
        updateDebugUI(getScrollRatio());
      }, LOAD_DELAY);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();