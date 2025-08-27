document.addEventListener('DOMContentLoaded', () => {
  const screens = {
    logo: document.getElementById('logo-screen'),
    anim: document.getElementById('anim-screen'),
    portal: document.getElementById('portal-screen'),
    team: document.getElementById('team-screen'),
    aleorix: document.getElementById('aleorix-screen')
  };

  const logo = document.getElementById('logo');
  const animVideo = document.getElementById('anim-video');
  const lunoraBtn = document.getElementById('lunora-btn');
  const aleorixBtn = document.getElementById('aleorix-btn');
  const bestBtn = document.getElementById('best-btn');
  const lunoraVideo = document.getElementById('lunora-video');
  const noiraBtn = document.getElementById('noira-btn');
  const zaryumBtn = document.getElementById('zaryum-btn');
  const bestVideo = document.getElementById('best-video');
  const aleorixVideo = document.getElementById('aleorix-video');

  const tg = window.Telegram?.WebApp;
  const VER = '3022';

  animVideo.src = `./static/anim/bestportal.mp4?v=${VER}`;
  lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
  bestVideo.src = `./static/anim/best.mp4?v=${VER}`;
  aleorixVideo.src = `./static/anim/Aleorix.mp4?v=${VER}`;

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    [animVideo, lunoraVideo, bestVideo, aleorixVideo].forEach(v => v.pause());
    if (name === 'anim') animVideo.play().catch(()=>{});
    if (name === 'portal') lunoraVideo.play().catch(()=>{});
    if (name === 'team') bestVideo.play().catch(()=>{});
    if (name === 'aleorix') aleorixVideo.play().catch(()=>{});
  }

  if (tg) { tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor('#000'); }

  logo.addEventListener('click', () => showScreen('anim'));
  animVideo.addEventListener('click', () => showScreen('logo'));
  lunoraBtn.addEventListener('click', () => showScreen('portal'));
  aleorixBtn.addEventListener('click', () => showScreen('aleorix'));
  bestBtn.addEventListener('click', () => showScreen('team'));
  lunoraVideo.addEventListener('click', () => showScreen('anim'));
  bestVideo.addEventListener('click', () => showScreen('anim'));
  aleorixVideo.addEventListener('click', () => showScreen('anim'));

  noiraBtn.addEventListener('click', () => {
    const url = "https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW";
    if (tg && tg.openLink) tg.openLink(url); else window.open(url, "_blank");
  });
  zaryumBtn.addEventListener('click', () => {
    const url = "https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd";
    if (tg && tg.openLink) tg.openLink(url); else window.open(url, "_blank");
  });
});