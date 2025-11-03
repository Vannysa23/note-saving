//Pinia store for auth state
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '../services/authService.js'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  async function checkAuth() {
    isAuthenticated.value = await authService.checkAuth()
    return isAuthenticated.value
  }

  async function login(credentails) {
    const result = await authService.login(credentails)
    if (result.success) {
      await checkAuth
    }
    return result
  }

  async function logout() {
    await authService.logout()
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    user,
    checkAuth,
    login,
    logout,
  }
})
