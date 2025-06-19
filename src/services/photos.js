import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getPhotosByCollection(collectionId) {
  const response = await axios.get(`${API_URL}/photos/collection/${collectionId}`);
  return response.data;
}

export async function uploadPhoto({ url, description, collectionId }) {
  const response = await axios.post(`${API_URL}/photos`, {
    url,
    description,
    collectionId
  });
  return response.data;
}
