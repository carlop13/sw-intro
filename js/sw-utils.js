const actualizarCacheDinamico = (dynamicCache, req, res) => {
    if (res.ok) {
        // Verifica que la solicitud no sea de una extensión
        const url = new URL(req.url);
        if (url.protocol !== 'chrome-extension:') {
            return caches.open(dynamicCache).then(cache => {
                cache.put(req, res.clone());
                return res.clone();
            });
        }
    }
    return res;
};
