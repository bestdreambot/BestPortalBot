// Глобальный перехват JS-ошибок
window.onerror = (m, s, l, c, e) => {
  const t = `JS error: ${m} @ ${s}:${l}`;
  document.getElementById('debug').textContent = t;
  console.error(t, e);
};

document.addEventListener('DOMContentLoaded', () => {
  const dbg = (m)=>{ document.getElementById('debug').textContent = m; console.log(m); };

  const logo = document.getElementById('logo');
  const screenLogo = document.getElementById('screen-logo');
  const screenPortal = document.getElementById('screen-portal');

  // Проверка картинки и подсказка по пути/регистру
  logo.addEventListener('error', () => dbg('Картинка не загрузилась. Проверьте путь: img/BestPortal.jpeg (регистр важен)'));

  const tg = window.Telegram?.WebApp;

  // Экран 1: без полоски Telegram
  try {
    if (tg) {
      tg.ready();
      tg.expand();                 // убрать верхнюю полоску на первом экране
      tg.setBackgroundColor('#000000');
    } else {
      dbg('Запущено вне Telegram. API недоступно.');
    }
  } catch (e) { dbg('Ошибка init WebApp: ' + e.message); }

  // Переход к порталу
  logo.addEventListener('click', () => {
    screenLogo.classList.remove('active');
    screenPortal.classList.add('active');
    // Вернуть полоску программно нельзя. Она появится при свайпе вниз.
    dbg('Портал открыт.');
  });

  dbg('Готово. Жду клик по логотипу.');
});
