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
  const canvas=document.getElementById('effects-canvas');
  const VER='3016';

  // attach FX
  const layer = window.FX.attach('effects-canvas');

  function hideAll(){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); }

  function goLogo(){ hideAll(); screenLogo.classList.add('active'); }
  function goAnim(){ hideAll(); screenAnim.classList.add('active'); animVideo.play().catch(()=>{}); }
  function goPortal(){ hideAll(); screenPortal.classList.add('active'); lunoraVideo.play().catch(()=>{}); }
  function goTeam(){ hideAll(); screenTeam.classList.add('active'); bestVideo.play().catch(()=>{}); }

  logo.addEventListener('click', goAnim);
  lunoraBtn.addEventListener('click', e=>{ goPortal(); FX.emit('effects-canvas','sparks',e.clientX,e.clientY); });
  bestBtn.addEventListener('click', e=>{ goTeam(); FX.emit('effects-canvas','ring',e.clientX,e.clientY); });
  noiraBtn.addEventListener('click', e=>{ window.open('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW','_blank'); FX.emit('effects-canvas','notes',e.clientX,e.clientY); });
  zaryumBtn.addEventListener('click', e=>{ window.open('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd','_blank'); FX.emit('effects-canvas','squares',e.clientX,e.clientY); });
  animVideo.addEventListener('click', e=>{ goLogo(); FX.emit('effects-canvas','boom',e.clientX,e.clientY); });
  lunoraVideo.addEventListener('click', e=>{ goAnim(); FX.emit('effects-canvas','ring',e.clientX,e.clientY); });
  bestVideo.addEventListener('click', e=>{ goAnim(); FX.emit('effects-canvas','ring',e.clientX,e.clientY); });

  animVideo.src = `./static/anim/bestportal.mp4?v=${VER}`;
  lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
  bestVideo.src = `./static/anim/best.mp4?v=${VER}`;
})();