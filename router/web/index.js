import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../../src/views/HomePage.vue'
import AboutMe from '../../src/views/AboutMe.vue'
import LoginPage from '../../src/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
// import Logout from '../../src/js/logout.js'
import { authService } from '../../src/services/authService.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/me', meta: { requiresAuth: true }, component: AboutMe },
    { path: '/login', component: LoginPage, meta: { guestOnly: true } },
    { path: '/register', component: RegisterPage, meta: { guestOnly: true } },
    // { path: '/logout', meta: { requiresAuth: true }, Logout},

  ],
})

router.beforeEach(async (to, from, next) => {

  // const isAuthenticated = false;

  // console.log(`Navigating to: ${to.path}. Is Authenticated: ${isAuthenticated}`)

  if (to.meta.requiresAuth) {
    const isAuthenticated = await authService.checkAuth();
    if (isAuthenticated) {
      next()
    } else {
      next('/login')
    }
    return
  }



  next()
})


export default router
