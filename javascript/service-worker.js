// service-worker.js

// Cache name with version for easy updates
const CACHE_NAME = 'danny-hub-cache-v2'; // Updated version for cache refresh
const AUDIO_CACHE_NAME = 'danny-hub-audio-cache-v1'; // Separate cache for audio files

// Default assets to cache on install
const INITIAL_ASSETS = [
    '/',
    '/index.html',
    '/css_folder/style.css',
    '/javascript/script.js',
    // Add common fallback assets if needed
    '/images/default-cover.jpg'
];

// Install event: Cache initial assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('Service Worker: Caching initial assets');
                    return cache.addAll(INITIAL_ASSETS);
                }),
            caches.open(AUDIO_CACHE_NAME) // Open audio cache for future use
        ])
        .then(() => {
            console.log('Service Worker: Installation complete');
            return self.skipWaiting(); // Activate immediately
        })
        .catch(err => {
            console.error('Service Worker: Installation failed:', err);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    const cacheWhitelist = [CACHE_NAME, AUDIO_CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => !cacheWhitelist.includes(name))
                        .map(name => {
                            console.log('Service Worker: Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim(); // Take control of clients immediately
            })
            .catch(err => {
                console.error('Service Worker: Activation failed:', err);
            })
    );
});

// Fetch event: Optimized for audio and general resources
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Handle audio files separately for better streaming and caching
    if (request.destination === 'audio') {
        event.respondWith(handleAudioRequest(request, url));
    } else {
        event.respondWith(handleGeneralRequest(request, url));
    }
});

// Handle audio requests with range support and robust caching
async function handleAudioRequest(request, url) {
    try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            console.log(`Service Worker: Serving cached audio: ${url.pathname}`);
            updateCacheInBackground(request, AUDIO_CACHE_NAME); // Update cache asynchronously
            return cachedResponse;
        }

        // Fetch with range support for streaming
        const networkResponse = await fetch(request, {
            cache: 'no-store',
            headers: request.headers // Preserve range requests if present
        });

        if (!networkResponse.ok) {
            console.error(`Service Worker: Audio fetch failed: ${networkResponse.status}`);
            return networkResponse; // Return error response to client
        }

        // Cache the response
        const responseToCache = networkResponse.clone();
        cache.put(request, responseToCache)
            .then(() => console.log(`Service Worker: Cached audio: ${url.pathname}`))
            .catch(err => console.error('Service Worker: Audio cache put failed:', err));

        return networkResponse;
    } catch (err) {
        console.error('Service Worker: Audio fetch error:', err);
        return new Response('Audio unavailable offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Handle general requests (HTML, CSS, JS, images, etc.)
async function handleGeneralRequest(request, url) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            console.log(`Service Worker: Serving cached resource: ${url.pathname}`);
            updateCacheInBackground(request, CACHE_NAME); // Update cache asynchronously
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (!networkResponse.ok) {
            console.error(`Service Worker: Fetch failed: ${networkResponse.status}`);
            return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        cache.put(request, responseToCache)
            .then(() => console.log(`Service Worker: Cached resource: ${url.pathname}`))
            .catch(err => console.error('Service Worker: Cache put failed:', err));

        return networkResponse;
    } catch (err) {
        console.error('Service Worker: Fetch error:', err);
        if (request.mode === 'navigate') {
            return caches.match('/index.html') || new Response('Offline', { status: 503 });
        }
        return new Response('Resource unavailable offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Update cache in the background without blocking response
function updateCacheInBackground(request, cacheName) {
    fetch(request, { cache: 'no-store' })
        .then(networkResponse => {
            if (networkResponse.ok) {
                return caches.open(cacheName)
                    .then(cache => cache.put(request, networkResponse.clone()));
            }
        })
        .catch(err => console.error('Service Worker: Background update failed:', err));
}

// Message event: Handle dynamic cache updates
self.addEventListener('message', (event) => {
    if (!event.data || !event.data.type) return;

    switch (event.data.type) {
        case 'UPDATE_CACHE':
            const assets = event.data.assets || [];
            if (!Array.isArray(assets) || assets.length === 0) {
                postMessageToClients({
                    type: 'CACHE_UPDATE_FAILED',
                    error: 'No valid assets provided'
                });
                return;
            }

            event.waitUntil(
                updateCache(assets)
                    .then(assetsCached => {
                        console.log('Service Worker: Cache update completed');
                        postMessageToClients({
                            type: 'CACHE_UPDATED',
                            assetsCached
                        });
                    })
                    .catch(err => {
                        console.error('Service Worker: Cache update failed:', err);
                        postMessageToClients({
                            type: 'CACHE_UPDATE_FAILED',
                            error: err.message || 'Unknown error during cache update'
                        });
                    })
            );
            break;

        case 'KEEP_ALIVE':
            console.log('Service Worker: Received KEEP_ALIVE');
            event.waitUntil(new Promise(resolve => setTimeout(resolve, 1000)));
            break;

        default:
            console.warn('Service Worker: Unknown message type:', event.data.type);
            postMessageToClients({
                type: 'UNKNOWN_MESSAGE',
                error: `Unrecognized message type: ${event.data.type}`
            });
            break;
    }
});

// Utility to update cache dynamically
async function updateCache(assets) {
    const uniqueAssets = [...new Set(assets)];
    console.log('Service Worker: Updating cache with', uniqueAssets.length, 'assets');

    const audioCache = await caches.open(AUDIO_CACHE_NAME);
    const staticCache = await caches.open(CACHE_NAME);
    let assetsCached = 0;

    await Promise.all(uniqueAssets.map(async asset => {
        const isAudio = asset.endsWith('.mp3') || asset.includes('songs/');
        const targetCache = isAudio ? audioCache : staticCache;

        try {
            const cached = await targetCache.match(asset);
            if (!cached) {
                const response = await fetch(asset, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`Fetch failed for ${asset}: ${response.status}`);
                }
                await targetCache.put(asset, response);
                assetsCached++;
                console.log(`Service Worker: Cached ${asset}`);
            }
        } catch (err) {
            console.error(`Service Worker: Failed to cache ${asset}:`, err);
            throw err; // Re-throw to handle in the outer catch
        }
    }));

    return assetsCached;
}

// Utility to send messages to all clients
function postMessageToClients(message) {
    self.clients.matchAll({ includeUncontrolled: true })
        .then(clients => {
            clients.forEach(client => client.postMessage(message));
        })
        .catch(err => console.error('Service Worker: Failed to post message:', err));
}

// Sync event: Placeholder for future enhancements
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync event:', event.tag);
    // Add sync logic here if needed (e.g., retry failed requests)
});