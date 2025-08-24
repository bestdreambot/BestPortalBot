(function(){
const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

const tg = window.Telegram?.WebApp;
const logo = document.getElementById('logo');
const screenLogo = document.getElementById('logo-screen');
const screenAnim = document.getElementById('anim-screen');
const anim = document.getElementById('anim');

// инициализация Telegram WebApp
try{
  if(tg){
    tg.ready();
    tg.expand();
    tg.setBackgroundColor('#000000');
    tg.setHeaderColor('#000000');
  }
}catch(e){ console.error(e); }

// переход: логотип -> анимация
logo.addEventListener('click', ()=>{
  screenLogo.classList.remove('active');
  screenAnim.classList.add('active');
  anim.play();
  dbg('Анимация запущена');
});
})();
