  // 組み合わせリスト
  const combinations = [
  {
    "imageUrl": "../../Ads/BlogImage/AdsImage1.jpg",
    "siteUrl": "https://note.com/hayadebi_ai/n/n9f71a3b80529"
  },
  {
    "imageUrl": "../../Ads/BlogImage/AdsImage2.jpg",
    "siteUrl": "https://bitflyer.com/invitation?id=hhhv5jly&lang=ja-JP"
  },
  {
    "imageUrl": "../../Ads/BlogImage/AdsImage3.jpg",
    "siteUrl": "https://dlaf.jp/home/dlaf/=/aid/githubhayadebitools/url/https%3A%2F%2Fwww.dlsite.com%2Fhome%2Franking%2Fweek%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dtext"
  },
  {
    "imageUrl": "../../Ads/BlogImage/AdsImage4.jpg",
    "siteUrl": "https://cointiply.com/r/KrAZKx"
  }
];
  
  // ランダムに1つ選択
  const selected = combinations[Math.floor(Math.random() * combinations.length)];
  
  // DOMが読み込まれた後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceCombination);
  } else {
    replaceCombination();
  }
  
  function replaceCombination() {
    // 画像の置き換え
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