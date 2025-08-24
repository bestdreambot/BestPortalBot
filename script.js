// 🔑 три шага + YouTube-ссылки
(function () {
  const tg = window.Telegram?.WebApp;
  const dbg = (m) => { const el = document.getElementById('debug'); if (el) el.textContent = m || ''; };

  // корень GH Pages
  const parts = location.pathname.split('/').filter(Boolean);
  const project = parts[0] || 'BestPortalBot';
  const ROOT = '/' + project + '/';

  // пути к ресурсам
  const BP_MP4 = ROOT + 'static/anim/bestportal.mp4';
  const LUNORA_MP4 = ROOT + 'static/anim/8105580353820237458.mp4'; // твой файл
  const URL_NOIRA  = 'https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW&si=5OxPee21XJVrKMxX';
  const URL_ZARYUM = 'https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd&si=aIZEvFPnb5yR_we0';

  // элементы
  const s1 = document.getElementById('screen-logo');
  const s2 = document.getElementById('screen-anim');
  const s3 = document.getElementById('screen-lunora');
  const logo = document.getElementById('logo');
  const bpVideo = document.getElementById('bp-video');
  const lunoraVideo = document.getElementById('lunora-video');
  const badgeLunora = document.getElementById('badge-lunora');
  const btnNoira = document.getElementById('btn-noira');
  const btnZaryum = document.getElementById('btn-zaryum');

  // Telegram UI
  try {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#000000');
      tg.setHeaderColor('#000000');
      setTimeout(() => tg.expand(), 100);
    }
  } catch(e){ console.log(e); }

  // утилиты
  function show(el){ el.classList.add('active'); }
  function hide(el){ el.classList.remove('active'); }
  function openLink(url){
    if (tg && typeof tg.openLink === 'function') tg.openLink(url);
    else window.open(url, '_blank', 'noopener');
  }

  // Шаг 1 → Шаг 2
  logo.addEventListener('click', () => {
    hide(s1); show(s2);
    bpVideo.src = BP_MP4;
    bpVideo.play().catch(()=>{});
  });

  // Шаг 2 → Шаг 3 (по кнопке Lunora)
  badgeLunora.addEventListener('click', () => {
    bpVideo.pause(); bpVideo.src = '';
    hide(s2); show(s3);
    lunoraVideo.src = LUNORA_MP4;
    lunoraVideo.play().catch(()=>{});
  });

  // Кнопки YouTube (поверх видео)
  btnNoira.addEventListener('click', () => openLink(URL_NOIRA));
  btnZaryum.addEventListener('click', () => openLink(URL_ZARYUM));
})();
