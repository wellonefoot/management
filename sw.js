'use strict';
const CACHE_VERSION='shopizo-management-v107-branding';
const CORE=['./','./index.html','./css/admin.css?v=107','./js/admin-config.js?v=107','./js/management-auth.js?v=107','./js/employee-manage.js?v=107','./js/pwa-install.js?v=107','./manifest.webmanifest?v=shopizo-management-20261007-1','./assets/logo.png?v=shopizo-management-20261007-1','./assets/favicon/favicon.ico?v=shopizo-management-20261007-1'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_VERSION).then(c=>c.put(e.request,copy)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
