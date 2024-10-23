// src/pages/Publicaciones.js
import React, { useState } from 'react';

const Publicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [nuevaPublicacion, setNuevaPublicacion] = useState('');

    const agregarPublicacion = () => {
        setPublicaciones([...publicaciones, nuevaPublicacion]);
        setNuevaPublicacion('');
    };

    return (
        <div>
            <h1>Publicaciones</h1>
            <ul>
                {publicaciones.map((publicacion, index) => (
                    <li key={index}>{publicacion}</li>
                ))}
            </ul>
            <input
                type="text"
                value={nuevaPublicacion}
                onChange={(e) => setNuevaPublicacion(e.target.value)}
                placeholder="Escribe una nueva publicación"
            />
            <button onClick={agregarPublicacion}>Agregar Publicación</button>
        </div>
    );
}

export default Publicaciones;
