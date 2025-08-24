// script.js — логика переходов и открытие YouTube. 🔑
(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m||''; };
  const tg = window.Telegram?.WebApp;
  const V = new URLSearchParams(location.search).get('v') || Date.now();

  // Экраны
  const s1 = document.getElementById('screen-1');
  const s2 = document.getElementById('screen-2');
  const s3 = document.getElementById('screen-3');

  // Шаг 1
  const logo = document.getElementById('logo');
  logo.src = `static/img/BestPortal.jpg?v=${V}`;
  logo.addEventListener('click', ()=>{
    s1.classList.remove('active');
    s2.classList.add('active');
    // автозапуск видео
    const vid = document.getElementById('introVideo');
    vid.src = `static/anim/bestportal.mp4?v=${V}`;
    vid.play().catch(()=>{ /* iOS может задержать; игнор */ });
  });

  // Шаг 2 → кнопка Lunora
  const btnLunora = document.getElementById('btn-lunora');
  btnLunora.src = `static/img/lunora.png?v=${V}`;
  btnLunora.addEventListener('click', ()=>{
    s2.classList.remove('active');
    s3.classList.add('active');
  });

  // Шаг 3 → две ссылки
  const NOIRA_URL  = 'https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW&si=5OxPee21XJVrKMxX';
  const ZARYUM_URL = 'https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd&si=aIZEvFPnb5yR_we0';

  const btnNoira  = document.getElementById('btn-noira');
  const btnZaryum = document.getElementById('btn-zaryum');
  btnNoira.style.backgroundImage  = `url("static/img/Noira.jpg?v=${V}")`;
  btnZaryum.style.backgroundImage = `url("static/img/Zaryum.jpg?v=${V}")`;

  const open = url => (tg && tg.openLink) ? tg.openLink(url) : window.open(url,'_blank','noopener,noreferrer');
  btnNoira.addEventListener('click',  ()=>open(NOIRA_URL));
  btnZaryum.addEventListener('click', ()=>open(ZARYUM_URL));

  // Telegram UI
  try{
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor('#000000');
    }
  }catch(e){ dbg('tg init err'); }
})();
