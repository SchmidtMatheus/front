<template>
    <!-- Mobile Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 md:hidden">
      <div class="flex justify-arround items-center h-16">
        <router-link to="/" class="flex flex-col items-center justify-center py-2 pl-3 w-full" :class="[$route.path === '/' ? 'text-pink-600' : 'text-pink-400']">
          <span class="material-icons text-base leading-none">{{ 'photo_library' }}</span>
          <span class="text-xs mt-1">Galeria</span>
        </router-link>
        <router-link to="/reminders" class="flex flex-col items-center justify-center py-2 pr-3 w-full" :class="[$route.path === '/reminders' ? 'text-pink-600' : 'text-pink-400']">
          <span class="material-icons text-base leading-none">{{ 'favorite' }}</span>
          <span class="text-xs mt-1">Lembretes</span>
        </router-link>
        <router-link to="/shopping-list" class="flex flex-col items-center justify-center py-2 pr-3 w-full" :class="[$route.path === '/shopping-list' ? 'text-pink-600' : 'text-pink-400']">
          <span class="material-icons text-base leading-none">{{ "shopping_cart" }}</span>
          <span class="text-xs mt-1">Lista de Compras</span>
        </router-link>
        <router-link to="/important-dates" class="flex flex-col items-center justify-center py-2 pr-3 w-full" :class="[$route.path === '/important-dates' ? 'text-pink-600' : 'text-pink-400']">
          <span class="material-icons text-base leading-none">{{ 'calendar_month' }}</span>
          <span class="text-xs mt-1">Datas</span>
        </router-link>
      </div>
    </nav>
  
    <!-- Desktop Sidebar -->
    <aside 
      :class="[
        'hidden md:block fixed left-0 top-0 h-full bg-gradient-to-b from-pink-50 to-white text-pink-800 transition-all duration-300 border-r border-pink-100',
        isExpanded ? 'w-64' : 'w-20'
      ]"
    >
      <div class="flex flex-col h-full">
        <div class="p-4">
          <div class="flex items-center justify-between mb-8">
            <h1 v-if="isExpanded" class="text-2xl font-bold text-pink-600">Love Photos</h1>
            <button @click="toggleSidebar" class="p-2 hover:bg-pink-100 rounded-lg transition-colors">
              <span class="material-icons">
                {{ isExpanded ? 'chevron_left' : 'chevron_right' }}
              </span>
            </button>
          </div>
          <nav>
            <ul class="space-y-2">
              <li>
                <router-link 
                  to="/" 
                  class="flex items-center justify-center p-3 rounded-lg transition-colors"
                  :class="[$route.path === '/' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-100 text-pink-800']"
                >
                <span class="material-icons text-base leading-none">{{ 'photo_library' }}</span>
                  <span v-if="isExpanded" class="ml-3 transition-opacity duration-200 opacity-100 whitespace-nowrap">Galeria</span>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/reminders" 
                  class="flex items-center justify-center p-3 rounded-lg transition-colors"
                  :class="[$route.path === '/reminders' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-100 text-pink-800']"
                >
                  <span class="material-icons text-base leading-none">{{ 'favorite' }}</span>
                  <span v-if="isExpanded" class="ml-3 transition-opacity duration-200 opacity-100 whitespace-nowrap">Lembretes</span>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/shopping-list" 
                  class="flex items-center justify-center p-3 rounded-lg transition-colors"
                  :class="[$route.path === '/shopping-list' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-100 text-pink-800']"
                >
                  <span class="material-icons text-base leading-none">{{ 'shopping_cart' }}</span>
                  <span v-if="isExpanded" class="ml-3 transition-opacity duration-200 opacity-100 whitespace-nowrap">Lista de Compras</span>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/important-dates" 
                  class="flex items-center justify-center p-3 rounded-lg transition-colors"
                  :class="[$route.path === '/important-dates' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-100 text-pink-800']"
                >
                  <span class="material-icons text-base leading-none">{{ 'calendar_month' }}</span>
                  <span v-if="isExpanded" class="ml-3 transition-opacity duration-200 opacity-100 whitespace-nowrap">Datas Especiais</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="mt-auto p-4 border-t border-pink-100">
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center p-3 rounded-lg transition-colors hover:bg-pink-100 text-pink-800"
          >
            <span class="material-icons text-base leading-none">logout</span>
            <span v-if="isExpanded" class="ml-3 transition-opacity duration-200 opacity-100 whitespace-nowrap">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import authService from '../../services/auth.service'
  
  const router = useRouter()
  const isExpanded = ref(true)
  
  const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value
  }
  
  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }
  </script>
  
  <style scoped>
  /* Comentado ou removido se causar interferência */
  /* .router-link-active {
    color: inherit !important;
  } */
  </style>
 