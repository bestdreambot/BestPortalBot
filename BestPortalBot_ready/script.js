(function(){
  const dbg = m => { const el=document.getElementById('debug'); if(el) el.textContent=m||''; };
  const logo=document.getElementById('logo');
  const screenLogo=document.getElementById('logo-screen');
  const screenAnim=document.getElementById('anim-screen');
  const screenPortal=document.getElementById('portal');
  const anim=document.getElementById('anim');
  const installBtn=document.getElementById('install-btn');
  const tg=window.Telegram?.WebApp;
  try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); } }catch(_){}
  const h=tg?.HapticFeedback; const tap=()=>h?.impactOccurred?.('light');
  function setScreen(name){
    if(name==='portal'){ screenLogo.classList.remove('active'); screenAnim.classList.remove('active'); screenPortal.classList.add('active'); tg?.BackButton?.show?.(); }
    else if(name==='anim'){ screenLogo.classList.remove('active'); screenPortal.classList.remove('active'); screenAnim.classList.add('active'); tg?.BackButton?.show?.(); }
    else{ screenPortal.classList.remove('active'); screenAnim.classList.remove('active'); screenLogo.classList.add('active'); tg?.BackButton?.hide?.(); }
    dbg('');
  }
  logo.addEventListener('click',()=>{ tap(); setScreen('anim'); anim.play().catch(()=>dbg('Автоплей заблокирован')); });
  anim.addEventListener('ended',()=>{ setScreen('portal'); });
  tg?.BackButton?.onClick?.(()=> setScreen('logo'));
  setTimeout(()=>{ if(screenAnim.classList.contains('active') && anim.currentTime===0){ setScreen('portal'); dbg('Автовход'); } },10000);
  const isStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;
  const inTelegram=!!tg;
  if(inTelegram||isStandalone){ installBtn.classList.add('hidden'); }
  let deferredPrompt=null;
  window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; if(!inTelegram&&!isStandalone){ installBtn.classList.remove('hidden'); } });
  installBtn.addEventListener('click',async()=>{
    tap();
    if(deferredPrompt){ deferredPrompt.prompt(); const {outcome}=await deferredPrompt.userChoice; if(outcome==='accepted'){ installBtn.classList.add('hidden'); } deferredPrompt=null; }
    else{ showInstallInstructions(); }
  });
  window.addEventListener('appinstalled',()=>installBtn.classList.add('hidden'));
  function showInstallInstructions(){
    const msg='Установите Best Portal на главный экран.\n\niOS:\n1) Нажмите «Поделиться»\n2) «На экран Домой»\n3) Подтвердите\n\nAndroid:\n1) Меню браузера (⋮)\n2) «Установить приложение»\n3) Подтвердите';
    if(tg?.showAlert){ tg.showAlert(msg); } else { alert(msg); }
  }
})();