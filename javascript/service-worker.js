// Service Worker for Danny Hub Music Player
const CACHE_NAME = 'danny-hub-cache-v2'; // Increment version when updating assets
const INITIAL_ASSETS = [
    '/',
    '/index.html',
    '/css_folder/style.css',
    '/javascript/script.js',
    // Add default assets here if needed (e.g., placeholder images)
    '/images/default-cover.jpg'
];

// Install event - Cache initial assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching initial assets');
                return cache.addAll(INITIAL_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Installed successfully');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => console.error('[Service Worker] Install failed:', error))
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (name !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', name);
                            return caches.delete(name);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activated');
                return self.clients.claim(); // Take control immediately
            })
            .catch((error) => console.error('[Service Worker] Activation failed:', error))
    );
});

// Fetch event - Serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Skip caching for non-GET requests or external resources
    if (event.request.method !== 'GET' || !requestUrl.origin === self.location.origin) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if available
                if (response) {
                    console.log('[Service Worker] Serving from cache:', requestUrl.pathname);
                    return response;
                }

                // Fetch from network if not in cache
                console.log('[Service Worker] Fetching from network:', requestUrl.pathname);
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Clone the response since it can only be consumed once
                        const responseToCache = networkResponse.clone();

                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                                console.log('[Service Worker] Cached new asset:', requestUrl.pathname);
                            })
                            .catch((error) => console.error('[Service Worker] Cache put failed:', error));

                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                        // Fallback for offline HTML page (customize as needed)
                        if (requestUrl.pathname === '/index.html') {
                            return caches.match('/index.html');
                        }
                        // Fallback for audio files (optional: return a default audio or error)
                        if (requestUrl.pathname.startsWith('/songs/')) {
                            return new Response('Offline: Audio unavailable', {
                                status: 503,
                                statusText: 'Service Unavailable'
                            });
                        }
                        // Fallback for images (optional: return default image)
                        if (requestUrl.pathname.startsWith('/images/')) {
                            return caches.match('/images/default-cover.jpg');
                        }
                    });
            })
    );
});

// Message event - Handle cache updates from the main script
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        const assetsToCache = event.data.assets || [];
        console.log('[Service Worker] Received cache update request with assets:', assetsToCache);

        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    const cachePromises = assetsToCache.map((asset) => {
                        return fetch(asset, { method: 'HEAD' })
                            .then((response) => {
                                if (!response.ok) {
                                    console.warn('[Service Worker] Asset unavailable, skipping:', asset);
                                    return Promise.resolve(); // Skip if HEAD fails
                                }
                                return cache.match(asset)
                                    .then((cachedResponse) => {
                                        if (!cachedResponse) {
                                            console.log('[Service Worker] Adding new asset to cache:', asset);
                                            return fetch(asset)
                                                .then((fetchResponse) => {
                                                    return cache.put(asset, fetchResponse);
                                                });
                                        } else {
                                            console.log('[Service Worker] Asset already cached:', asset);
                                            return Promise.resolve();
                                        }
                                    });
                            })
                            .catch((error) => {
                                console.error('[Service Worker] Failed to cache asset:', asset, error);
                                return Promise.resolve(); // Continue with other assets
                            });
                    });

                    return Promise.all(cachePromises)
                        .then(() => {
                            console.log('[Service Worker] Cache update completed');
                            // Notify clients of successful update
                            self.clients.matchAll().then((clients) => {
                                clients.forEach((client) =>
                                    client.postMessage({ type: 'CACHE_UPDATED' })
                                );
                            });
                        });
                })
                .catch((error) => console.error('[Service Worker] Cache update failed:', error))
        );
    }
});