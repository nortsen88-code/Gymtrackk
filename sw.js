const C="m2099-v3";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(["./","manifest.webmanifest","icon-192.png","icon-512.png"].map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type=="opaque"){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(m=>m||(e.request.mode=="navigate"?caches.match("./"):Response.error()))))});
