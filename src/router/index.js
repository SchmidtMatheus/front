import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Gallery from '../pages/Gallery.vue'
import Reminders from '../pages/Reminders.vue'
import ShoppingList from '../pages/ShoppingList.vue'
import ImportantDates from '../pages/ImportantDates.vue'
import MainLayout from '../components/Layout/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import CollectionPage from '../pages/CollectionPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: false }
  },
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
        path: 'gallery',
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
      },
      {
        path: 'collection/:id',
        name: 'collection-details',
        component: CollectionPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/') // Vai para HomePage se não autenticado
  } else if (!to.meta.requiresAuth && token && to.path === '/') {
    next('/gallery') // Usuário autenticado indo para HomePage, redireciona para galeria
  } else {
    next()
  }
})

export default router
