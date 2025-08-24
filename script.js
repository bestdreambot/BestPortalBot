(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const logo        = document.getElementById('logo');
  const screenLogo  = document.getElementById('logo-screen');
  const screenAnim  = document.getElementById('anim-screen');
  const screenPort  = document.getElementById('portal-screen');

  const anim        = document.getElementById('anim');
  const lunoraBtn   = document.getElementById('lunora-btn');
  const lunoraVideo = document.getElementById('lunora-video');

  const noira  = document.getElementById('noira');
  const zaryum = document.getElementById('zaryum');

  logo.classList.add('media50');
  anim.classList.add('media50');
  lunoraVideo.classList.add('media50');

  const V = '3010';
  anim.src        = './static/anim/bestportal.mp4?v='+V;
  lunoraVideo.src = './static/anim/lunora.mp4?v='+V;

  try{
    const tg = window.Telegram?.WebApp;
    if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor('#000'); }
  }catch(_){}

  logo.addEventListener('click', ()=>{
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');
    anim.currentTime = 0;
    anim.play().catch(()=>{});
    setTimeout(()=>{ lunoraBtn.style.display = 'block'; }, 700);
  });

  lunoraBtn.addEventListener('click', ()=>{
    screenAnim.classList.remove('active');
    screenPort.classList.add('active');
    lunoraVideo.currentTime = 0;
    lunoraVideo.play().catch(()=>{});
  });

  lunoraVideo.addEventListener('click', ()=>{
    lunoraVideo.pause();
    screenPort.classList.remove('active');
    screenAnim.classList.add('active');
  });

  const openLink = (url)=>{
    const tg = window.Telegram?.WebApp;
    if(tg?.openLink){ tg.openLink(url); } else { window.open(url, '_blank'); }
  };
  noira .addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
  zaryum.addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));

  [anim,lunoraVideo,logo,lunoraBtn,noira,zaryum].forEach(el=>{
    el?.addEventListener('error', ()=>dbg('Ошибка загрузки: '+(el.id||el.tagName)));
  });

  dbg('Готово');
})();