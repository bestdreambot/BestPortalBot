(function(){
const dbg = m => { const el = document.getElementById('debug'); if(el) el.textContent = m || ''; };

// версия из URL (?v=XXXX) для сброса кэша в Telegram
const VER = new URLSearchParams(location.search).get('v') || Date.now();

// надёжно вычисляем корень проекта на GitHub Pages
const parts = location.pathname.split('/').filter(Boolean);
const project = parts[0] || 'BestPortalBot';
const ROOT = '/' + project + '/';

// кандидаты лого (учёт регистра имён и расширений)
const CANDIDATES = [
ROOT + 'img/BestPortal.jpg?v=' + VER,
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

[0,50,100,200,500].forEach(delay => setTimeout(() => { try { tg.expand(); } catch(_){} }, delay));

if(tg.platform === 'ios') {
setTimeout(() => { try { tg.expand(); tg.setHeaderColor('#000000'); } catch(_){} }, 1000);
}

window.addEventListener('orientationchange', () => setTimeout(() => { try { tg.expand(); } catch(_){} }, 300));

document.addEventListener('visibilitychange', () => {
if(!document.hidden) setTimeout(() => { try { tg.expand(); } catch(_){} }, 100);
});

setTimeout(() => {
try {
const style = document.createElement('style');
style.textContent = `.telegram-webapp-header { opacity:0.1!important; }
.telegram-webapp-header * { color:#000!important; }`;
document.head.appendChild(style);
} catch(_) {}
}, 1500);
} catch(e) { console.error('Telegram WebApp error:', e); }
}

if(window.Telegram && window.Telegram.WebApp) initTelegramWebApp();
else {
document.addEventListener('DOMContentLoaded', initTelegramWebApp);
window.addEventListener('load', initTelegramWebApp);
}

logo.addEventListener('click', ()=>{
screenLogo.classList.remove('active');
screenPortal.classList.add('active');
if(tg && tg.expand) setTimeout(() => { try { tg.expand(); } catch(_){} }, 50);
dbg('');
});
})();