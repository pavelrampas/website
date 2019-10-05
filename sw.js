const cacheName = `pavel-rampas-web`;
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(cacheName)
			.then(cache => { return cache.addAll([
				`/`
			])
			.then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request);
		})
	);
});
