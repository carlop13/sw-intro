self.addEventListener('install', event => {

    //respuesta offline
    const offline = new Response(`
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <h1>Estás offline</h1>
  </body>
</html> `, {
    headers: { 'Content-Type': 'text/html' }
});
        const resp = fetch(event.request)
        .catch(() => offline)

        event.respondWith(resp)
})
