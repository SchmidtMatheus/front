import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Gallery from '../pages/Gallery.vue'
import Reminders from '../pages/Reminders.vue'
import ShoppingList from '../pages/ShoppingList.vue'
import ImportantDates from '../pages/ImportantDates.vue'
import MainLayout from '../components/Layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'gallery',
          component: Gallery
        },
        {
          path: 'reminders',
          name: 'reminders',
          component: Reminders
        },
        {
          path: 'shopping-list',
          name: 'shopping-list',
          component: ShoppingList
        },
        {
          path: 'important-dates',
          name: 'important-dates',
          component: ImportantDates
        }
      ]
    }
  ]
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (!to.meta.requiresAuth && token) {
    next('/')
  } else {
    next()
  }
})

export default router
