(function(){
  const dbg = (m)=>{ const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  // Определяем корень проекта (GitHub Pages: /BestPortalBot/)
  const parts = location.pathname.split('/').filter(Boolean);
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';

  const VER = new URLSearchParams(location.search).get('v') || Date.now();

  const el = {
    logo: document.getElementById('logo'),
    screenLogo: document.getElementById('logo-screen'),
    screenAnim: document.getElementById('anim-screen'),
    screenPortal: document.getElementById('portal-screen'),
    anim: document.getElementById('anim'),
    lunoraBtn: document.getElementById('lunora-btn'),
    lunoraVideo: document.getElementById('lunora-video'),
    noira: document.getElementById('noira'),
    zaryum: document.getElementById('zaryum'),
  };

  // Подставляем src для всех медиа
  el.logo.src       = ROOT + 'static/img/BestPortal.jpg?v=' + VER;
  el.lunoraBtn.src  = ROOT + 'static/img/lunora.png?v=' + VER;
  el.noira.src      = ROOT + 'static/img/Noira.jpg?v=' + VER;
  el.zaryum.src     = ROOT + 'static/img/Zaryum.jpg?v=' + VER;
  el.anim.src       = ROOT + 'static/anim/bestportal.mp4?v=' + VER;
  el.lunoraVideo.src= ROOT + 'static/anim/lunora.mp4?v=' + VER;

  const tg = window.Telegram?.WebApp;
  try{
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor?.('#000000');
    }
  }catch(e){}

  // Лого -> Экран 2
  el.logo.addEventListener('click', ()=>{
    el.screenLogo.classList.remove('active');
    el.screenAnim.classList.add('active');

    // Помогаем autoplay на iOS/Android (muted=true)
    el.anim.muted = true;
    const playAnim = ()=> el.anim.play().catch(()=>{});
    if(el.anim.readyState >= 2) playAnim(); else el.anim.addEventListener('loadeddata', playAnim, {once:true});

    // Показать кнопку Lunora после готовности видео или таймаута (устраняем "белый квадрат")
    const showBtn = ()=>{ el.lunoraBtn.style.display = 'block'; };
    let shown = false;
    el.anim.addEventListener('loadedmetadata', ()=>{ if(!shown){ showBtn(); shown=true; } }, {once:true});
    setTimeout(()=>{ if(!shown){ showBtn(); shown=true; } }, 800);
  });

  // Экран 2 -> Экран 3
  el.lunoraBtn.addEventListener('click', ()=>{
    el.screenAnim.classList.remove('active');
    el.screenPortal.classList.add('active');
    el.lunoraVideo.muted = true;
    const playL = ()=> el.lunoraVideo.play().catch(()=>{});
    if(el.lunoraVideo.readyState >= 2) playL(); else el.lunoraVideo.addEventListener('loadeddata', playL, {once:true});
  });

  // Нажатие на Lunora (Экран 3) — возврат на Экран 2
  el.lunoraVideo.addEventListener('click', ()=>{
    el.lunoraVideo.pause();
    el.screenPortal.classList.remove('active');
    el.screenAnim.classList.add('active');
  });

  // Ссылки YouTube
  const open = (url)=>{
    if(tg && tg.openLink) tg.openLink(url);
    else window.open(url, '_blank');
  };
  el.noira.addEventListener('click', ()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
  el.zaryum.addEventListener('click', ()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));

  // Отладка ошибок загрузки (чтобы ловить проблемы путей/регистра)
  [el.logo, el.lunoraBtn, el.noira, el.zaryum].forEach(img=>{
    img.addEventListener('error', ()=> dbg('Ошибка загрузки: ' + img.src));
  });
  el.anim.addEventListener('error', ()=> dbg('Ошибка загрузки bestportal.mp4'));
  el.lunoraVideo.addEventListener('error', ()=> dbg('Ошибка загрузки lunora.mp4'));
})();