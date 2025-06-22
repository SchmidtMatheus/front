import api from "./axios";

export const collectionService = {
  async createCollection(data: { name: string; description?: string }) {
    const response = await api.post('/collections', data);
    return response.data;
  },

  async listCollections() {
    const response = await api.get('/collections');
    return response.data;
  },

  async getCollection(id: string) {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  },

  async updateCollection(id: string, data: { name?: string; description?: string }) {
    const response = await api.put(`/collections/${id}`, data);
    return response.data;
  },

  async setCoverPhoto(collectionId: string, photoId: string) {
    const response = await api.put(`/collections/${collectionId}/cover/${photoId}`);
    return response.data;
  },
}; 