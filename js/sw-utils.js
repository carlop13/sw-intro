//importScripts('/js/sw-bd.js');

const actualizarCacheDinamico = (dynamicCache, req, res) => {
    if (res.ok && req.method === 'GET') {  // Verifica que la solicitud sea GET
        // Verifica que la solicitud no sea de una extensión
        const url = new URL(req.url);
        if (url.protocol !== 'chrome-extension:') {
            return caches.open(dynamicCache).then(cache => {
                cache.put(req, res.clone());
                return res.clone();
            });
        }
    }
    return res;  // Si no es GET o hay algún error, simplemente regresa la respuesta original
};


//cache with networkupdate
const actualizarCacheStatico = (estaticoCache, req, APP_SHELL_INMUTABLE) => {
    if(APP_SHELL_INMUTABLE.includes(req.url)){
        //no hace falta actualizar
    } else {
        return fetch(req)
        .then(res => {
            return actualizarCacheDinamico(estaticoCache,req,res)
        })
    }
}

const manejoApiNotas = (cacheName, req) => {
    if(req.clone().method === 'POST'){
        if(self.registration.sync){
            return req.clone().text().then(body => {
                const bodyObj = JSON.parse(body);
                return guardarNota(bodyObj);
            });
        } else {
            return fetch(req);
        }
    } else {
        return fetch(req).then(resp => {
            if(resp.ok){
                actualizarCacheDinamico(cacheName, req, resp.clone());
                return resp.clone();
            } else {
                return caches.match(req);
            }
        }).catch(err => {
            return caches.match(req);
        });
    }
}