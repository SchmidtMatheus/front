import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const collectionService = {
  async createCollection({ name, description }) {
    const response = await axios.post(`${API_URL}/collections`, {
      name,
      description,
    });
    return response.data;
  },

  async listCollections() {
    const response = await axios.get(`${API_URL}/collections`);
    return response.data;
  },

  async getCollection(id) {
    const response = await axios.get(`${API_URL}/collections/${id}`);
    return response.data;
  },

  async updateCollection(id, data) {
    const response = await axios.put(`${API_URL}/collections/${id}`, data);
    return response.data;
  },

  async setCoverPhoto(collectionId, photoId) {
    const response = await axios.put(`${API_URL}/collections/${collectionId}/cover/${photoId}`);
    return response.data;
  },


};
