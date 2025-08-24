(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const VER = new URLSearchParams(location.search).get('v') || '3006';

  // DOM
  const logo         = document.getElementById('logo');
  const screenLogo   = document.getElementById('logo-screen');
  const screenAnim   = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');

  const anim         = document.getElementById('anim');
  const lunoraBtn    = document.getElementById('lunora-btn');
  const lunoraVideo  = document.getElementById('lunora-video');

  const noira        = document.getElementById('noira');
  const zaryum       = document.getElementById('zaryum');

  // Источники видео с версией (кэш-бастер)
  anim.src        = './static/anim/bestportal.mp4?v=' + VER;
  lunoraVideo.src = './static/anim/lunora.mp4?v=' + VER;

  // Telegram init
  const tg = window.Telegram?.WebApp;
  try{
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor('#000000');
    }
  }catch(e){ /* ignore */ }

  // Избавляемся от "белого квадрата": показываем Lunora только когда
  // 1) видео anim готово к воспроизведению, и 2) сама картинка Lunora загружена
  let animReady   = false;
  let lunoraReady = lunoraBtn.complete; // если уже в кэше

  anim.addEventListener('canplay', () => { animReady = true; maybeShowLunora(); });
  lunoraBtn.addEventListener('load',   () => { lunoraReady = true; maybeShowLunora(); });

  function maybeShowLunora(){
    if(animReady && lunoraReady){
      lunoraBtn.style.display = 'block';
    }
  }

  // Переход 1 -> 2
  logo.addEventListener('click', ()=>{
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');
    anim.play().catch(()=>{});
    // страховка
    setTimeout(()=>{ if(lunoraBtn.style.display==='none') lunoraBtn.style.display='block'; }, 1000);
  });

  // Переход 2 -> 3
  lunoraBtn.addEventListener('click', ()=>{
    screenAnim.classList.remove('active');
    screenPortal.classList.add('active');
    lunoraVideo.play().catch(()=>{});
  });

  // Ссылки на YouTube
  const open = url => (tg && tg.openLink) ? tg.openLink(url) : window.open(url, '_blank');

  noira.addEventListener('click', ()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
  zaryum.addEventListener('click',()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));

})();