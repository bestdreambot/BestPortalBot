
const Utils={
  preload(){
    ["/static/img/BestPortal.jpg","/static/img/Noira.jpg","/static/img/Zaryum.jpg","/static/img/lunora.png"]
      .forEach(s=>{const i=new Image();i.src=s});
    ["/static/anim/bestportal.mp4","/static/anim/lunora.mp4"]
      .forEach(s=>{const v=document.createElement("video");v.src=s;v.preload="auto"});
  },
  debug(m){const el=document.getElementById('debug'); if(el) el.textContent=m||'';}
};
