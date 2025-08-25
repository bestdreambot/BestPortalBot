(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('logo-screen');
  const screenAnim = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');

  const anim = document.getElementById('anim');
  const lunoraBtn = document.getElementById('lunora-btn');
  const lunoraVideo = document.getElementById('lunora-video');

  const noira = document.getElementById('noira');
  const zaryum = document.getElementById('zaryum');

  const VER = new URLSearchParams(location.search).get('v') || Date.now();

  // Источники медиа
  anim.src = './static/anim/bestportal.mp4?v=' + VER;
  lunoraVideo.src = './static/anim/lunora.mp4?v=' + VER;

  // Telegram init
  const tg = window.Telegram && window.Telegram.WebApp;
  try{
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor && tg.setHeaderColor('#000000');
    }
  }catch(e){}

  // Показ кнопки Lunora стабильно — когда видео готово ИЛИ через таймаут
  let shown = false;
  const showLunora = () => {
    if (shown) return;
    shown = true;
    lunoraBtn.style.opacity = '1';
    lunoraBtn.style.pointerEvents = 'auto';
  };
  anim.addEventListener('canplay', showLunora);
  setTimeout(showLunora, 800);

  // Экран1 -> Экран2
  logo.addEventListener('click', ()=>{
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');
    anim.play().catch(()=>{});
  });

  // Экран2 -> Экран3
  lunoraBtn.addEventListener('click', ()=>{
    screenAnim.classList.remove('active');
    screenPortal.classList.add('active');
    lunoraVideo.play().catch(()=>{});
  });

  // Экран3 -> назад на Экран2 (тап по Lunora)
  lunoraVideo.addEventListener('click', ()=>{
    lunoraVideo.pause();
    screenPortal.classList.remove('active');
    screenAnim.classList.add('active');
  });

  // Открытие ютуб-ссылок
  const open = url => {
    if (tg && tg.openLink) tg.openLink(url);
    else window.open(url, '_blank', 'noopener,noreferrer');
  };
  noira.addEventListener('click', ()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
  zaryum.addEventListener('click', ()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));

  dbg('loaded');
})();