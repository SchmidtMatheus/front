import api from './axios';

export async function getPhotosByCollection(collectionId: string) {
  const response = await api.get(`/photos/collection/${collectionId}`);
  return response.data;
}

export async function uploadPhoto(data: { url: string, description?: string, collectionId: string }) {
  const response = await api.post('/photos', data);
  return response.data;
}

export async function deletePhoto(photoId: string) {
  const response = await api.delete(`/photos/${photoId}`);
  return response.data;
} 