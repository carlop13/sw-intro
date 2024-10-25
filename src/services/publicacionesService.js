import { API_URL } from '../utils/constans';

export const getPublicaciones = async () => {
  const response = await fetch(`${API_URL}/books`);
  return await response.json();
};

export const getPublicacionById = async (id) => {
  const response = await fetch(`${API_URL}/books/${id}`);
  return await response.json();
};

export const createPost = async (publicacion) => {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(publicacion)
  });

  if (!response.ok) {
    throw new Error('Error al crear publicacion');
  }

  return await response.json();
};
