(function(){
  const tg = window.Telegram?.WebApp;
  const VER = '3015';
  const EFFECTS_ENABLED = true;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const logo        = document.getElementById('logo');
  const screenLogo  = document.getElementById('logo-screen');
  const screenAnim  = document.getElementById('anim-screen');
  const screenPortal= document.getElementById('portal-screen');
  const screenTeam  = document.getElementById('team-screen');

  const animVideo   = document.getElementById('anim-video');
  const lunoraVideo = document.getElementById('lunora-video');
  const bestVideo   = document.getElementById('best-video');

  const lunoraBtn   = document.getElementById('lunora-btn');
  const bestBtn     = document.getElementById('best-btn');
  const noiraBtn    = document.getElementById('noira-btn');
  const zaryumBtn   = document.getElementById('zaryum-btn');

  const installBtn  = document.getElementById('install-btn');

  const fxAnim   = new FXLayer(document.getElementById('fx-anim'));
  const fxPortal = new FXLayer(document.getElementById('fx-portal'));
  const fxTeam   = new FXLayer(document.getElementById('fx-team'));

  const members = ["Alina.jpg","Andrey.jpg","Galia.jpg","Marika.jpg","Masha.jpg","Vitali.jpg","Viva.jpg","ira.jpg","katrin.jpg","maria.jpg","marina.jpg","natalia.jpg","sasha.jpg","vika.jpg"];

  function init(){
    animVideo.src   = `./static/anim/bestportal.mp4?v=${VER}`;
    lunoraVideo.src = `./static/anim/lunora.mp4?v=${VER}`;
    bestVideo.src   = `./static/anim/best.mp4?v=${VER}`;
    try{ if(tg){ tg.ready(); tg.expand(); tg.setBackgroundColor('#000'); tg.setHeaderColor?.('#000'); installBtn.classList.add('hidden'); } }catch(e){}
    mountTeam();
    bind();
    [animVideo,lunoraVideo,bestVideo].forEach(v=>{v.classList.add('glow'); setTimeout(()=>v.classList.remove('glow'), 450);});
  }

  function mountTeam(){
    const top4   = document.querySelector('.top4');
    const mid3   = document.querySelector('.mid3');
    const mid3b  = document.querySelector('.mid3b');
    const bottom4= document.querySelector('.bottom4');
    const mk = f => `<img class="avatar" data-name="${f}" src="./static/contacts/best/${f}" alt="${f.replace(/\.jpg$/i,'')}" />`;
    top4.innerHTML    = members.slice(0,4).map(mk).join('');
    mid3.innerHTML    = members.slice(4,7).map(mk).join('');
    mid3b.innerHTML   = members.slice(7,10).map(mk).join('');
    bottom4.innerHTML = members.slice(10,14).map(mk).join('');
    screenTeam.querySelectorAll('.avatar').forEach(img=>{
      img.addEventListener('click', (e)=>{
        if(!EFFECTS_ENABLED || REDUCED) return;
        const rect = img.getBoundingClientRect();
        const x = rect.left + rect.width/2;
        const y = rect.top + rect.height/2;
        const preset = presetForAvatar(img.getAttribute('data-name'));
        fxTeam.emitEffect(preset, x, y);
      });
    });
  }

  function show(el){ [screenLogo,screenAnim,screenPortal,screenTeam].forEach(s=>s.classList.remove('active')); el.classList.add('active'); }
  function goLogo(){ show(screenLogo); }
  function goAnim(){ show(screenAnim); breath(animVideo); }
  function goPortal(){ show(screenPortal); breath(lunoraVideo); }
  function goTeam(){ show(screenTeam); breath(bestVideo); }

  function bind(){
    logo.addEventListener('click', goAnim);
    lunoraBtn.addEventListener('click', ()=>{ goPortal(); sparkButton(lunoraBtn, fxPortal); });
    bestBtn?.addEventListener('click', ()=>{ goTeam(); ringButton(bestBtn, fxTeam); });
    lunoraVideo.addEventListener('click', goAnim);
    bestVideo.addEventListener('click', goAnim);
    animVideo.addEventListener('click', goLogo);
    noiraBtn.addEventListener('click', ()=>{ openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmXUdZlHeY4HgbE29TWwfTiW'); noteButton(noiraBtn, fxPortal); });
    zaryumBtn.addEventListener('click', ()=>{ openLink('https://youtube.com/playlist?list=PLuaNqEUb7SmVnWfr6seNIC_8uMPZSc-Xd'); squaresButton(zaryumBtn, fxPortal); });
  }

  function breath(el){ if(REDUCED) return; el.classList.add('breath','glow'); setTimeout(()=>el.classList.remove('breath'), 220); setTimeout(()=>el.classList.remove('glow'), 420); }
  function sparkButton(btn, layer){ if(!EFFECTS_ENABLED || REDUCED) return; const r=btn.getBoundingClientRect(); layer.emitEffect('sparks', r.left+r.width/2, r.top+r.height/2); }
  function ringButton(btn, layer){ if(!EFFECTS_ENABLED || REDUCED) return; const r=btn.getBoundingClientRect(); const x=r.left+r.width/2, y=r.top+r.height/2; layer.emitEffect('ring', x, y); layer.emitEffect('softglow', x, y); }
  function noteButton(btn, layer){ if(!EFFECTS_ENABLED || REDUCED) return; const r=btn.getBoundingClientRect(); layer.emitEffect('notes', r.left+r.width/2, r.top+r.height/2); }
  function squaresButton(btn, layer){ if(!EFFECTS_ENABLED || REDUCED) return; const r=btn.getBoundingClientRect(); layer.emitEffect('squares', r.left+r.width/2, r.top+r.height/2); }

  function openLink(url){ if(tg?.openLink) tg.openLink(url); else window.open(url,'_blank'); }

  function presetForAvatar(filename){
    const key = filename.toLowerCase();
    if(key.includes('marina')) return 'waves';
    if(key.includes('maria'))  return 'notes';
    if(key.includes('natalia'))return 'hearts';
    if(key.includes('sasha'))  return 'triangles';
    if(key.includes('vika'))   return 'firework';
    if(key.includes('alina'))  return 'petals';
    if(key.includes('andrey')) return 'gears';
    if(key.includes('galia'))  return 'butterflies';
    if(key.includes('marika')) return 'stardust';
    if(key.includes('masha'))  return 'aura';
    if(key.includes('vitali')) return 'neon';
    if(key.includes('viva'))   return 'ribbons';
    if(key.includes('ira'))    return 'ink';
    if(key.includes('katrin')) return 'snow';
    return 'sparks';
  }

  function FXLayer(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.max(1, window.devicePixelRatio || 1);
    this.particles = [];
    this.running = false;
    const resize = ()=>{
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.floor(r.width * this.dpr);
      canvas.height= Math.floor(r.height* this.dpr);
    };
    this.resize = resize;
    resize();
    window.addEventListener('resize', resize);
  }
  FXLayer.prototype.emit = function(p){ this.particles.push(p); if(!this.running){ this.running=true; this.loop(); } };
  FXLayer.prototype.emitEffect = function(kind, x, y){
    const pt = this.toLocal(x,y);
    switch(kind){
      case 'sparks':   emitSparks(this, pt.x, pt.y); break;
      case 'ring':     emitRing(this, pt.x, pt.y); break;
      case 'softglow': emitSoftGlow(this, pt.x, pt.y); break;
      case 'notes':    emitNotes(this, pt.x, pt.y); break;
      case 'squares':  emitSquares(this, pt.x, pt.y); break;
      case 'petals':   emitPetals(this, pt.x, pt.y); break;
      case 'gears':    emitGears(this, pt.x, pt.y); break;
      case 'butterflies': emitButterflies(this, pt.x, pt.y); break;
      case 'stardust': emitStardust(this, pt.x, pt.y); break;
      case 'aura':     emitAura(this, pt.x, pt.y); break;
      case 'neon':     emitNeonGrid(this, pt.x, pt.y); break;
      case 'ribbons':  emitRibbons(this, pt.x, pt.y); break;
      case 'ink':      emitInk(this, pt.x, pt.y); break;
      case 'snow':     emitSnow(this, pt.x, pt.y); break;
      case 'hearts':   emitHearts(this, pt.x, pt.y); break;
      case 'triangles':emitTriangles(this, pt.x, pt.y); break;
      case 'firework': emitFirework(this, pt.x, pt.y); break;
      case 'waves':    emitWaves(this, pt.x, pt.y); break;
      default:         emitSparks(this, pt.x, pt.y);
    }
  };
  FXLayer.prototype.toLocal = function(x,y){
    const r = this.canvas.getBoundingClientRect();
    const lx = (x - r.left) * this.dpr;
    const ly = (y - r.top)  * this.dpr;
    return {x:lx, y:ly};
  };
  FXLayer.prototype.loop = function(){
    if(!this.running) return;
    const ctx = this.ctx, c=this.canvas;
    ctx.clearRect(0,0,c.width,c.height);
    const now = performance.now();
    this.particles = this.particles.filter(p=>{
      const alive = p.update(now);
      if(alive){ p.draw(ctx); }
      return alive;
    });
    if(this.particles.length>0) requestAnimationFrame(this.loop.bind(this));
    else this.running=false;
  };

  function clamp(v,min,max){ return v<min?min:(v>max?max:v); }
  function rnd(a,b){ return Math.random()*(b-a)+a; }

  function Particle(opts){
    Object.assign(this, {
      x:0,y:0,vx:0,vy:0,ax:0,ay:0, size:4, rot:0, vr:0, life:600, born:performance.now(),
      color:'#fff', shape:'circle', opacity:1, stroke:false, width:2, customDraw:null
    }, opts||{});
  }
  Particle.prototype.update = function(now){
    const t = now - this.born;
    if(t>this.life) return false;
    this.vx += this.ax; this.vy += this.ay;
    this.x  += this.vx; this.y  += this.vy;
    this.rot+= this.vr;
    this.opacity = clamp(1 - t/this.life, 0, 1);
    return true;
  };
  Particle.prototype.draw = function(ctx){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    if(this.customDraw){ this.customDraw(ctx, this); ctx.restore(); return; }
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    if(this.shape==='circle'){
      ctx.beginPath(); ctx.arc(0,0,this.size,0,Math.PI*2); ctx.closePath(); this.stroke?ctx.stroke():ctx.fill();
    }else if(this.shape==='square'){
      const s=this.size*2; ctx.fillRect(-s/2,-s/2,s,s);
    }else if(this.shape==='triangle'){
      const s=this.size*2; ctx.beginPath(); ctx.moveTo(0,-s/1.7); ctx.lineTo(s/1.7,s/1.7); ctx.lineTo(-s/1.7,s/1.7); ctx.closePath(); ctx.fill();
    }else if(this.shape==='line'){
      ctx.lineWidth = this.width; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-this.size,0); ctx.lineTo(this.size,0); ctx.stroke();
    }else if(this.shape==='ring'){
      ctx.lineWidth = this.width; ctx.beginPath(); ctx.arc(0,0,this.size,0,Math.PI*2); ctx.stroke();
    }else if(this.shape==='heart'){
      const s=this.size;
      ctx.beginPath();
      ctx.moveTo(0, -s/2);
      ctx.bezierCurveTo(s/2, -s, s, -s/4, 0, s);
      ctx.bezierCurveTo(-s, -s/4, -s/2, -s, 0, -s/2);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  };

  function emitSparks(layer,x,y){
    const n = 10;
    for(let i=0;i<n;i++){
      const a = rnd(Math.PI*0.2, Math.PI*0.45);
      const sp = rnd(2,5);
      layer.emit(new Particle({
        x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, ay: 0.12,
        shape:'line', width:rnd(2,3), size:rnd(8,14),
        color: 'rgba(255,215,120,1)', life: rnd(380,560), rot:rnd(-0.2,0.2), vr:rnd(-0.01,0.01)
      }));
    }
  }
  function emitRing(layer,x,y){
    layer.emit(new Particle({ x,y, shape:'ring', width:3, size:8, life:500, color:'rgba(180,220,255,0.9)',
      customDraw:(ctx,p)=>{
        const t=(performance.now()-p.born)/p.life; const R = 8 + t*48; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0,0,R,0,Math.PI*2); ctx.strokeStyle='rgba(180,220,255,'+(1-t)+')'; ctx.stroke();
      }}));
  }
  function emitSoftGlow(layer,x,y){
    for(let i=0;i<3;i++){ layer.emit(new Particle({ x,y, shape:'circle', size: 16+i*6, life: 420+i*50, color:'rgba(120,200,255,0.15)'})); }
  }
  function emitNotes(layer,x,y){
    const n=5;
    for(let i=0;i<n;i++){
      layer.emit(new Particle({ x, y, vx:rnd(-0.6,0.6), vy:rnd(-1.8,-1.0), ay: -0.01, life:rnd(420,620),
        customDraw:(ctx,p)=>{ ctx.fillStyle='rgba(160,220,255,'+p.opacity+')'; ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2); ctx.fill(); ctx.fillRect(3,-12,2,12); }}));
    }
  }
  function emitSquares(layer,x,y){
    const n=8; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-2,2), vy:rnd(-2,2), vr:rnd(-0.2,0.2), shape:'square', size:rnd(3,5), life:rnd(350,520), color:'rgba(120,240,255,1)'})); }
  }
  function emitPetals(layer,x,y){
    const n=8; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-0.6,0.6), vy:rnd(0.2,1.2), vr:rnd(-0.05,0.05), life:rnd(600,800),
      customDraw:(ctx,p)=>{ ctx.fillStyle='rgba(255,180,210,'+p.opacity+')'; ctx.beginPath(); ctx.ellipse(0,0,6,3, p.rot, 0, Math.PI*2); ctx.fill(); }})); }
  }
  function emitGears(layer,x,y){
    const n=5; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vr:rnd(-0.1,0.1), life:600, customDraw:(ctx,p)=>{
      const R=8; ctx.strokeStyle='rgba(180,180,180,'+p.opacity+')'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(0,0,R,0,Math.PI*2); ctx.stroke();
      for(let k=0;k<6;k++){ ctx.save(); ctx.rotate((Math.PI*2/6)*k); ctx.beginPath(); ctx.moveTo(R,0); ctx.lineTo(R+4,0); ctx.stroke(); ctx.restore(); }
    }})); }
  }
  function emitButterflies(layer,x,y){
    const n=4; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(0.2,1.2), vy:rnd(-1.2,-0.2), vr:rnd(-0.1,0.1), life:rnd(600,800),
      customDraw:(ctx,p)=>{ ctx.fillStyle='rgba(255,200,120,'+p.opacity+')'; ctx.beginPath(); ctx.ellipse(-4,0,4,6,0,0,Math.PI*2); ctx.ellipse(4,0,4,6,0,0,Math.PI*2); ctx.fill(); }})); }
  }
  function emitStardust(layer,x,y){
    const n=12; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-1.5,1.5), vy:rnd(-1.5,1.5), size:rnd(1,2), color:'rgba(255,255,255,1)', life:rnd(450,700)})); }
  }
  function emitAura(layer,x,y){
    for(let i=0;i<3;i++){ layer.emit(new Particle({ x,y, shape:'ring', width:2, size:6+i*8, color:'rgba(200,220,255,1)', life:500+i*60})); }
  }
  function emitNeonGrid(layer,x,y){
    const n=16; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-1.2,1.2), vy:rnd(-1.2,1.2), shape:'square', size:2, color:'rgba(0,255,255,1)', life:rnd(380,520)})); }
  }
  function emitRibbons(layer,x,y){
    const n=6; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-0.6,0.6), vy:rnd(-1.2,-0.4), life:rnd(500,700),
      customDraw:(ctx,p)=>{ ctx.strokeStyle='rgba(255,120,200,'+p.opacity+')'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(6,-4, 10,-8, 16,-14); ctx.stroke(); }})); }
  }
  function emitInk(layer,x,y){
    for(let i=0;i<10;i++){ layer.emit(new Particle({ x+rnd(-2,2), y+rnd(-2,2), size:rnd(2,6), color:'rgba(80,120,255,0.25)', life:rnd(500,700)})); }
  }
  function emitSnow(layer,x,y){
    const n=10; for(let i=0;i<n;i++){ layer.emit(new Particle({ x+rnd(-6,6), y, vy:rnd(0.2,0.8), size:rnd(1.5,2.5), color:'rgba(255,255,255,1)', life:rnd(600,900)})); }
  }
  function emitHearts(layer,x,y){
    const n=6; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-0.6,0.6), vy:rnd(-1.2,-0.4), shape:'heart', size:rnd(5,7), color:'rgba(255,120,160,1)', life:rnd(550,800)})); }
  }
  function emitTriangles(layer,x,y){
    const n=8; for(let i=0;i<n;i++){ layer.emit(new Particle({ x,y, vx:rnd(-1.4,1.4), vy:rnd(-1.4,1.4), vr:rnd(-0.2,0.2), shape:'triangle', size:rnd(3,5), color:'rgba(180,220,255,1)', life:rnd(450,650)})); }
  }
  function emitFirework(layer,x,y){
    const n=24; for(let i=0;i<n;i++){ const a=rnd(0,Math.PI*2), sp=rnd(1.2,2.4); layer.emit(new Particle({ x,y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:rnd(1.5,2.2), color:'rgba(255,200,120,1)', life:rnd(600,900)})); }
  }
  function emitWaves(layer,x,y){
    for(let i=0;i<2;i++){ layer.emit(new Particle({ x,y, shape:'ring', width:2, size:10+i*12, color:'rgba(120,180,255,1)', life:650+i*120})); }
  }

  // PWA
  let deferredPrompt=null;
  window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; installBtn.classList.remove('hidden'); });
  window.addEventListener('appinstalled',()=>{ installBtn.classList.add('hidden'); deferredPrompt=null; });
  installBtn.addEventListener('click',()=>{
    if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.finally(()=> deferredPrompt=null); }
    else{
      const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
      const msg=isIOS?'iOS: откройте в Safari → Поделиться → На экран Домой':'Android: Меню (⋮) → Установить приложение';
      if(tg?.showAlert) tg.showAlert(msg); else alert(msg);
    }
  });

  document.addEventListener('DOMContentLoaded', init);
})();