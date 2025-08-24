(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const VER = new URLSearchParams(location.search).get('v') || Date.now();
  const parts = location.pathname.split('/').filter(Boolean);
  // проектное имя на GitHub Pages (user.github.io/<project>/...)
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';
  const img = p => ROOT + 'static/img/' + p + '?v=' + VER;
  const anim = p => ROOT + 'static/anim/' + p + '?v=' + VER;

  // элементы
  const screenLogo = document.getElementById('logo-screen');
  const screenAnim = document.getElementById('anim-screen');
  const screenLunora = document.getElementById('lunora-screen');
  const logo = document.getElementById('logo');
  const animVideo = document.getElementById('anim');
  const miniLunoraBtn = document.getElementById('mini-lunora');
  const lunoraVideo = document.getElementById('lunora-video');
  const noiraThumb = document.getElementById('noira-thumb');
  const zaryumThumb = document.getElementById('zaryum-thumb');
  const noiraLink = document.getElementById('noira-link');
  const zaryumLink = document.getElementById('zaryum-link');

  // ссылки на YouTube (можно заменить на реальные плейлисты)
  const LINKS = {
    Noira: 'https://youtube.com/playlist?list=EXAMPLE_NOIRA',
    Zaryum: 'https://youtube.com/playlist?list=EXAMPLE_ZARYUM'
  };

  // Инициализация Telegram
  try{
    const tg = window.Telegram?.WebApp;
    if(tg){
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor?.('#000000');
    }
  }catch(e){}

  // Загрузка лого с учётом регистра и расширений
  (function tryLoadLogo(){
    const candidates = [img('BestPortal.jpg'), img('bestportal.jpeg'), img('bestportal.png')];
    function next(){
      const url = candidates.shift();
      if(!url){ dbg('Лого не найдено'); return; }
      logo.onload = () => dbg('');
      logo.onerror = () => { dbg('Ошибка загрузки: ' + url); next(); };
      logo.src = url;
      dbg('Загрузка: ' + url);
    }
    next();
  })();

  // Экран 1 -> Экран 2
  logo.addEventListener('click', () => {
    screenLogo.classList.remove('active');
    screenAnim.classList.add('active');
    // Запускаем анимацию и задаём мини-иконку
    animVideo.src = anim('bestportal.mp4');
    animVideo.play().catch(()=>{});
    miniLunoraBtn.style.backgroundImage = 'url(' + img('lunora.png') + ')';
  });

  // Клик по мини-иконке -> Экран 3
  miniLunoraBtn.addEventListener('click', () => {
    screenAnim.classList.remove('active');
    screenLunora.classList.add('active');
    lunoraVideo.src = anim('lunora.mp4');
    lunoraVideo.play().catch(()=>{});
    // Боковые превью и ссылки
    noiraThumb.src = img('Noira.jpg');
    zaryumThumb.src = img('Zaryum.jpg');
    noiraLink.href = LINKS.Noira;
    zaryumLink.href = LINKS.Zaryum;
  });

})();