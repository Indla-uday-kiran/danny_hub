// service-worker.js

// Cache name and version
const CACHE_NAME = 'danny-hub-cache-v1';

// Default assets to cache on install (can be updated dynamically via messages)
const INITIAL_ASSETS = [
    '/',
    '/index.html',
    '/css_folder/style.css',
    '/javascript/script.js'
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

// Fetch event: Serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
    const request = event.request;
    
    // Only cache GET requests
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached response if available
                if (cachedResponse) {
                    // Update cache in the background
                    fetch(request)
                        .then(networkResponse => {
                            if (networkResponse.ok) {
                                caches.open(CACHE_NAME)
                                    .then(cache => cache.put(request, networkResponse.clone()));
                            }
                        })
                        .catch(err => console.error('Background fetch failed:', err));
                    return cachedResponse;
                }

                // Fetch from network and cache if not in cache
                return fetch(request)
                    .then(networkResponse => {
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            })
                            .catch(err => console.error('Cache put failed:', err));
                        return networkResponse;
                    })
                    .catch(err => {
                        console.error('Fetch failed:', err);
                        // Optionally return a fallback page for offline HTML requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        throw err;
                    });
            })
            .catch(err => {
                console.error('Cache match error:', err);
                return new Response('Offline and no cache available', { status: 503 });
            })
    );
});

// Message event: Handle dynamic cache updates from the client
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
                        return Promise.all(
                            uniqueAssets.map(asset => {
                                return cache.match(asset)
                                    .then(cached => {
                                        if (!cached) {
                                            return fetch(asset)
                                                .then(response => {
                                                    if (!response.ok) {
                                                        throw new Error(`Failed to fetch ${asset}`);
                                                    }
                                                    return cache.put(asset, response);
                                                });
                                        }
                                    })
                                    .catch(err => {
                                        console.error(`Failed to cache ${asset}:`, err);
                                        throw err;
                                    });
                            })
                        )
                        .then(() => {
                            console.log('Service Worker: Cache updated with', uniqueAssets.length, 'assets');
                            event.source?.postMessage({
                                type: 'CACHE_UPDATED',
                                assetsCached: uniqueAssets.length
                            });
                        })
                        .catch(err => {
                            console.error('Service Worker: Cache update failed:', err);
                            event.source?.postMessage({
                                type: 'CACHE_UPDATE_FAILED',
                                error: err.message || 'Unknown error during cache update'
                            });
                        });
                    })
                    .catch(err => {
                        console.error('Service Worker: Failed to open cache:', err);
                        event.source?.postMessage({
                            type: 'CACHE_UPDATE_FAILED',
                            error: 'Cache access error'
                        });
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

// Optional: Handle sync events (if you add background sync later)
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync event:', event.tag);
    // Placeholder for future sync functionality
});