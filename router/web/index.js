import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import HomePage from '../../src/views/HomePage.vue'
import AboutMe from '../../src/views/AboutMe.vue'
import LoginPage from '../../src/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import { authenticate } from '../../middleware/auth.js'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/me', meta: { requiresAuth: true }, component: AboutMe },
    { path: '/login', component: LoginPage, meta: { guestOnly: true } },
    { path: '/register', component: RegisterPage, meta: { guestOnly: true } },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth && !to.meta.guestOnly) return next()

  console.log('123')

  if(authenticate) console.log('authenticated')

  if (to.meta.requiresAuth) {
    try {
      const res = await axios.get('/api/users/check-auth', {
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(res)
      return
    } catch (error) {
      next('/login')
    }
  } else next()
})

export default router
