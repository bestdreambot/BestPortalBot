// particles.js v3015 — лёгкий движок эффектов (Canvas).
// Чистый чёрный фон не меняем. Canvas имеет pointer-events:none.
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FX_ENABLED = !prefersReduced;

  function fxLayer(canvas){
    const ctx = canvas.getContext('2d');
    const state = { parts:[], last: performance.now(), running:false };
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    function resize(){
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.floor(r.width*DPR);
      canvas.height= Math.floor(r.height*DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    function loop(t){
      if(!state.running) return;
      const now = t || performance.now();
      const dt = Math.min(0.05, (now - state.last)/1000);
      state.last = now;
      ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
      for(let i=state.parts.length-1;i>=0;i--){
        const p=state.parts[i];
        p.vx+=p.ax*dt; p.vy+=p.ay*dt;
        p.x += p.vx*dt; p.y += p.vy*dt;
        p.life -= dt;
        if(p.render) p.render(ctx,p,dt);
        if(p.life<=0) state.parts.splice(i,1);
      }
      if(state.parts.length>0) requestAnimationFrame(loop); else state.running=false;
    }
    function addBurst(burst){
      if(!FX_ENABLED) return;
      state.parts.push(...burst);
      if(!state.running){ state.running=true; state.last=performance.now(); requestAnimationFrame(loop); }
    }
    function rect(){ return canvas.getBoundingClientRect(); }
    window.addEventListener('resize', resize);
    resize();
    return { addBurst, rect };
  }

  function clamp(v,a,b){ return Math.max(a, Math.min(b,v)); }
  function rand(a,b){ return a + Math.random()*(b-a); }

  // Рендеры примитивов — четкие, без пиксельных артефактов.
  function renderSpark(ctx,p){
    ctx.save();
    ctx.globalAlpha = clamp(p.life/p.maxLife,0,1);
    ctx.lineWidth = p.w;
    ctx.lineCap = 'round';
    const g = ctx.createLinearGradient(p.x,p.y,p.x-p.vx*0.05,p.y-p.vy*0.05);
    g.addColorStop(0, p.colorA || '#ffd26a');
    g.addColorStop(1, p.colorB || '#ff8a00');
    ctx.strokeStyle = g;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - p.vx*0.08, p.y - p.vy*0.08);
    ctx.stroke();
    ctx.restore();
  }
  function renderDot(ctx,p){
    ctx.save();
    ctx.globalAlpha = clamp(p.life/p.maxLife,0,1);
    const r = p.r || 2;
    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
    g.addColorStop(0, p.colorA||'#c8f');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  function renderSquare(ctx,p){
    ctx.save();
    ctx.globalAlpha = clamp(p.life/p.maxLife,0.9,1);
    ctx.fillStyle = p.colorA||'#33e';
    const s = p.s || 6;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot||0);
    ctx.fillRect(-s/2,-s/2,s,s);
    ctx.restore();
  }
  function renderRing(ctx,p){
    ctx.save();
    ctx.globalAlpha = clamp(p.life/p.maxLife,0,0.9);
    ctx.lineWidth = p.w||3;
    ctx.strokeStyle = p.colorA||'#ffd26a';
    ctx.beginPath(); ctx.arc(p.x,p.y, p.r||24, 0, Math.PI*2); ctx.stroke();
    ctx.restore();
  }

  function mkSpark(x,y,dir,spd,life,w){
    return {x,y,vx:Math.cos(dir)*spd, vy:Math.sin(dir)*spd, ax:0, ay:300, life, maxLife:life, w:w||2.2, render:renderSpark};
  }
  function mkDot(x,y,dir,spd,life,r,c1){ return {x,y,vx:Math.cos(dir)*spd, vy:Math.sin(dir)*spd, ax:0, ay:-20, life, maxLife:life, r:r||6, colorA:c1, render:renderDot}; }
  function mkSquare(x,y,dir,spd,life,c){ return {x,y,vx:Math.cos(dir)*spd, vy:Math.sin(dir)*spd, ax:0, ay:80, life, maxLife:life, s:6, colorA:c, rot:rand(-0.6,0.6), render:renderSquare}; }
  function mkRing(x,y,r,life,w,c){ return {x,y,vx:0,vy:0,ax:0,ay:0,life,maxLife:life,r:r||26,w:w||3,colorA:c, render:renderRing}; }

  // ПРЕСЕТЫ
  function burstSparks(x,y,layer){
    const parts=[]; const n=10;
    for(let i=0;i<n;i++){
      const dir = rand(Math.PI*0.15, Math.PI*0.45); // вниз-вправо
      const spd = rand(220,420);
      parts.push(mkSpark(x,y,dir,spd,rand(0.35,0.6)));
    }
    layer.addBurst(parts);
  }
  function burstSoftGlow(x,y,layer){
    const parts=[ mkRing(x,y,26,0.5,3,'#ffd26a'), mkRing(x,y,46,0.6,2,'#ffb400') ];
    layer.addBurst(parts);
  }
  function burstNotes(x,y,layer){
    const parts=[]; const n=6;
    for(let i=0;i<n;i++){
      parts.push(mkDot(x,y,rand(-Math.PI/2-0.5,-Math.PI/2+0.5), rand(60,140), rand(0.6,0.9), 7,'#8cf'));
    }
    layer.addBurst(parts);
  }
  function burstSquares(x,y,layer){
    const parts=[]; const n=8;
    for(let i=0;i<n;i++){
      parts.push(mkSquare(x,y, rand(-Math.PI,Math.PI), rand(120,260), rand(0.45,0.7), '#6cf'));
    }
    layer.addBurst(parts);
  }
  function burstExplosion(x,y,layer){
    const parts=[];
    for(let i=0;i<26;i++){
      const dir=rand(0,Math.PI*2); const spd=rand(260,560);
      parts.push(mkSpark(x,y,dir,spd,rand(0.35,0.7),2.6));
    }
    parts.push(mkRing(x,y,34,0.35,3.5,'#fff'));
    parts.push(mkRing(x,y,64,0.5,2.0,'#ffd26a'));
    layer.addBurst(parts);
  }

  // Публичный API
  window.FX = {
    layers: {},
    attach(id){ const c=document.getElementById(id); if(!c) return null; const l=fxLayer(c); this.layers[id]=l; return l; },
    emit(id, type, x, y){
      const l=this.layers[id]; if(!l) return;
      const r=l.rect();
      const px = x - r.left, py = y - r.top;
      switch(type){
        case 'sparks': return burstSparks(px,py,l);
        case 'ring': return burstSoftGlow(px,py,l);
        case 'notes': return burstNotes(px,py,l);
        case 'squares': return burstSquares(px,py,l);
        case 'boom': return burstExplosion(px,py,l);
      }
    }
  };
})();