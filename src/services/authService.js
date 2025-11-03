import apiClient from '../api/axios.js'

export const authService = {
  async login(credentials) {
    const res = await apiClient.post('/users/login', credentials)
    return res.data
  },

  async register(userData) {
    const res = await apiClient.post('/users/register', userData)
    return res.data
  },

  async logout() {
    const res = await apiClient.delete('/users/logout')
    return res.data
  },

  async checkAuth() {
    try {
      const res = await apiClient.get('/users/check-auth')
      return res.data.success
    } catch {
      return false
    }
  },
}


