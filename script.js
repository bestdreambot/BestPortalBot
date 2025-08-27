document.addEventListener('DOMContentLoaded', () => {
  const screens = {
    logo: document.getElementById('logo-screen'),
    anim: document.getElementById('anim-screen'),
    portal: document.getElementById('portal-screen'),
    team: document.getElementById('team-screen'),
  };

  const logo = document.getElementById('logo');
  const animVideo = document.getElementById('anim-video');
  const lunoraBtn = document.getElementById('lunora-btn');
  const bestBtn = document.getElementById('best-btn');
  const lunoraVideo = document.getElementById('lunora-video');
  const noiraBtn = document.getElementById('noira-btn');
  const zaryumBtn = document.getElementById('zaryum-btn');
  const bestVideo = document.getElementById('best-video');

  const tg = window.Telegram?.WebApp;
  const VER = '3023';

  animVideo.src = `./static/anim/bestportal.mp4?v=${VER}`;
  lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
  bestVideo.src = `./static/anim/best.mp4?v=${VER}`;

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    animVideo.pause();
    lunoraVideo.pause();
    bestVideo.pause();
    if (name === 'anim') animVideo.play().catch(()=>{});
    if (name === 'portal') lunoraVideo.play().catch(()=>{});
    if (name === 'team') bestVideo.play().catch(()=>{});
  }

  if (tg) {
    tg.ready();
    tg.expand();
    tg.setBackgroundColor('#000000');
    tg.setHeaderColor('#000000');
  }

  logo.addEventListener('click', () => showScreen('anim'));
  animVideo.addEventListener('click', () => showScreen('logo'));
  lunoraBtn.addEventListener('click', () => showScreen('portal'));
  bestBtn.addEventListener('click', () => showScreen('team'));
  lunoraVideo.addEventListener('click', () => showScreen('anim'));

  noiraBtn.addEventListener('click', () => {
    const url = "https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW";
    if (tg && tg.openLink) tg.openLink(url); else window.open(url, "_blank");
  });

  zaryumBtn.addEventListener('click', () => {
    const url = "https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd";
    if (tg && tg.openLink) tg.openLink(url); else window.open(url, "_blank");
  });

  bestVideo.addEventListener('click', () => showScreen('anim'));

  function mountTeam() {
    const members = [
      "Alina.jpg","Andrey.jpg","Galia.jpg","Marika.jpg",
      "Masha.jpg","Vitali.jpg","Viva.jpg","ira.jpg",
      "katrin.jpg","maria.jpg","marina.jpg","natalia.jpg",
      "sasha.jpg","vika.jpg"
    ];
    const topRow = document.querySelector('.top-row');
    const middleRow1 = document.querySelectorAll('.middle-row')[0];
    const middleRow2 = document.querySelectorAll('.middle-row')[1];
    const bottomRow = document.querySelector('.bottom-row');
    function createMemberElement(filename) {
      const img = document.createElement('img');
      img.src = `./static/contacts/best/${filename}`;
      img.alt = filename.split('.')[0];
      return img;
    }
    topRow.innerHTML = '';
    middleRow1.innerHTML = '';
    middleRow2.innerHTML = '';
    bottomRow.innerHTML = '';
    members.slice(0,4).forEach(m => topRow.appendChild(createMemberElement(m)));
    members.slice(4,7).forEach(m => middleRow1.appendChild(createMemberElement(m)));
    members.slice(7,10).forEach(m => middleRow2.appendChild(createMemberElement(m)));
    members.slice(10,14).forEach(m => bottomRow.appendChild(createMemberElement(m)));
  }
  mountTeam();
});