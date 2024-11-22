const db = new PouchDB('notas');

const guardarNota = (nota) => {
    nota._id = new Date().toISOString();
    return db.put(nota).then(()=> {
        self.registration.sync.register('nueva-nota');
        const newResp = {ok: true, offline: true};
        return new Response(JSON.stringify(newResp));
    });
}

const postearNotas = () => {
    const notasPost = [];

    return db.allDocs({ include_docs: true}).then(docs => {
        console.log("Se han encontrado libros en IndexDB: ");
        //Recorrer las notas encontradas en IndexDB
        docs.rows.forEach(row => {
            const doc = row.doc;

            console.log("Documento actual:", doc);

            const data = {
                name: doc.name,
                author: doc.author,
                review: doc.review,
            }
            //Enviar las notas a la API
            const fetchProm = fetch('https://api-books-omega.vercel.app/books',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${token}` // Añade el token aquí
                    },
                body: JSON.stringify(data)
            }).then(resp => {
                console.log("Conexión recuperada enviando libros al servidor ...", resp.json());
                //Eliminar notas de indexDB
                return db.remove(doc);
            });
            notasPost.push(fetchProm);
    })
    return Promise.all(notasPost);
});
}