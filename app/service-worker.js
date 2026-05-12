const CACHE='caetano-pro-cache-20260512';
const ASSETS=['./','./index.html','./admin.html','./pdv.html','./cozinha.html','./estoque.html','./cliente.html','./superadmin.html','./css/style.css','./js/core.js','./js/page.js','./js/nfe.js','./js/pdv.js','./js/etiquetas.js','./js/firebase-config.js','./manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
