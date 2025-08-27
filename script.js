(function(){
  const VER = '3024';
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  // Screens
  const screens = {
    logo: document.getElementById('logo-screen'),
    anim: document.getElementById('anim-screen'),
    portal: document.getElementById('portal-screen'),
    team: document.getElementById('team-screen'),
    aliorix: document.getElementById('aliorix-screen'),
  };

  // Elements
  const logo = document.getElementById('logo');
  const animVideo = document.getElementById('anim-video');
  const lunoraVideo = document.getElementById('lunora-video');
  const bestVideo = document.getElementById('best-video');
  const aliorixVideo = document.getElementById('aliorix-video');

  const aliorixBtn = document.getElementById('aliorix-btn');
  const lunoraBtn  = document.getElementById('lunora-btn');
  const bestBtn    = document.getElementById('best-btn');
  const noiraBtn   = document.getElementById('noira-btn');
  const zaryumBtn  = document.getElementById('zaryum-btn');
  const alinaIcon  = document.getElementById('alina-icon');

  if (tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor('#000'); }

  // --- Robust asset resolution (case-insensitive fallbacks) ---
  function setSrcCaseInsensitive(el, base, name){
    if(!el) return;
    const variants = [
      name,
      name.charAt(0).toUpperCase()+name.slice(1),
      name.toLowerCase(),
      name.toUpperCase()
    ];
    let i = 0;
    function tryNext(){
      if(i>=variants.length) return;
      const src = `${base}${variants[i]}`;
      i++;
      const onOk = ()=>{ el.removeEventListener('error', onErr); };
      const onErr = ()=>{ el.removeEventListener('load', onOk); tryNext(); };
      el.addEventListener('load', onOk, {once:true});
      el.addEventListener('error', onErr, {once:true});
      if(el.tagName === 'VIDEO'){
        el.src = src + `?v=${VER}`;
        el.load();
      }else{
        el.src = src;
      }
    }
    tryNext();
  }

  // Set media sources
  setSrcCaseInsensitive(animVideo,   './static/anim/',  'bestportal.mp4');
  setSrcCaseInsensitive(lunoraVideo, './static/anim/',  'lunora.mp4');
  setSrcCaseInsensitive(bestVideo,   './static/anim/',  'best.mp4');
  setSrcCaseInsensitive(aliorixVideo,'./static/anim/',  'aleorix.mp4'); // поддержит Aleorix/Aliorix

  setSrcCaseInsensitive(aliorixBtn, './static/img/', 'aleorix.jpg');
  setSrcCaseInsensitive(lunoraBtn,  './static/img/', 'Lunora.png');
  setSrcCaseInsensitive(bestBtn,    './static/img/', 'best.jpg');
  setSrcCaseInsensitive(noiraBtn,   './static/img/', 'Noira.jpg');
  setSrcCaseInsensitive(zaryumBtn,  './static/img/', 'Zaryum.jpg');
  setSrcCaseInsensitive(alinaIcon,  './static/contacts/best/', 'Alina.jpg');

  function show(name){
    Object.values(screens).forEach(s=>s.classList.remove('active'));
    screens[name].classList.add('active');
    // stop all
    [animVideo,lunoraVideo,bestVideo,aliorixVideo].forEach(v=>{ if(v){ v.pause(); v.currentTime = v.currentTime; } });
    // play current
    if(name==='anim') animVideo.play().catch(()=>{});
    if(name==='portal') lunoraVideo.play().catch(()=>{});
    if(name==='team') bestVideo.play().catch(()=>{});
    if(name==='aliorix') aliorixVideo.play().catch(()=>{});
  }

  // Navigation
  logo.addEventListener('click', ()=> show('anim'));
  animVideo.addEventListener('click', ()=> show('logo'));

  lunoraBtn.addEventListener('click', ()=> show('portal'));
  bestBtn.addEventListener('click', ()=> show('team'));
  aliorixBtn.addEventListener('click', ()=> show('aliorix'));

  lunoraVideo.addEventListener('click', ()=> show('anim'));
  aliorixVideo.addEventListener('click', ()=> show('anim'));
  bestVideo.addEventListener('click', ()=> show('anim'));

  // External links
  noiraBtn.addEventListener('click', ()=> {
    const url='https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW';
    tg && tg.openLink ? tg.openLink(url) : window.open(url,'_blank');
  });
  zaryumBtn.addEventListener('click', ()=> {
    const url='https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd';
    tg && tg.openLink ? tg.openLink(url) : window.open(url,'_blank');
  });

  // Team grid
  function mountTeam(){
    const members = [
      "Alina.jpg","Andrey.jpg","Galia.jpg","Marika.jpg",
      "Masha.jpg","Vitali.jpg","Viva.jpg","ira.jpg",
      "katrin.jpg","maria.jpg","marina.jpg","natalia.jpg",
      "sasha.jpg","vika.jpg"
    ];
    const rows = {
      top: document.querySelector('#team-screen .top-row'),
      mid1: document.querySelectorAll('#team-screen .middle-row')[0],
      mid2: document.querySelectorAll('#team-screen .middle-row')[1],
      bottom: document.querySelector('#team-screen .bottom-row')
    };
    const make = f=>{ const i=document.createElement('img'); setSrcCaseInsensitive(i,'./static/contacts/best/',f); return i; };
    rows.top.innerHTML = rows.mid1.innerHTML = rows.mid2.innerHTML = rows.bottom.innerHTML = '';
    members.slice(0,4).forEach(m=> rows.top.appendChild(make(m)));
    members.slice(4,7).forEach(m=> rows.mid1.appendChild(make(m)));
    members.slice(7,10).forEach(m=> rows.mid2.appendChild(make(m)));
    members.slice(10,14).forEach(m=> rows.bottom.appendChild(make(m)));
  }
  mountTeam();
})();