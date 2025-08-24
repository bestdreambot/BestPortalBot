(function(){
  const VER = new URLSearchParams(location.search).get('v') || Date.now();
  const { ROOT, candidates, dbg, switchToPortal } = window.BPS;
  const logo = document.getElementById('logo');
  const tg = window.Telegram?.WebApp;

  // загрузка лого с fallback
  (function tryLoad(list){
    if(!list.length){ dbg('Лого не найдено'); return; }
    const url=list.shift();
    logo.onload = ()=>dbg('');
    logo.onerror= ()=>{ dbg('Ошибка загрузки: '+url); tryLoad(list); };
    logo.src=url;
  })(candidates(VER));

  // Telegram API
  try{
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor('#000000');      // цвет шапки
      tg.enableClosingConfirmation();     // подтверждение «Закрыть»
      setTimeout(()=>{ try{ tg.expand(); }catch{} },100);
      document.addEventListener('visibilitychange',()=>{
        if(!document.hidden) setTimeout(()=>{ try{ tg.expand(); }catch{} },50);
      });
    }
  }catch(e){ console.error(e); }

  // переход в портал
  logo.addEventListener('click', switchToPortal);
})();
