(function(){
  const VER = new URLSearchParams(location.search).get('v') || Date.now();
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const logo         = document.getElementById('logo');
  const screenLogo   = document.getElementById('logo-screen');
  const screenAnim   = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');

  const anim        = document.getElementById('anim');
  const lunoraBtn   = document.getElementById('lunora-btn');
  const lunoraVideo = document.getElementById('lunora-video');

  const noira  = document.getElementById('noira');
  const zaryum = document.getElementById('zaryum');

  // пути к медиа
  anim.src        = `./static/anim/bestportal.mp4?v=${VER}`;
  lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;

  // Telegram init (без ошибок, если не в мини‑аппе)
  try {
    const tg = window.Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor('#000'); }
  } catch {}

  // показываем видео, только когда оно готово — чтобы не было белого квадрата
  anim.addEventListener('canplay', () => { anim.classList.add('ready'); });
  lunoraVideo.addEventListener('canplay', () => { lunoraVideo.classList.add('ready'); });

  // 1 -> 2
  logo.addEventListener('click', () => {
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');

    // даём времени подгрузиться анимации; кнопку показываем чуть позже
    setTimeout(() => { anim.play().catch(()=>{}); }, 100);
    setTimeout(() => { lunoraBtn.classList.add('show'); }, 700);
  });

  // 2 -> 3
  lunoraBtn.addEventListener('click', () => {
    screenAnim.classList.remove('active');
    screenPortal.classList.add('active');
    setTimeout(() => { lunoraVideo.play().catch(()=>{}); }, 100);
  });

  // открытие ссылок YouTube
  const open = (url)=> {
    const tg = window.Telegram?.WebApp;
    if (tg?.openLink) tg.openLink(url); else window.open(url,'_blank');
  };
  noira.addEventListener('click',  () => open('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
  zaryum.addEventListener('click', () => open('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));

  // простая отладка
  [anim, lunoraVideo].forEach(v => v.addEventListener('error', ()=>dbg('Ошибка загрузки медиа')));
})();