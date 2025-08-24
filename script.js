// 🔑 BestPortalBot — шаг с позиционированием значков (v=5001)
(function(){
  const $ = s => document.querySelector(s);
  const dbg = m => { const el = $("#debug"); if (el) el.textContent = m || ""; };

  const s1 = $("#screen-1");
  const s2 = $("#screen-2");
  const s3 = $("#screen-3");
  const logo = $("#logo");
  const video = $("#intro");
  const lunora = $("#badge-lunora");

  // TWA инициализация (не мешает обычному сайту)
  const tg = window.Telegram?.WebApp;
  try{
    if (tg){
      tg.ready();
      tg.setBackgroundColor("#000000");
      tg.setHeaderColor("#000000");
      tg.expand();
      if (tg.version && parseFloat(tg.version) >= 8.0 && tg.requestFullscreen){
        tg.requestFullscreen();
      } else {
        setTimeout(()=>tg.expand(), 120);
      }
    }
  }catch(e){/* no-op */}


  // Экран 1 -> Экран 2
  logo.addEventListener("click", () => {
    s1.classList.remove("active");
    s2.classList.add("active");
    // автозапуск анимации
    try { video.currentTime = 0; video.play().catch(()=>{}); } catch(e){}
  });

  // Кнопка Lunora -> Экран 3
  lunora.addEventListener("click", () => {
    s2.classList.remove("active");
    s3.classList.add("active");
  });

  // Fallback: если видео не грузится — всё равно показать Lunora через 1.5с
  video.addEventListener("error", () => setTimeout(()=>{
    if (!s3.classList.contains("active")) { s2.classList.add("active"); }
  },1500));

  // Для сайта (Visit Site) — показать ошибку пути, если логотип не найден
  logo.addEventListener("error", () => {
    dbg("Не найден логотип: ./static/img/BestPortal.jpg — проверьте путь/регистр имени.");
  });
})();
