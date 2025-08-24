// Статика проекта: не трогаем
window.BPS = (()=>({
  project: (location.pathname.split('/').filter(Boolean)[0] || 'BestPortalBot'),
  get ROOT(){ return '/' + this.project + '/'; },
  candidates(VER){
    return [
      this.ROOT + 'img/BestPortal.jpg?v=' + VER,
      this.ROOT + 'img/bestportal.jpeg?v=' + VER,
      this.ROOT + 'img/bestportal.png?v=' + VER
    ];
  },
  dbg(m){ const el=document.getElementById('debug'); if(el) el.textContent=m||''; },
  switchToPortal(){
    document.getElementById('logo-screen').classList.remove('active');
    document.getElementById('portal').classList.add('active');
    this.dbg('');
  }
}))();
