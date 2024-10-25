const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
importScripts('/js/sw-utils.js');

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
            'manifest.json',
            'offline.html',
            '/js/sw-utils.js',
            'src/assets/notFound.PNG'
        ]);
    });

    const cacheInmutable = caches.open(CACHE_INMUTABLE).then((cache) => {
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap',
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


// Evento de fetch para manejar las solicitudes y mostrar offline.html cuando no hay conexión
self.addEventListener('fetch', (event) => {
    const response = caches.match(event.request)
        .then((response) => {

            if (response) return response;
        
            return fetch(event.request)
                .then((newRes) => {
                    return actualizarCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
            })
    }).catch((error) => {
        if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
        }
    });

    event.respondWith(response);
});
