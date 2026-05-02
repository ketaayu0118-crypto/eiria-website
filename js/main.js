// Google Analytics
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TC70BFG3ND';
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TC70BFG3ND');
})();
// ============================================
// 株式会社EIRIA ウェブサイト 共通スクリプト
// ============================================

// モバイルメニュー開閉
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', function() {
    navList.classList.toggle('open');
  });
  
  // メニューリンクをクリックしたら閉じる
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
    });
  });
}

// スクロール時のフェードインアニメーション
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => observer.observe(el));
}

// スクロール時のヘッダーシャドウ
const header = document.querySelector('.site-header');
let lastScroll = 0;

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.04)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}
