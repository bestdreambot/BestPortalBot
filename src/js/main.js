
(function(){
  const VER=Date.now();

  function init(){
    Utils.preload();
    TelegramAPI.init();

    // Уровень 1 → 2
    document.getElementById('logo').addEventListener('click',()=>{
      UI.show('portal');
      const pv=document.getElementById('portal-video');
      pv.src=`/static/anim/bestportal.mp4?v=${VER}`;
      pv.onloadeddata=()=>pv.play().catch(()=>{});
    });

    // Вход в «аппликации» (левый верх)
    document.getElementById('apps-entry').addEventListener('click',()=>UI.show('apps'));

    // Две карточки приложений
    document.querySelectorAll('.app-card').forEach(el=>{
      el.addEventListener('click',()=>{
        const who=el.getAttribute('data-character');
        UI.playCharacter(who,VER);
      });
    });

    // Назад из видео → список приложений
    document.getElementById('back-btn').addEventListener('click',()=>UI.show('apps'));

    Utils.debug('');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
