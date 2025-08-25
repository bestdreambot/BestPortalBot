(function(){
  const tg = window.Telegram?.WebApp;
  const VER = '3013';
  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('logo-screen');
  const screenAnim = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');
  const screenTeam = document.getElementById('team-screen');

  const animVideo  = document.getElementById('anim-video');
  const lunoraBtn  = document.getElementById('lunora-btn');
  const bestBtn    = document.getElementById('best-btn');
  const lunoraVid  = document.getElementById('lunora-video');
  const noiraBtn   = document.getElementById('noira-btn');
  const zaryumBtn  = document.getElementById('zaryum-btn');
  const bestVideo  = document.getElementById('best-video');
  const installBtn = document.getElementById('install-btn');

  const members = [
    'Alina.jpg','Andrey.jpg','Galia.jpg','Marika.jpg','Masha.jpg','Vitali.jpg','Viva.jpg',
    'ira.jpg','katrin.jpg','maria.jpg','marina.jpg','natalia.jpg','sasha.jpg','vika.jpg'
  ];

  function init(){
    animVideo.src = `./static/anim/bestportal.mp4?v=${VER}`;
    lunoraVid.src = `./static/anim/lunora.mp4?v=${VER}`;
    bestVideo.src = `./static/anim/best.mp4?v=${VER}`;
    try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); installBtn.classList.add('hidden'); } }catch(e){}
    setupPWA();
    mountTeam();
    bind();
  }

  function show(el){ [screenLogo,screenAnim,screenPortal,screenTeam].forEach(s=>s.classList.remove('active')); el.classList.add('active'); }
  function goAnim(){ show(screenAnim); const p=animVideo.play(); if(p?.catch)p.catch(()=>{}); }
  function goPortal(){ show(screenPortal); const p=lunoraVid.play(); if(p?.catch)p.catch(()=>{}); }
  function goTeam(){ show(screenTeam); const p=bestVideo.play(); if(p?.catch)p.catch(()=>{}); }
  function backToAnim(){ show(screenAnim); const p=animVideo.play(); if(p?.catch)p.catch(()=>{}); }

  function openLink(url){ if(tg?.openLink) tg.openLink(url); else window.open(url,'_blank'); }

  function mountTeam(){
    const top = document.getElementById('team-row-top');
    const bottom = document.getElementById('team-row-bottom');
    top.innerHTML=''; bottom.innerHTML='';
    members.slice(0,7).forEach(n=> top.appendChild(makeAvatar(n)));
    members.slice(7,14).forEach(n=> bottom.appendChild(makeAvatar(n)));
  }
  function makeAvatar(name){
    const img = new Image();
    img.src = `./static/contacts/best/${name}`;
    img.alt = name.replace(/\.jpg$/i,'');
    img.width = 64; img.height=64;
    img.onerror = ()=>{ img.style.opacity='0.3'; };
    img.onclick = ()=>{};
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

  function bind(){
    logo.addEventListener('click', goAnim);
    lunoraBtn.addEventListener('click', goPortal);
    bestBtn.addEventListener('click', goTeam);
    bestVideo.addEventListener('click', backToAnim); // возврат с 3.1 на 2
    noiraBtn.addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
    zaryumBtn.addEventListener('click',()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));
  }

  document.addEventListener('DOMContentLoaded', init);
})();