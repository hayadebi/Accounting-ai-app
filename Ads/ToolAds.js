  // 組み合わせリスト
  const combinations = [
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage1.jpg",
    "siteUrl": "https://note.com/hayadebi_ai/n/n9f71a3b80529"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage2.jpg",
    "siteUrl": "https://bitflyer.com/invitation?id=hhhv5jly&lang=ja-JP"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage4.jpg",
    "siteUrl": "https://cointiply.com/r/KrAZKx"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage5.jpg",
    "siteUrl": "https://note.com/hayadebi_ai/n/nd7234ba28c72"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage6.jpg",
    "siteUrl": "https://hayadebi.github.io/Accounting-ai-app/Tools/BlogEditor/blogeditor.html"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage7.png",
    "siteUrl": "https://hayadebi.github.io/Accounting-ai-app/Tools/InfoGuild/infoguild.html"
  },
  {
    "imageUrl": "https://www.dlsite.com/img/male/dojin/bn_pc_468_60_dojin_01.gif",
    "siteUrl": "https://dlaf.jp/home/dlaf/=/aid/githubhayadebitools/url/https%3A%2F%2Fwww.dlsite.com%2Fhome%2Franking%2Fweek%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dbn_pc_468_60_dojin_01.gif"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage8.jpg",
    "siteUrl": "https://freecash.com/r/devilnessie"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage9.jpg",
    "siteUrl": "https://btcc.com/invite/Uf2pqnp"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage10.jpg",
    "siteUrl": "https://note.com/hayadebi_ai/n/n9679ee17ac93"
  },
  {
    "imageUrl": "../../Ads/ToolImage/AdsImage12.jpg",
    "siteUrl": "https://note.com/hayadebi_ai/n/n9b28923fbcd6"
  }
];
  
  // ランダムに1つ選択
  let selected = combinations[Math.floor(Math.random() * combinations.length)];
  
  // DOMが読み込まれた後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceCombination);
  } else {
    replaceCombination();
  }
  
  function replaceCombination() {
    // 画像の置き換え
    selected = combinations[Math.floor(Math.random() * combinations.length)];
    const images = document.querySelectorAll('.random-ads-image');
    images.forEach(function(img) {
      img.src = selected.imageUrl;
    });
    
    // リンクの置き換え
    const links = document.querySelectorAll('.random-ads-link');
    links.forEach(function(link) {
      link.href = selected.siteUrl;
    });
  }