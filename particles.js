// particles.js v3017 simplified
window.FX=(function(){
  let layers={};
  function fxLayer(canvas){
    const ctx=canvas.getContext('2d');
    const state={parts:[],running:false,last:0};
    function loop(t){
      if(!state.running)return;
      const now=t||performance.now();const dt=Math.min(0.05,(now-state.last)/1000);state.last=now;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=state.parts.length-1;i>=0;i--){
        const p=state.parts[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;
        if(p.render) p.render(ctx,p); if(p.life<=0) state.parts.splice(i,1);
      }
      if(state.parts.length>0) requestAnimationFrame(loop); else state.running=false;
    }
    function add(parts){state.parts.push(...parts);if(!state.running){state.running=true;state.last=performance.now();requestAnimationFrame(loop);}}
    return {add};
  }
  function spark(x,y){return {x,y,vx:Math.random()*200-100,vy:Math.random()*200-100,life:0.5,render:(ctx,p)=>{ctx.fillStyle='#ffd26a';ctx.fillRect(p.x,p.y,2,2);}};}
  function ring(x,y){return {x,y,vx:0,vy:0,life:0.5,render:(ctx,p)=>{ctx.strokeStyle='#ffb400';ctx.beginPath();ctx.arc(p.x,p.y,20,0,Math.PI*2);ctx.stroke();}};}
  return {
    attach(id){const c=document.getElementById(id);if(!c)return;layers[id]=fxLayer(c);return layers[id];},
    emit(id,type,x,y){const l=layers[id];if(!l)return;let parts=[];if(type==='sparks'){for(let i=0;i<10;i++)parts.push(spark(x,y));}if(type==='ring'){parts.push(ring(x,y));}l.add(parts);}
  };
})();