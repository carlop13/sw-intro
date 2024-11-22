/*importScripts('https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js');
importScripts('/js/sw-bd.js');
importScripts('/js/sw-utils.js');
importScripts('firebase-messaging-sw.js');

const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC = 'dynamic-v1';

// Crear una función para limpiar el caché
const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > numberItem) {
                cache.delete(keys[0]).then(() => limpiarCache(cacheName, numberItem));
            }
        });
    });
};

// Evento de instalación para añadir archivos estáticos y offline.html al caché
self.addEventListener('install', (event) => {
    const cacheStatic = caches.open(CACHE_STATIC).then((cache) => {
        return cache.addAll([
            '/', 
            '/index.html',
            '/css/styles.css',
            '/js/app.js',
            '/js/sw-utils.js',
            '/js/sw-bd.js',
            '/sw.js',
            '/vite.svg',
            'src/assets/notFound.PNG'
        ]);
    });

    const cacheInmutable = caches.open(CACHE_INMUTABLE).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js',
            'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js',
            'https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js'
        ]);
    });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', (event) => {
    const cacheCleaned = caches.keys().then((keys) => {
        return Promise.all(
            keys.map((key) => {
                if (key !== CACHE_STATIC && key !== CACHE_INMUTABLE && key !== CACHE_DYNAMIC) {
                    return caches.delete(key);
                }
            })
        );
    });
    event.waitUntil(cacheCleaned);
});


// Estrategia de cache
self.addEventListener('fetch', (event) => {
    let respuesta
    if (event.request.url.includes('https://api-books-omega.vercel.app/books')) {
        respuesta = manejoApiNotas(CACHE_DYNAMIC,event.request)
    } else {
        respuesta = caches.match(event.request).then((response) => {
                if (response){
                    actualizarCacheStatico(CACHE_STATIC, event.request, CACHE_INMUTABLE);
                    return response;
                } else {
                    return fetch(event.request).then(newRes => {
                        return actualizarCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
                    });
                }
            });
    }

    event.respondWith(respuesta);
})


//Tareas asincronas
self.addEventListener('sync', event => {
    if (event.tag === 'nueva-nota') {
        //Cuando se recupera la conexión
        const respuesta = postearNotas();
        event.waitUntil(respuesta);
    }
});
*/

importScripts('https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js');
importScripts('/js/sw-bd.js');
importScripts('/js/sw-utils.js');
importScripts('firebase-messaging-sw.js');

const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC = 'dynamic-v1';

// Crear una función para limpiar el caché
const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > numberItem) {
                cache.delete(keys[0]).then(() => limpiarCache(cacheName, numberItem));
            }
        });
    });
};

// Evento de instalación para añadir archivos estáticos y offline.html al caché
self.addEventListener('install', (event) => {
    const cacheStatic = caches.open(CACHE_STATIC).then((cache) => {
        return cache.addAll([
            '/', 
            '/index.html',
            '/css/styles.css',
            '/js/app.js',
            '/js/sw-utils.js',
            '/js/sw-bd.js',
            '/sw.js',
            '/vite.svg',
            'src/assets/notFound.PNG'
        ]);
    });

    const cacheInmutable = caches.open(CACHE_INMUTABLE).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js',
            'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js',
            'https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js'
        ]);
    });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', (event) => {
    const cacheCleaned = caches.keys().then((keys) => {
        return Promise.all(
            keys.map((key) => {
                if (key !== CACHE_STATIC && key !== CACHE_INMUTABLE && key !== CACHE_DYNAMIC) {
                    return caches.delete(key);
                }
            })
        );
    });
    event.waitUntil(cacheCleaned);
});

// Estrategia de caché con "networkFallback"
self.addEventListener('fetch', (event) => {
    let respuesta;

    if (event.request.url.includes('https://api-books-omega.vercel.app/books')) {
        // Manejo especial para API
        respuesta = manejoApiNotas(CACHE_DYNAMIC, event.request);
    } else {
        // Estrategia networkFallback
        respuesta = fetch(event.request)
            .then((networkResponse) => {
                // Actualizar caché dinámico con la nueva respuesta
                return actualizarCacheDinamico(CACHE_DYNAMIC, event.request, networkResponse);
            })
            .catch(() => {
                // Si la red falla, buscar en el caché
                return caches.match(event.request).then((cacheResponse) => {
                    if (cacheResponse) {
                        return cacheResponse;
                    } else {
                        // Opcional: Retornar un recurso predeterminado (por ejemplo, offline.html o una imagen).
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                    }
                });
            });
    }

    event.respondWith(respuesta);
});

// Tareas asincronas
self.addEventListener('sync', event => {
    if (event.tag === 'nueva-nota') {
        //Cuando se recupera la conexión
        const respuesta = postearNotas();
        event.waitUntil(respuesta);
    }
});
