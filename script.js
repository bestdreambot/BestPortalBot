// init + переходы: 1) лого -> 2) анимация + Lunora -> 3) Noira/Zaryum
(function(){
  const $ = s => document.querySelector(s);
  const dbg = m => { const el=$("#debug"); if(el) el.textContent=m||""; };

  const s1=$("#screen-1"), s2=$("#screen-2"), s3=$("#screen-3");
  const logo=$("#logo"), vid=$("#introVideo"), lunora=$("#lunora");
  const tg = window.Telegram?.WebApp;

  // Telegram init
  try{
    if(tg){
      tg.ready();                 // фикс black screen
      tg.setBackgroundColor("#000000");
      tg.setHeaderColor("#000000");
      tg.expand();
      setTimeout(()=>tg.expand(),120);
      if (tg.isVersionAtLeast?.("8.0") && tg.requestFullscreen){
        tg.requestFullscreen();   // даёт fullscreen в Telegram Web
      }
      tg.onEvent?.("viewportChanged",e=>{ if(e?.isStateStable) { /* можно реагировать при желании */ }});
      tg.onEvent?.("themeChanged", ()=> tg.setHeaderColor("#000000"));
    }
  }catch(e){/* no-op */}


  // Шаг 1 -> Шаг 2
  logo.addEventListener("click", ()=>{
    s1.classList.remove("active");
    s2.classList.add("active");
    // запускаем видео, но оставляем размер как у картинки
    try{
      vid.currentTime = 0;
      vid.play().catch(()=>{ /* iOS может требовать повторный жест; не критично */ });
    }catch(e){}
  });

  // Шаг 2 -> Шаг 3 по клику на Lunora
  lunora.addEventListener("click", ()=>{
    s2.classList.remove("active");
    s3.classList.add("active");
  });

  // Безопасность: скрыть любые тексты на кнопках (если браузер что-то добавит)
  ["noira","zaryum"].forEach(id=>{
    const el = $("#"+id);
    if(el) el.textContent = "";
  });

  // Сообщения об ошибках путей (для Visit Site)
  logo.addEventListener("error", ()=> dbg("Нет ./static/img/BestPortal.jpg"));
  vid.addEventListener("error",  ()=> dbg("Нет ./static/anim/bestportal.mp4"));
})();
