import api from './axios'

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password })
    const { access_token, user } = response.data
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  async register(users: any[]) {
    const response = await api.post('/auth/register', { users })
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
} 