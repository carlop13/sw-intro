if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js')
}

if(window.caches) {
    console.log("tenemos cache");
    caches.open('test-1')
    caches.open('test-2')
    //comprobar si existe
    caches.has("test-2").then(console.log)
    //eliminar un cache
    caches.delete("test-1")

    //agregar elementos al cache
    caches.open('test-v1.1').then(cache => {
        //Agregar un elemento al cache
        cache.add("/index.html")
        //Agregar varios elementos al cache
        cache.addAll([
            "/index.html",
            "/offline.html",
            "/vite.config.js"
        ]).then(()=>{
            //Eliminar un elemento del cache se hace después del "then" para que se ejecute después de crearse
            cache.delete("/vite.config.js")
        })
        //comprobar si existe un elemento
        cache.match("/index.html").then(console.log)
        
    })
}