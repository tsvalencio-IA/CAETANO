const CACHE='caetano-pro-v3-voltar-json-firebase-cloudinary';
const ASSETS=['./','./index.html','./superadmin.html','./admin.html','./pdv.html','./cozinha.html','./estoque.html','./cliente.html','./css/style.css','./js/firebase-config.js','./js/core.js','./js/nfe.js','./js/pdv.js','./js/etiquetas.js','./manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html')))));
