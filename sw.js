/* NaturoApp — Service Worker (PWA)
   Stratégie : app-shell en cache, fonctionne hors-ligne.
   Pense à incrémenter CACHE_VERSION quand tu modifies les fichiers. */
const CACHE_VERSION = 'naturoapp-v23';
const APP_SHELL = [
  'index.html',
  'cours.html',
  'cas.html',
  'bilan.html',
  'carte.html',
  'tuteur.html',
  'fiches.html',
  'reglages.html',
  'revision.html',
  'examen.html',
  'stats.html',
  'app.js',
  'content.js',
  'style.css',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navigation (pages HTML) : réseau d'abord, repli sur le cache (utile hors-ligne)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
    return;
  }

  // Autres ressources : cache d'abord, sinon réseau (puis mise en cache)
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});

// ── Rappel quotidien (Periodic Background Sync, best-effort) ─────
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-reminder') {
    event.waitUntil(
      self.registration.showNotification('NaturoApp 🌿', {
        body: "Ta séance du jour t'attend — quelques minutes suffisent !",
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: 'daily-reminder'
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('revision.html?mode=express');
    })
  );
});
