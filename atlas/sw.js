const V = "atlas-20260914-212527";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(V).then(c => c.addAll(["./", "./index.html", "./manifest.json", "./icone-192.png"]))); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(V).then(c => c.put(e.request, copia)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("./index.html"))));
});
