(function () {
  const dbg = m => { const el = document.getElementById('debug'); if (el) el.textContent = m || ''; };

  // Версия для кэша и стартовый экран (?v=1234&screen=portal)
  const qs = new URLSearchParams(location.search);
  const VER = qs.get('v') || Date.now();
  const START_SCREEN = qs.get('screen'); // 'portal' | 'logo' | null

  // Корень проекта на GitHub Pages: /<repo>/
  // Надёжно, даже если страница по адресу /<repo>/subdir/...
  const pathParts = location.pathname.split('/').filter(Boolean);
  const project = pathParts.length ? pathParts[0] : 'BestPortalBot';
  const ROOT = '/' + project + '/';

  // DOM
  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('logo-screen');
  const screenPortal = document.getElementById('portal');

  // Telegram
  const tg = window.Telegram?.WebApp;
  try {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor?.('#000000');
    }
  } catch (_) {}

  // Хаптика
  const h = tg?.HapticFeedback;
  const tap = () => h?.impactOccurred?.('light');

  // Лого: кандидаты с учётом регистра/расширений
  const CANDIDATES = [
    ROOT + 'img/BestPortal.jpg?v=' + VER,   // основной
    ROOT + 'img/bestportal.jpeg?v=' + VER,  // запасной
    ROOT + 'img/bestportal.png?v=' + VER    // запасной
  ];

  function tryLoad(list) {
    if (!list.length) { dbg('Лого не найдено'); return; }
    const url = list.shift();
    logo.onload = () => dbg('');
    logo.onerror = () => { dbg('Ошибка загрузки: ' + url); tryLoad(list); };
    logo.src = url;
    dbg('Загрузка: ' + url);
  }
  tryLoad(CANDIDATES.slice());

  // Управление экранами
  function setScreen(name) {
    if (name === 'portal') {
      screenLogo.classList.remove('active');
      screenPortal.classList.add('active');
      tg?.BackButton?.show?.();
    } else { // logo
      screenPortal.classList.remove('active');
      screenLogo.classList.add('active');
      tg?.BackButton?.hide?.();
    }
    dbg('');
  }

  // Стартовый экран из URL
  if (START_SCREEN === 'portal') setScreen('portal');

  // Клик по логотипу → в портал
  let locked = false;
  logo.addEventListener('click', () => {
    if (locked) return;
    locked = true;
    tap();
    setScreen('portal');
    // небольшой unlock, чтобы не ловить двойные тапы
    setTimeout(() => { locked = false; }, 400);
  });

  // BackButton Telegram → назад к лого
  tg?.BackButton?.onClick?.(() => setScreen('logo'));

  // Резервный таймаут входа в портал, если что-то зависло после загрузки
  // Сработает только если пользователь уже на экране лого дольше 10 сек
  setTimeout(() => {
    if (screenLogo.classList.contains('active') && !screenPortal.classList.contains('active')) {
      setScreen('portal');
      dbg('Автовход в портал (резерв)');
    }
  }, 10000);
})();
