(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  // cache-buster
  const VER = new URLSearchParams(location.search).get('v') || Date.now();

  // безопасно определить корневую папку проекта на GitHub Pages
  const parts = location.pathname.split('/').filter(Boolean);
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';

  // Пути к ресурсам (из твоих папок static/img и static/anim)
  const IMG = {
    logo: ROOT + 'static/img/BestPortal.jpg?v=' + VER,
    lunoraSmall: ROOT + 'static/img/lunora.png?v=' + VER
  };
  const VID = {
    bestportal: ROOT + 'static/anim/bestportal.mp4?v=' + VER,
    lunora: ROOT + 'static/anim/lunora.mp4?v=' + VER
  };

  // YouTube
  const LINKS = {
    noira: 'https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW&si=I6Ef3U8TNP1OAXu8',
    zaryum:'https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd&si=3A4GtV00Cx2EPmFC'
  };

  // DOM
  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('logo-screen');
  const screenAnim = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal');
  const anim = document.getElementById('anim');
  const lunoraSmall = document.getElementById('lunoraSmall');
  const lunoraBig = document.getElementById('lunoraBig');
  const noiraLink = document.getElementById('noiraLink');
  const zaryumLink = document.getElementById('zaryumLink');
  const tg = window.Telegram?.WebApp;

  // Telegram init
  try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000000'); tg.setHeaderColor('#000000'); } }catch(e){}

  // Загружаем картинки без "белого квадрата": покажем, только когда onload
  function loadImg(el, url){
    const i = new Image();
    i.onload = () => { el.src = url; el.classList.add('show'); };
    i.onerror = () => { /* ignore */ };
    i.src = url;
  }

  // Экран 1: загрузка логотипа
  loadImg(logo, IMG.logo);

  // Клик по логотипу -> Экран 2
  logo.addEventListener('click', ()=>{
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');

    // Запускаем анимацию
    anim.src = VID.bestportal;
    anim.play().catch(()=>{});

    // Дадим видео стартануть, а затем (через 600мс) плавно покажем Lunora
    setTimeout(()=>{
      loadImg(lunoraSmall, IMG.lunoraSmall);
    }, 600);
  });

  // Клик по маленькой Lunora -> Экран 3 (большой видеоролик)
  lunoraSmall.addEventListener('click', ()=>{
    screenAnim.classList.remove('active');
    screenPortal.classList.add('active');
    lunoraBig.src = VID.lunora;
    lunoraBig.play().catch(()=>{});
  });

  // Кнопки Noira / Zaryum
  function openYT(url){
    if(tg && typeof tg.openLink === 'function'){ tg.openLink(url); }
    else { window.open(url, '_blank', 'noopener'); }
  }
  noiraLink.addEventListener('click', ()=>openYT(LINKS.noira));
  zaryumLink.addEventListener('click', ()=>openYT(LINKS.zaryum));
})();