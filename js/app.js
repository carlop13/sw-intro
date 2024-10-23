if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(error => console.error('Error al registrar el Service Worker', error));
}
