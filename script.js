(function(){
  const tg = window.Telegram?.WebApp;
  const VER = '3011';
  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('logo-screen');
  const screenAnim = document.getElementById('anim-screen');
  const screenPortal = document.getElementById('portal-screen');
  const animVideo = document.getElementById('anim-video');
  const lunoraBtn = document.getElementById('lunora-btn');
  const lunoraVideo = document.getElementById('lunora-video');
  const noiraBtn = document.getElementById('noira-btn');
  const zaryumBtn = document.getElementById('zaryum-btn');
  const installBtn = document.getElementById('install-btn');

  function init(){
    animVideo.src = `./static/anim/bestportal.mp4?v=${VER}`;
    lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
    try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); installBtn.classList.add('hidden'); } }catch(e){}
    setupPWA();
    bind();
  }
  function goAnim(){ screenLogo.classList.remove('active'); screenAnim.classList.add('active'); const p=animVideo.play(); if(p?.catch)p.catch(()=>{}); lunoraBtn.style.visibility='hidden'; setTimeout(()=>{ lunoraBtn.style.visibility='visible'; },600); }
  function goPortal(){ screenAnim.classList.remove('active'); screenPortal.classList.add('active'); const p=lunoraVideo.play(); if(p?.catch)p.catch(()=>{}); }
  function backToAnim(){ screenPortal.classList.remove('active'); screenAnim.classList.add('active'); const p=animVideo.play(); if(p?.catch)p.catch(()=>{}); }
  let deferredPrompt=null;
  function setupPWA(){ if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone){ installBtn.classList.add('hidden'); } window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; installBtn.classList.remove('hidden'); }); window.addEventListener('appinstalled',()=>{ installBtn.classList.add('hidden'); deferredPrompt=null; }); installBtn.addEventListener('click',()=>{ if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.finally(()=> deferredPrompt=null); }else{ const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent); const msg=isIOS?'iOS: Safari → Поделиться → На экран Домой':'Android: Меню (⋮) → Установить приложение'; if(tg?.showAlert) tg.showAlert(msg); else alert(msg); } }); }
  function openLink(u){ if(tg?.openLink) tg.openLink(u); else window.open(u,'_blank'); }
  function bind(){ logo.addEventListener('click',goAnim); lunoraBtn.addEventListener('click',goPortal); lunoraVideo.addEventListener('click',backToAnim); noiraBtn.addEventListener('click',()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW')); zaryumBtn.addEventListener('click',()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd')); }
  document.addEventListener('DOMContentLoaded',init);
})();