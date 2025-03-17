// Service Worker for Background Audio Playback
const CACHE_NAME = 'audio-player-cache-v1';
const urlsToCache = [
    '/', // Cache the main page
    '/index.html',
    '/css_folder/style.css',
    '/javascript/script.js',
    // Dynamically add all song files and covers from your songs array
    ...self.songsToCache || [], // Populated via message from main script
];

// Install event: Cache essential files and songs
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching files');
            return cache.addAll(urlsToCache);
        }).then(() => self.skipWaiting())
    );
});

// Activate event: Clean up old caches and claim clients
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event: Serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    console.log('Service Worker: Fetching', requestUrl.pathname);

    // Handle audio file requests
    if (requestUrl.pathname.match(/\.(mp3|wav|ogg)$/)) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }).catch(() => {
                    console.error('Service Worker: Fetch failed for', requestUrl.pathname);
                    return new Response('Audio file unavailable offline', { status: 503 });
                });
            })
        );
    } else {
        // For non-audio files, use cache-first strategy
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

// Message event: Update cache with song list from main script
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        console.log('Service Worker: Received cache update message');
        const assets = event.data.assets || [];
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                const newAssets = assets.filter(url => !urlsToCache.includes(url));
                if (newAssets.length > 0) {
                    console.log('Service Worker: Adding new assets to cache:', newAssets);
                    return cache.addAll(newAssets);
                }
            }).then(() => {
                self.songsToCache = assets; // Store for future installs
            })
        );
    }
});