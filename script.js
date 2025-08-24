(function(){
  const tg = window.Telegram?.WebApp;
  const $ = id => document.getElementById(id);
  const scrLogo = $('screen-logo'), scrBest = $('screen-best'), scrLunora = $('screen-lunora');
  const logo = $('logo'), btnLunora = $('btnLunora');
  const bestVideo = $('bestVideo'), lunVideo = $('lunoraVideo');

  // На всякий случай скрываем всё, кроме первого экрана (если CSS не загрузился)
  scrBest.style.display = 'none';
  scrLunora.style.display = 'none';
  scrLogo.classList.add('active');

  // Telegram UI
  try{
    if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000000'); tg.setHeaderColor('#000000'); setTimeout(()=>tg.expand(),120); }
  }catch(e){}

  const show = el => {
    [scrLogo,scrBest,scrLunora].forEach(s=>{ s.classList.remove('active'); s.style.display='none'; });
    el.style.display='flex'; el.classList.add('active');
  };

  // 1 -> 2
  logo.addEventListener('click', ()=>{ show(scrBest); bestVideo.play().catch(()=>{}); });

  // 2 -> 3
  btnLunora.addEventListener('click', ()=>{ show(scrLunora); lunVideo.play().catch(()=>{}); });

  // Автоплей подстраховка
  [bestVideo,lunVideo].forEach(v=>{
    v.muted = true; v.playsInline = true;
    v.addEventListener('loadeddata', ()=> v.play().catch(()=>{}));
  });
})();
