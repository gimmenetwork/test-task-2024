import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import { isAuthenticated } from '@/helpers/authHelper'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter() {
        if (!isAuthenticated()) router.push('/')
      }
    }
  ]
})

export default router
