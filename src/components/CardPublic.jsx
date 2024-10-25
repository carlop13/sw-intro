import React from 'react';

const CardPublic = ({ publicacion }) => {
  const { name, author, createdAt, review } = publicacion;

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Descripción: {review}</p>
      <p>Autor: {author}</p>
      <p>Fecha de creación: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default CardPublic;
