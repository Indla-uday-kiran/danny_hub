// Service Worker for Background Audio Playback
const CACHE_NAME = 'audio-player-cache-v2'; // Updated version for cache refresh
const CORE_ASSETS = [
    '/', // Cache the main page
    '/index.html',
    '/css_folder/style.css',
    '/javascript/script.js',
];

// Dynamically populated song files and covers
let songsToCache = [];

// Install event: Cache core assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching core files');
            return cache.addAll(CORE_ASSETS);
        }).then(() => {
            if (songsToCache.length > 0) {
                return caches.open(CACHE_NAME).then((cache) => {
                    console.log('Service Worker: Pre-caching initial songs:', songsToCache);
                    return cache.addAll(songsToCache);
                });
            }
        }).then(() => self.skipWaiting())
        .catch((err) => console.error('Service Worker: Install failed', err))
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
        .catch((err) => console.error('Service Worker: Activation failed', err))
    );
});

// Fetch event: Serve cached files or fetch from network with audio-specific handling
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    console.log('Service Worker: Fetching', requestUrl.pathname);

    // Handle audio file requests (mp3, wav, ogg)
    if (requestUrl.pathname.match(/\.(mp3|wav|ogg)$/)) {
        event.respondWith(
            // Network-first strategy when online
            (navigator.onLine ? fetch(event.request) : Promise.reject('Offline'))
                .then((networkResponse) => {
                    // Cache the fetched audio file
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        // Notify clients of successful fetch for playback continuity
                        self.clients.matchAll().then((clients) => {
                            clients.forEach((client) => 
                                client.postMessage({ type: 'AUDIO_FETCHED', url: requestUrl.pathname })
                            );
                        });
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Fallback to cache if network fails or offline
                    return caches.match(event.request).then((cachedResponse) => {
                        if (cachedResponse) {
                            console.log('Service Worker: Serving cached audio:', requestUrl.pathname);
                            return cachedResponse;
                        }
                        console.error('Service Worker: Audio unavailable:', requestUrl.pathname);
                        return new Response(
                            JSON.stringify({ error: 'Audio file unavailable offline' }),
                            { status: 503, headers: { 'Content-Type': 'application/json' } }
                        );
                    });
                })
        );
    } else {
        // Cache-first strategy for non-audio files
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            }).catch(() => {
                console.error('Service Worker: Fetch failed for non-audio:', requestUrl.pathname);
                return caches.match('/index.html'); // Fallback to main page
            })
        );
    }
});

// Message event: Update cache with song list from main script
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        console.log('Service Worker: Received cache update message');
        const assets = event.data.assets || [];
        if (assets.length > 0) {
            event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                    const newAssets = assets.filter(url => !songsToCache.includes(url));
                    if (newAssets.length > 0) {
                        console.log('Service Worker: Adding new assets to cache:', newAssets);
                        return cache.addAll(newAssets).then(() => {
                            songsToCache = [...new Set([...songsToCache, ...assets])]; // Update song list
                            console.log('Service Worker: Updated songsToCache:', songsToCache);
                        });
                    }
                }).catch((err) => console.error('Service Worker: Cache update failed', err))
            );
        }
    }
});

// Optional: Handle background sync for audio prefetching (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-audio') {
        console.log('Service Worker: Background sync triggered');
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(songsToCache);
            }).then(() => {
                self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => 
                        client.postMessage({ type: 'SYNC_COMPLETE' })
                    );
                });
            }).catch((err) => console.error('Service Worker: Sync failed', err))
        );
    }
});