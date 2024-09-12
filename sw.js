// Instalacion de Service Worker

self.addEventListener('install', event => {
    //Crea los caches


    console.log('Instalando el Service Worker')

    // Simular un tiempo de instalacion
    const instalacion = new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Termino la instalacion');
            resolve();
            self.skipWaiting()
        }, 3000)
    })

    event.waitUntil(instalacion);
})

//Activacion de Service Worker
self.addEventListener('activate', event =>{
    console.log('Service Worker activado')
})

//Eventos fetch
self.addEventListener('fetch',event => {
    console.log('fetch',event.request.url);
})