window.EFFECTS_ENABLED = true;

document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram?.WebApp;
  if (tg) { try { tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor('#000'); } catch(e){} }

  // Подгрузка критичных ресурсов
  preloadResources([
    './static/anim/bestportal.mp4',
    './static/anim/lunora.mp4',
    './static/anim/best.mp4',
    './static/img/Lunora.png',
    './static/img/Noira.jpg',
    './static/img/Zaryum.jpg'
  ]);

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

  const VER = '3020';
  animVideo.src = `./static/anim/bestportal.mp4?v=${VER}`;
  lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
  bestVideo.src  = `./static/anim/best.mp4?v=${VER}`;

  function showScreen(name){
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  // Навигация
  logo.addEventListener('click', () => { showScreen('anim'); animVideo.play().catch(()=>{}); });
  animVideo.addEventListener('click', () => { emitOn(animVideo, 'boom'); showScreen('logo'); });
  lunoraBtn.addEventListener('click', () => { emitOn(lunoraBtn, 'sparks'); showScreen('portal'); lunoraVideo.play().catch(()=>{}); });
  bestBtn.addEventListener('click', () => { emitOn(bestBtn, 'ring'); showScreen('team'); bestVideo.play().catch(()=>{}); });
  lunoraVideo.addEventListener('click', () => { showScreen('anim'); });
  noiraBtn.addEventListener('click', () => { emitOn(noiraBtn, 'notes'); openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'); });
  zaryumBtn.addEventListener('click', () => { emitOn(zaryumBtn, 'squares'); openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'); });
  bestVideo.addEventListener('click', () => { showScreen('anim'); });

  // Команда 14
  mountTeam();

  // Эффекты
  const canvas = document.getElementById('effects-canvas');
  if (canvas && window.FX) { window.FX.attach('effects-canvas'); }

  function emitOn(el, type){
    if (!window.EFFECTS_ENABLED || !window.FX) return;
    const r = el.getBoundingClientRect();
    const x = r.left + r.width/2;
    const y = r.top + r.height/2;
    window.FX.emit('effects-canvas', type, x, y);
  }

  function openLink(url){
    if (tg && tg.openLink) { try { tg.openLink(url); return; } catch(e){} }
    window.open(url, '_blank');
  }
});

function preloadResources(list){
  list.forEach(url=>{
    const link=document.createElement('link');
    link.rel='preload';
    link.href=url;
    link.as=url.endsWith('.mp4')?'video':'image';
    document.head.appendChild(link);
  });
}

function mountTeam(){
  const members = [
    "Alina.jpg","Andrey.jpg","Galia.jpg","Marika.jpg",
    "Masha.jpg","Vitali.jpg","Viva.jpg","ira.jpg",
    "katrin.jpg","maria.jpg","marina.jpg","natalia.jpg",
    "sasha.jpg","vika.jpg"
  ];
  const top4   = document.querySelector('.top4');
  const mid3   = document.querySelector('.mid3');
  const mid3b  = document.querySelector('.mid3b');
  const bottom4= document.querySelector('.bottom4');

  function avatar(fn){
    const img=document.createElement('img');
    img.src=`./static/contacts/best/${fn}`;
    img.alt=fn.split('.')[0];
    return img;
  }
  top4.innerHTML=''; mid3.innerHTML=''; mid3b.innerHTML=''; bottom4.innerHTML='';
  members.slice(0,4).forEach(m=>top4.appendChild(avatar(m)));
  members.slice(4,7).forEach(m=>mid3.appendChild(avatar(m)));
  members.slice(7,10).forEach(m=>mid3b.appendChild(avatar(m)));
  members.slice(10,14).forEach(m=>bottom4.appendChild(avatar(m)));
}
