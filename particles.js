// particles.js v3016
(function(){
  function rand(a,b){ return a+Math.random()*(b-a); }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function fxLayer(canvas){
    const ctx=canvas.getContext('2d'); let parts=[]; let running=false;
    function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
    window.addEventListener('resize',resize); resize();
    function loop(){ if(!running) return; ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=parts.length-1;i>=0;i--){const p=parts[i]; p.x+=p.vx; p.y+=p.vy; p.life--;
        if(p.render) p.render(ctx,p); if(p.life<=0) parts.splice(i,1);}
      if(parts.length>0) requestAnimationFrame(loop); else running=false; }
    function add(b){ parts.push(...b); if(!running){ running=true; requestAnimationFrame(loop);} }
    function rect(){ return canvas.getBoundingClientRect(); }
    return {addBurst:add, rect};
  }
  function mk(x,y,vx,vy,life,render){return {x,y,vx,vy,life,render};}
  function renderSpark(ctx,p){ctx.strokeStyle='#ff0';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*2,p.y-p.vy*2);ctx.stroke();}
  function renderRing(ctx,p){ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(p.x,p.y,20,0,Math.PI*2);ctx.stroke();}
  window.FX={layers:{},attach(id){const c=document.getElementById(id);if(!c)return null;const l=fxLayer(c);this.layers[id]=l;return l;},emit(id,type,x,y){const l=this.layers[id];if(!l)return;let arr=[];switch(type){case 'sparks':for(let i=0;i<10;i++)arr.push(mk(x,y,rand(2,5),rand(2,5),20,renderSpark));break;case 'ring':arr.push(mk(x,y,0,0,30,renderRing));break;case 'notes':for(let i=0;i<6;i++)arr.push(mk(x,y,rand(-2,2),rand(-5,-2),30,renderSpark));break;case 'squares':for(let i=0;i<6;i++)arr.push(mk(x,y,rand(-3,3),rand(-3,3),25,renderSpark));break;case 'boom':for(let i=0;i<20;i++)arr.push(mk(x,y,rand(-6,6),rand(-6,6),30,renderSpark));break;}l.addBurst(arr);}};
})();