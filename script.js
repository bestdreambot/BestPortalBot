(function(){
  const VER = new URLSearchParams(location.search).get('v') || Date.now();
  const parts = location.pathname.split('/').filter(Boolean);
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const tg = window.Telegram?.WebApp;
  try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); } }catch(_){}

  const paths = {
    logo: ROOT + 'static/img/BestPortal.jpg?v=' + VER,
    lunoraBtn: ROOT + 'static/img/lunora.png?v=' + VER,
    animMp4: ROOT + 'static/anim/bestportal.mp4?v=' + VER,
    lunoraMp4: ROOT + 'static/anim/lunora.mp4?v=' + VER
  };

  const you = {
    noira: 'https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW&si=I6Ef3U8TNP1OAXu8',
    zaryum:'https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd&si=3A4GtV00Cx2EPmFC'
  };

  // Elements
  const screenLogo   = document.getElementById('logo-screen');
  const screenAnim   = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal');
  const logo         = document.getElementById('logo');
  const anim         = document.getElementById('anim');
  const lunoraBtn    = document.getElementById('lunora-btn');
  const lunoraFull   = document.getElementById('lunora-full');
  const noiraLink    = document.getElementById('noira-link');
  const zaryumLink   = document.getElementById('zaryum-link');

  // preload images
  const imgPreload = src => new Promise(res=>{ const i = new Image(); i.onload=res; i.onerror=res; i.src=src; });

  // Setup logo
  logo.src = paths.logo;

  // Click logo -> show animation screen
  logo.addEventListener('click', async ()=>{
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');

    anim.src = paths.animMp4;
    anim.currentTime = 0;
    anim.muted = true; // для автоплея
    // показываем маленькую Lunora только после готовности кадров
    lunoraBtn.style.display = 'none';
    const onReady = () => {
      setTimeout(()=>{ lunoraBtn.style.display = 'block'; }, 600); // мягкая задержка
      anim.play().catch(()=>{});
      anim.removeEventListener('loadeddata', onReady);
      anim.removeEventListener('canplay', onReady);
    };
    anim.addEventListener('loadeddata', onReady);
    anim.addEventListener('canplay', onReady);
    // запасной прелоад превью
    imgPreload(paths.lunoraBtn);
    lunoraBtn.src = paths.lunoraBtn;
  });

  // Small Lunora click -> open Portal screen
  lunoraBtn.addEventListener('click', ()=>{
    screenAnim.classList.remove('active');
    screenPortal.classList.add('active');
    lunoraFull.src = paths.lunoraMp4;
    lunoraFull.play().catch(()=>{});
    // установить иконки ссылок
    noiraLink.style.backgroundImage = 'url(' + ROOT + 'static/img/Noira.jpg?v=' + VER + ')';
    zaryumLink.style.backgroundImage = 'url(' + ROOT + 'static/img/Zaryum.jpg?v=' + VER + ')';
  });

  // openLink helper (Telegram or browser)
  function openLink(url){
    if(tg && tg.openLink){ tg.openLink(url, {try_instant_view: false}); }
    else { window.open(url, '_blank', 'noopener'); }
  }

  noiraLink.addEventListener('click', ()=> openLink(you.noira));
  zaryumLink.addEventListener('click', ()=> openLink(you.zaryum));
})();