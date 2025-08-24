(function(){
  const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

  const VER = new URLSearchParams(location.search).get('v') || Date.now();
  const parts = location.pathname.split('/').filter(Boolean);
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';

  const CANDIDATES = [
    ROOT + 'img/BestPortal.jpg?v=' + VER,
    ROOT + 'img/bestportal.jpeg?v=' + VER,
    ROOT + 'img/bestportal.png?v=' + VER
  ];

  const logo = document.getElementById('logo');
  const s1 = document.getElementById('logo-screen');
  const s2 = document.getElementById('portal');
  const tg = window.Telegram?.WebApp;

  function tryLoad(list){
    if(!list.length){ dbg('Лого не найдено'); return; }
    const url = list.shift();
    logo.onload  = () => dbg('');
    logo.onerror = () => { dbg('Ошибка загрузки: ' + url); tryLoad(list); };
    logo.src = url;
  }
  tryLoad(CANDIDATES.slice());

  try{
    if(tg){
      tg.ready();
      tg.expand();                         // максимум высоты
      tg.setBackgroundColor('#000000');    // фон под хедером
      tg.setHeaderColor('#000000');        // чёрная панель
      tg.enableClosingConfirmation();      // подтверждение при «Закрыть»
      setTimeout(()=>{ try{ tg.expand(); }catch{} }, 100); // надёжность

      // при возвращении фокуса снова пытаемся развернуть
      document.addEventListener('visibilitychange', ()=>{
        if(!document.hidden) setTimeout(()=>{ try{ tg.expand(); }catch{} }, 50);
      });
    }
  }catch(e){ console.error(e); }

  logo.addEventListener('click', ()=>{
    s1.classList.remove('active');
    s2.classList.add('active');
    dbg('');
  });
})();
