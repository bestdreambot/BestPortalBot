const CACHE="bp-cache-update";
const ASSETS=["./","./index.html","./style.css","./script.js","./manifest.json","./static/img/BestPortal.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))))});
self.addEventListener("fetch",e=>{const req=e.request; e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(req.method==='GET'&&res.status===200&&res.type==='basic'){const clone=res.clone(); caches.open(CACHE).then(c=>c.put(req,clone));} return res;}).catch(()=>cached))) });