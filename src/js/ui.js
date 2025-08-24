
const UI={
  screens:{
    logo:document.getElementById('logo-screen'),
    portal:document.getElementById('portal'),
    apps:document.getElementById('apps'),
    video:document.getElementById('character-video-container')
  },
  show(name){Object.values(this.screens).forEach(s=>s.classList.remove('active')); this.screens[name].classList.add('active')},
  playCharacter(character,ver){
    this.show('video');
    const video=document.getElementById('character-video');
    const map={
      // используем доступные ролики
      'Noira':'/static/anim/lunora.mp4',
      'Zaryum':'/static/anim/bestportal.mp4'
    };
    video.style.display='none';
    video.src=(map[character]||'/static/anim/lunora.mp4')+`?v=${ver}`;
    video.onloadeddata=()=>{video.style.display='block'; video.play().catch(()=>{});};
    video.onerror=()=>{console.error('video error'); this.show('apps');};
  }
};
