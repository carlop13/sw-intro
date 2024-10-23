const cacheStatic = "static-v1";
const cacheDynamic = "dynamic-v1";

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
self.addEventListener("install", event => {
    const cacheEstatico = caches.open(cacheStatic).then(cache => {
        return cache.addAll([
            '/',
            '/login',
            'offline.html',
            'index.html',
            'manifest.json',
            'img/29.png',
            'img/40.png',
            'img/57.png',
            'img/58.png',
            'img/60.png',
            'img/80.png',
            'img/87.png',
            'img/114.png',
            'img/120.png',
            'img/180.png',
            'img/1024.png',
            'src/assets/notFound.PNG'
        ]);
    });
    event.waitUntil(cacheEstatico);
});

// Evento de fetch para manejar las solicitudes y mostrar offline.html cuando no hay conexión
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.pathname === '/login') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match('/offline.html');
            })
        );
    } else {
        // Caché con fallback a la red para otras rutas
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request).then(newResponse => {
                    return caches.open(cacheDynamic).then(cache => {
                        cache.put(event.request, newResponse.clone());
                        limpiarCache(cacheDynamic, 20); // Limpiar caché dinámico
                        return newResponse;
                    });
                }).catch(() => {
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/offline.html');
                    }
                });
            })
        );
    }
});
