(function(){
  const tg = window.Telegram?.WebApp;
  const VER = '3014';

  const logo        = document.getElementById('logo');
  const screenLogo  = document.getElementById('logo-screen');
  const screenAnim  = document.getElementById('anim-screen');
  const screenPortal= document.getElementById('portal-screen');
  const screenTeam  = document.getElementById('team-screen');

  const animVideo   = document.getElementById('anim-video');
  const lunoraBtn   = document.getElementById('lunora-btn');
  const bestBtn     = document.getElementById('best-btn');
  const lunoraVideo = document.getElementById('lunora-video');
  const bestVideo   = document.getElementById('best-video');
  const noiraBtn    = document.getElementById('noira-btn');
  const zaryumBtn   = document.getElementById('zaryum-btn');
  const installBtn  = document.getElementById('install-btn');

  const members = ["Alina.jpg","Andrey.jpg","Galia.jpg","Marika.jpg","Masha.jpg","Vitali.jpg","Viva.jpg","ira.jpg","katrin.jpg","maria.jpg","marina.jpg","natalia.jpg","sasha.jpg","vika.jpg"];

  function init(){
    animVideo.src   = `./static/anim/bestportal.mp4?v=${VER}`;
    lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
    bestVideo.src   = `./static/anim/best.mp4?v=${VER}`;

    try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); installBtn.classList.add('hidden'); } }catch(e){}

    mountTeam();
    setupPWA();
    bind();
  }

  function mountTeam(){
    const top4   = document.querySelector('.top4');
    const mid3   = document.querySelector('.mid3');
    const mid3b  = document.querySelector('.mid3b');
    const bottom4= document.querySelector('.bottom4');
    const mk = f => `<img src="./static/contacts/best/${f}" alt="\${f.replace(/\.jpg$/i,'')}" />`;
    top4.innerHTML    = members.slice(0,4).map(mk).join('');
    mid3.innerHTML    = members.slice(4,7).map(mk).join('');
    mid3b.innerHTML   = members.slice(7,10).map(mk).join('');
    bottom4.innerHTML = members.slice(10,14).map(mk).join('');
  }

  function show(el){ [screenLogo,screenAnim,screenPortal,screenTeam].forEach(s=>s.classList.remove('active')); el.classList.add('active'); }
  function goAnim(){ show(screenAnim);  animVideo.play().catch(()=>{}); }
  function goPortal(){ show(screenPortal); lunoraVideo.play().catch(()=>{}); }
  function goTeam(){ show(screenTeam); bestVideo.play().catch(()=>{}); }

  function bind(){
    logo.addEventListener('click', goAnim);
    lunoraBtn.addEventListener('click', goPortal);
    bestBtn?.addEventListener('click', goTeam);
    lunoraVideo.addEventListener('click', goAnim);
    bestVideo.addEventListener('click', goAnim);
    noiraBtn.addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
    zaryumBtn.addEventListener('click',()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));
  }

  function openLink(url){ if(tg?.openLink) tg.openLink(url); else window.open(url,'_blank'); }

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

  document.addEventListener('DOMContentLoaded', init);
})();