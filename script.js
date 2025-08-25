(function(){
  const tg = window.Telegram?.WebApp;
  const VER = '3014';

  // Screens
  const screenLogo = document.getElementById('logo-screen');
  const screenAnim = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');
  const screenTeam = document.getElementById('team-screen');

  // Media
  const logo = document.getElementById('logo');
  const animVideo  = document.getElementById('anim-video');
  const lunoraVideo = document.getElementById('lunora-video');
  const bestVideo  = document.getElementById('best-video');

  // Buttons
  const lunoraBtn  = document.getElementById('lunora-btn');
  const bestBtn    = document.getElementById('best-btn');
  const noiraBtn   = document.getElementById('noira-btn');
  const zaryumBtn  = document.getElementById('zaryum-btn');
  const installBtn = document.getElementById('install-btn');

  // Team files
  const members = [
    'Alina.jpg','Andrey.jpg','Galia.jpg','Marika.jpg','Masha.jpg','Vitali.jpg','Viva.jpg',
    'ira.jpg','katrin.jpg','maria.jpg','marina.jpg','natalia.jpg','sasha.jpg','vika.jpg'
  ];

  function init(){
    animVideo.src   = `./static/anim/bestportal.mp4?v=${VER}`;
    lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
    bestVideo.src   = `./static/anim/best.mp4?v=${VER}`;
    try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); installBtn.classList.add('hidden'); } }catch(e){}
    setupPWA();
    mountTeam();
    bind();
  }

  function show(el){ [screenLogo,screenAnim,screenPortal,screenTeam].forEach(s=>s.classList.remove('active')); el.classList.add('active'); }
  function goAnim(){ show(screenAnim); animVideo.play?.(); }
  function goPortal(){ show(screenPortal); lunoraVideo.play?.(); }
  function goTeam(){ show(screenTeam); bestVideo.play?.(); }
  function backToAnim(){ show(screenAnim); animVideo.play?.(); }

  function openLink(url){ if(tg?.openLink) tg.openLink(url); else window.open(url,'_blank'); }

  function mountTeam(){
    const top4 = document.getElementById('top4');
    const top3 = document.getElementById('top3');
    const bottom3 = document.getElementById('bottom3');
    const bottom4 = document.getElementById('bottom4');
    const seg1 = members.slice(0,4);
    const seg2 = members.slice(4,7);
    const seg3 = members.slice(7,10);
    const seg4 = members.slice(10,14);
    [ [top4,seg1], [top3,seg2], [bottom3,seg3], [bottom4,seg4] ].forEach(([el,arr])=>{
      el.innerHTML='';
      arr.forEach(n=> el.appendChild(makeAvatar(n)));
    });
  }
  function makeAvatar(name){
    const img = new Image();
    img.src = `./static/contacts/best/${name}`;
    img.alt = name.replace(/\.jpg$/i,'');
    img.loading = 'lazy';
    img.onerror = ()=>{ img.style.opacity='0.3'; };
    return img;
  }

  // PWA
  let deferredPrompt=null;
  function setupPWA(){
    if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone){ installBtn.classList.add('hidden'); }
    window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; installBtn.classList.remove('hidden'); });
    window.addEventListener('appinstalled',()=>{ installBtn.classList.add('hidden'); deferredPrompt=null; });
    installBtn.addEventListener('click',()=>{
      if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.finally(()=> deferredPrompt=null); }
      else{
        const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
        const msg=isIOS?'iOS: откройте в Safari → Поделиться → На экран Домой':'Android: Меню (⋮) → Установить приложение';
        if(tg?.showAlert) tg.showAlert(msg); else alert(msg);
      }
    });
  }

  // Events
  function bind(){
    logo.addEventListener('click', goAnim);
    lunoraBtn.addEventListener('click', goPortal);
    bestBtn.addEventListener('click', goTeam);
    bestVideo.addEventListener('click', backToAnim);     // 3.1 → 2
    lunoraVideo.addEventListener('click', backToAnim);    // 3 → 2 (по требованию)
    noiraBtn.addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
    zaryumBtn.addEventListener('click',()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));
  }

  document.addEventListener('DOMContentLoaded', init);
})();