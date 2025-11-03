<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { authService } from '../services/authService.js'
import { logout } from '../services/logout.js'

const route = useRoute()
const isAuthenticated = ref(false)

const updateAuthStatus = async () => {
  console.log(route.path)
  if (route.path !== '/login' && route.path !== '/register') {
    isAuthenticated.value = await authService.checkAuth()
  } 
}

const handleLogout = async () => {
  await logout()
  await updateAuthStatus()
}

watch(
  () => route.path,
  async () => {
    await updateAuthStatus()
  }
)
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="container d-flex align-items-center">
        <a class="navbar-brand d-flex" href="/">
          <img src="../../public/logo.png" class="brand-logo" alt="Logo" />
          <h3 class="brand-name ps-2 mb-0">Villiana</h3>
        </a>
        <ul class="d-flex mb-0">
          <button class="btn" type="button">
            <router-link to="/me" class="nav-link active" aria-current="page">About Me</router-link>
          </button>
          <!-- Authenticated User: Show Logout -->
          <div v-if="isAuthenticated" class="has-acc">
            <button class="btn" type="button" @click="handleLogout">
              <span class="nav-link login-btn">Logout</span>
            </button>
          </div>
          <!-- Not Authenticated: Show Login and Register -->
          <div v-else class="no-acc">
            <button class="btn" type="button">
              <router-link to="/register" class="nav-link login-btn">Register</router-link>
            </button>
            <button class="btn" type="button">
              <router-link to="/login" class="nav-link login-btn">Login</router-link>
            </button>
          </div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.brand-logo {
  width: 25px;
  height: 25px;
}
.brand-name {
  font-family: 'Monas';
  color: #fad2e1;
}
.btn {
  border: none !important;
}

.navbar .nav-link {
  text-decoration: none;
  color: #fad2e1;
  transition: all 0.2s ease-in-out;
}
.nav-link:hover {
  color: #fda0c2;
}
.login-btn {
  color: #a4bbfa !important;
  font-weight: 400;
  border: none !important;
}
.login-btn:hover {
  color: #6f95fd !important;
}
</style>
