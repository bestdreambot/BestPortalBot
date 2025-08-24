(function(){
const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

const logo = document.getElementById('logo');
const screenLogo = document.getElementById('logo-screen');
const screenAnim = document.getElementById('anim-screen');
const screenPortal = document.getElementById('portal');
const anim = document.getElementById('anim');
const tg = window.Telegram?.WebApp;

// Инициализация Telegram Mini App
try {
  if(tg){
    tg.ready();
    tg.expand();
    tg.setBackgroundColor('#000000');
    tg.setHeaderColor('#000000');
  }
} catch(e) { console.error('Telegram WebApp error:', e); }

// Переход: Лого → Анимация
logo.addEventListener('click', ()=>{
  screenLogo.classList.remove('active');
  screenAnim.classList.add('active');
  anim.play();
});

// Переход: Анимация → Портал
anim.addEventListener('ended', ()=>{
  screenAnim.classList.remove('active');
  screenPortal.classList.add('active');
});
})();
