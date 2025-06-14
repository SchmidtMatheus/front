import api from './axios'

const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async register(users: any[]) {
    const response = await api.post('/auth/register', { users })
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken() {
    return localStorage.getItem('token')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

export default authService 