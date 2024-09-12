if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js')
   /* .then(reg=> {
        console.log("Registrado")
    })
    .catch(err => {
        console.log("Falló")
    })*/
}
fetch('https://fakestoreapi.com/products/1')