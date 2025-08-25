(function(){
  const dbg = m => { const el=document.getElementById('debug'); if(el) el.textContent=m||''; };

  // DOM
  const screenLogo   = document.getElementById('logo-screen');
  const screenAnim   = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');

  const logo        = document.getElementById('logo');
  const anim        = document.getElementById('anim');
  const lunoraBtn   = document.getElementById('lunora-btn');
  const lunoraVideo = document.getElementById('lunora-video');
  const noira       = document.getElementById('noira');
  const zaryum      = document.getElementById('zaryum');

  // Telegram
  const tg = window.Telegram?.WebApp;
  try{
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor?.('#000000');
    }
  }catch(_){}

  // Навигация
  function show(idToShow){
    for(const id of ['logo-screen','anim-screen','portal-screen']){
      const el = document.getElementById(id);
      if(el) el.classList.toggle('active', id===idToShow);
    }
    dbg('');
  }

  // Шаги сценария
  logo.addEventListener('click', ()=>{
    show('anim-screen');
    // запускаем видео; если не запустится — пользователь тапнет ещё раз
    const p = anim.play();
    if(p?.catch) p.catch(()=>dbg('Тапните для старта видео'));
    // показать Lunora через ~600 мс
    lunoraBtn.style.display='none';
    setTimeout(()=>{ lunoraBtn.style.display='block'; }, 600);
  });

  lunoraBtn.addEventListener('click', ()=>{
    show('portal-screen');
    // крутить lunora.mp4 по центру
    const p = lunoraVideo.play();
    if(p?.catch) p.catch(()=>dbg('Тапните для старта видео'));
  });

  // На Экране 3 клик по самому видео Lunora — назад на Экран 2
  lunoraVideo.addEventListener('click', ()=>{
    show('anim-screen');
    const p = anim.play();
    if(p?.catch) p.catch(()=>dbg('Тапните для старта видео'));
    // заново задержка для кнопки Lunora
    lunoraBtn.style.display='none';
    setTimeout(()=>{ lunoraBtn.style.display='block'; }, 600);
  });

  // Ссылки YouTube через Telegram или в новом окне
  function open(url){
    if(tg?.openLink) tg.openLink(url);
    else window.open(url, '_blank');
  }
  noira.addEventListener('click', ()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
  zaryum.addEventListener('click',()=> open('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));

  // Подсказки об ошибках загрузки
  anim.addEventListener('error', ()=> dbg('Ошибка загрузки bestportal.mp4'));
  lunoraVideo.addEventListener('error', ()=> dbg('Ошибка загрузки lunora.mp4'));
})();