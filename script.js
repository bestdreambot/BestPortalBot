(function(){
const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

const VER = new URLSearchParams(location.search).get('v') || Date.now();

const parts = location.pathname.split('/').filter(Boolean);
const project = parts[0] || 'BestPortalBot';
const ROOT = '/' + project + '/';

// варианты имени, чтобы не было проблем с регистром
const CANDIDATES = [
ROOT + 'img/BestPortal.jpg?v=' + VER,
ROOT + 'img/bestportal.jpg?v=' + VER,
ROOT + 'img/BestPortal.JPG?v=' + VER,
ROOT + 'img/bestportal.jpeg?v=' + VER,
ROOT + 'img/bestportal.png?v=' + VER
];

const logo = document.getElementById('logo');
const screenLogo = document.getElementById('logo-screen');
const screenPortal = document.getElementById('portal');
const tg = window.Telegram?.WebApp;

function tryLoad(list){
if(!list.length){ dbg('Лого не найдено'); return; }
const url = list.shift();
logo.onload  = () => dbg('');
logo.onerror = () => { dbg('Ошибка загрузки: ' + url); tryLoad(list); };
logo.src = url;
dbg('Загрузка: ' + url);
}
tryLoad(CANDIDATES.slice());

function initTelegramWebApp() {
try {
if(!tg) return;
tg.ready();
tg.expand();
tg.setBackgroundColor('#000000');
tg.setHeaderColor('#000000');
tg.enableClosingConfirmation();
setTimeout(() => tg.expand(), 100);
} catch(e) { console.error('Telegram WebApp error:', e); }
}

if(window.Telegram && window.Telegram.WebApp) {
initTelegramWebApp();
} else {
document.addEventListener('DOMContentLoaded', initTelegramWebApp);
window.addEventListener('load', initTelegramWebApp);
}

logo.addEventListener('click', ()=>{
screenLogo.classList.remove('active');
screenPortal.classList.add('active');
if(tg && tg.expand) setTimeout(() => tg.expand(), 50);
dbg('');
});
})();
