(function(){
  const logo=document.getElementById('logo');
  const screenLogo=document.getElementById('logo-screen');
  const screenAnim=document.getElementById('anim-screen');
  const screenPortal=document.getElementById('portal-screen');
  const screenTeam=document.getElementById('team-screen');

  const animVideo=document.getElementById('anim-video');
  const lunoraBtn=document.getElementById('lunora-btn');
  const lunoraVideo=document.getElementById('lunora-video');
  const bestVideo=document.getElementById('best-video');
  const noiraBtn=document.getElementById('noira-btn');
  const zaryumBtn=document.getElementById('zaryum-btn');
  const bestBtn=document.getElementById('best-btn');
  const installBtn=document.getElementById('install-btn');

  const tg=window.Telegram?.WebApp;
  const VER='3017';
  window.EFFECTS_ENABLED=true;

  function initParticles(){
    const canvas=document.getElementById('effects-canvas');
    if(!canvas||!canvas.getContext){window.EFFECTS_ENABLED=false;return;}
    if(typeof FX!=='undefined'){FX.attach('effects-canvas');}
  }

  function openLink(url){
    if(tg){ try{tg.openLink(url);}catch(e){window.open(url,'_blank');} }
    else window.open(url,'_blank');
  }

  function goToAnimScreen(){ hideAll(); screenAnim.classList.add('active'); animVideo.play(); }
  function goToPortalScreen(){ hideAll(); screenPortal.classList.add('active'); lunoraVideo.play(); }
  function goToTeamScreen(){ hideAll(); screenTeam.classList.add('active'); bestVideo.play(); }
  function goLogo(){ hideAll(); screenLogo.classList.add('active'); }

  function hideAll(){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); }

  function setupEvents(){
    logo.addEventListener('click', goToAnimScreen);
    lunoraBtn.addEventListener('click', ()=>{FX.emit('effects-canvas','sparks',window.innerWidth/2,window.innerHeight/2);goToPortalScreen();});
    bestBtn.addEventListener('click', ()=>{FX.emit('effects-canvas','ring',window.innerWidth/2,window.innerHeight/2);goToTeamScreen();});
    lunoraVideo.addEventListener('click', goToAnimScreen);
    bestVideo.addEventListener('click', goToAnimScreen);
    noiraBtn.addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'));
    zaryumBtn.addEventListener('click', ()=>openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'));
    animVideo.addEventListener('click', goLogo);
  }

  document.addEventListener('DOMContentLoaded', ()=>{initParticles();setupEvents();});
})();