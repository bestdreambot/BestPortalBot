
const TelegramAPI={
  init(){
    const tg=window.Telegram?.WebApp; if(!tg) return null;
    try{
      tg.ready(); tg.expand();
      tg.setBackgroundColor('#000000'); tg.setHeaderColor('#000000');
      [0,150,600].forEach(d=>setTimeout(()=>tg.expand(),d));
      window.addEventListener('orientationchange',()=>setTimeout(()=>tg.expand(),300));
      return tg;
    }catch(e){console.error('TG init error',e);return null;}
  }
};
