(function(){
const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };
const logo = document.getElementById('logo');
const screenLogo = document.getElementById('logo-screen');
const screenAnim = document.getElementById('anim-screen');
const screenPortal = document.getElementById('portal');
const anim = document.getElementById('anim');
const lunoraBadge = document.getElementById('lunora-badge');
const stage3 = document.getElementById('stage3');
const stage3vid = document.getElementById('stage3vid');
const tg = window.Telegram?.WebApp;

// Telegram init
try{
if(tg){
tg.ready();
tg.expand();
tg.setBackgroundColor('#000000');
tg.setHeaderColor('#000000');
}
}catch(e){
console.error('Telegram WebApp error:', e);
}

// Нажатие на логотип -> показ анимации
logo.addEventListener('click', ()=>{
  screenLogo.classList.remove('active');
  screenAnim.classList.add('active');
  anim.src = './static/anim/bestportal.mp4';
  anim.play();
});

// Нажатие на бейдж Lunora -> переход в stage3
lunoraBadge.addEventListener('click', ()=>{
  screenAnim.classList.remove('active');
  stage3.classList.add('active');
  stage3vid.src = './static/anim/lunora.mp4';
  stage3vid.play();
  document.getElementById('btn-noira').href = 'https://youtube.com/playlist?list=EXAMPLE_NOIRA';
  document.getElementById('btn-zaryum').href = 'https://youtube.com/playlist?list=EXAMPLE_ZARYUM';
});
})();