import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../../src/views/HomePage.vue'
import AboutMe from '../../src/views/AboutMe.vue'
import LoginPage from '../../src/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/me', component: AboutMe},
    { path: '/login', component: LoginPage},
    { path: '/register', component: RegisterPage}
  ],
})

export default router
