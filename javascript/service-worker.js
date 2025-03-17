// Cache name and version
const CACHE_NAME = 'danny-hub-cache-v1';

// Default assets to cache on install
const INITIAL_ASSETS = [
    '/',
    '/index.html',
    '/css_folder/style.css',
    '/javascript/script.js',
    '/images/default-cover.jpg' // Fallback image for offline use
];

// Install event: Cache initial assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching initial assets');
                return cache.addAll(INITIAL_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting(); // Force activation immediately
            })
            .catch(err => {
                console.error('Service Worker: Installation failed:', err);
            })
    );
});

// Activate event: Clean up old caches and take control
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => {
                console.log('Service Worker: Old caches cleared');
                return self.clients.claim(); // Take control of clients immediately
            })
            .catch(err => {
                console.error('Service Worker: Activation failed:', err);
            })
    );
});

// Fetch event: Serve from cache or fetch from network with audio optimization
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // Special handling for audio files
    if (request.destination === 'audio') {
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        console.log(`Service Worker: Serving cached audio: ${url.pathname}`);
                        // Background fetch to update cache
                        fetch(request, { cache: 'no-store' })
                            .then(networkResponse => {
                                if (networkResponse.ok) {
                                    caches.open(CACHE_NAME)
                                        .then(cache => cache.put(request, networkResponse.clone()));
                                }
                            })
                            .catch(err => console.error('Service Worker: Background audio fetch failed:', err));
                        return cachedResponse;
                    }

                    // Fetch from network and cache
                    return fetch(request, { cache: 'no-store' })
                        .then(networkResponse => {
                            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                                return networkResponse;
                            }
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                    console.log(`Service Worker: Cached audio: ${url.pathname}`);
                                })
                                .catch(err => console.error('Service Worker: Audio cache put failed:', err));
                            return networkResponse;
                        })
                        .catch(err => {
                            console.error('Service Worker: Audio fetch failed:', err);
                            // Optional: Return a fallback audio file if available
                            return caches.match('/songs/default.mp3') || new Response('Audio unavailable offline', { status: 503 });
                        });
                })
                .catch(err => {
                    console.error('Service Worker: Audio cache match error:', err);
                    return new Response('Audio unavailable offline', { status: 503 });
                })
        );
    } else {
        // General handling for other requests (HTML, CSS, JS, images, etc.)
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        console.log(`Service Worker: Serving cached resource: ${url.pathname}`);
                        // Background fetch to update cache
                        fetch(request)
                            .then(networkResponse => {
                                if (networkResponse.ok) {
                                    caches.open(CACHE_NAME)
                                        .then(cache => cache.put(request, networkResponse.clone()));
                                }
                            })
                            .catch(err => console.error('Service Worker: Background fetch failed:', err));
                        return cachedResponse;
                    }

                    return fetch(request)
                        .then(networkResponse => {
                            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                                return networkResponse;
                            }
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                    console.log(`Service Worker: Cached resource: ${url.pathname}`);
                                })
                                .catch(err => console.error('Service Worker: Cache put failed:', err));
                            return networkResponse;
                        })
                        .catch(err => {
                            console.error('Service Worker: Fetch failed:', err);
                            if (request.mode === 'navigate') {
                                return caches.match('/index.html');
                            }
                            return new Response('Resource unavailable offline', { status: 503 });
                        });
                })
                .catch(err => {
                    console.error('Service Worker: Cache match error:', err);
                    return new Response('Resource unavailable offline', { status: 503 });
                })
        );
    }
});

// Message event: Handle dynamic cache updates and keep-alive signals
self.addEventListener('message', (event) => {
    if (!event.data || !event.data.type) return;

    switch (event.data.type) {
        case 'UPDATE_CACHE':
            const assets = event.data.assets || [];
            if (!Array.isArray(assets) || assets.length === 0) {
                event.source?.postMessage({
                    type: 'CACHE_UPDATE_FAILED',
                    error: 'No valid assets provided'
                });
                return;
            }

            event.waitUntil(
                caches.open(CACHE_NAME)
                    .then(cache => {
                        const uniqueAssets = [...new Set(assets)]; // Remove duplicates
                        console.log('Service Worker: Updating cache with', uniqueAssets.length, 'assets');
                        return Promise.all(
                            uniqueAssets.map(asset => {
                                return cache.match(asset)
                                    .then(cached => {
                                        if (!cached) {
                                            return fetch(asset, { cache: 'no-store' })
                                                .then(response => {
                                                    if (!response.ok) {
                                                        throw new Error(`Failed to fetch ${asset}: ${response.status}`);
                                                    }
                                                    return cache.put(asset, response);
                                                });
                                        }
                                    })
                                    .catch(err => {
                                        console.error(`Service Worker: Failed to cache ${asset}:`, err);
                                        throw err;
                                    });
                            })
                        );
                    })
                    .then(() => {
                        console.log('Service Worker: Cache update completed');
                        return self.clients.matchAll();
                    })
                    .then(clients => {
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'CACHE_UPDATED',
                                assetsCached: assets.length
                            });
                        });
                    })
                    .catch(err => {
                        console.error('Service Worker: Cache update failed:', err);
                        return self.clients.matchAll().then(clients => {
                            clients.forEach(client => {
                                client.postMessage({
                                    type: 'CACHE_UPDATE_FAILED',
                                    error: err.message || 'Unknown error during cache update'
                                });
                            });
                        });
                    })
            );
            break;

        case 'KEEP_ALIVE':
            console.log('Service Worker: Received KEEP_ALIVE message');
            // Keep the Service Worker alive for background audio playback
            event.waitUntil(
                new Promise(resolve => {
                    setTimeout(resolve, 1000); // Minimal delay to keep alive
                })
            );
            break;

        default:
            console.warn('Service Worker: Unknown message type:', event.data.type);
            event.source?.postMessage({
                type: 'UNKNOWN_MESSAGE',
                error: `Unrecognized message type: ${event.data.type}`
            });
            break;
    }
});

// Optional: Handle sync events (for future enhancements)
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync event:', event.tag);
    // Placeholder for future sync functionality (e.g., syncing queued actions)
});