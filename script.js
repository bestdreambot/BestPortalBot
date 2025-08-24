(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  // версия из URL (?v=XXXX) для сброса кэша в Telegram
  const VER = new URLSearchParams(location.search).get('v') || Date.now();

  // надёжно вычисляем корень проекта на GitHub Pages
  const parts = location.pathname.split('/').filter(Boolean);
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';

  // кандидаты лого (учёт регистра имён и расширений)
  const CANDIDATES = [
    ROOT + 'img/BestPortal.jpg?v=' + VER,   // текущий вариант
    ROOT + 'img/bestportal.jpeg?v=' + VER,  // запасной
    ROOT + 'img/bestportal.png?v=' + VER    // запасной
  ];

  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('logo-screen');
  const screenPortal = document.getElementById('portal');
  const tg = window.Telegram?.WebApp;

  function tryLoad(list){
    if(!list.length){ dbg('Лого не найдено'); return; }
    const url = list.shift();
    logo.onload  = () => dbg('');
    logo.onerror = () => { dbg('Ошибка загрузки: ' + url); tryLoad(list); };
    logo.src = url;
    dbg('Загрузка: ' + url);
  }
  tryLoad(CANDIDATES.slice());

  // инициализация Telegram Mini App
  try{
    if(tg){
      tg.ready();
      tg.expand();                     // разворачиваем на всю высоту
      tg.setBackgroundColor('#000000');// фон
      tg.setHeaderColor('#000000');    // цвет заголовка (Android)
      tg.enableClosingConfirmation();

      // двойное расширение — помогает на iOS
      setTimeout(() => { try{ tg.expand(); }catch(_){} }, 100);
    }
  }catch(e){
    console.error('Telegram WebApp error:', e);
  }

  // переход в "портал"
  logo.addEventListener('click', ()=>{
    screenLogo.classList.remove('active');
    screenPortal.classList.add('active');
    dbg('');
  });
})();
