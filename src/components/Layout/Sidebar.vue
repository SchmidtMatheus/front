<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 md:hidden z-10">
    <div class="flex justify-around items-center h-16">
      <router-link to="/" class="flex flex-col items-center justify-center p-2 w-full"
        :class="[$route.path === '/' ? 'text-pink-600' : 'text-pink-400']">
        <span class="material-icons text-base leading-none">{{ 'photo_library' }}</span>
        <span class="text-xs mt-1">Galeria</span>
      </router-link>
      <router-link to="/reminders" class="flex flex-col items-center justify-center p-2 w-full"
        :class="[$route.path === '/reminders' ? 'text-pink-600' : 'text-pink-400']">
        <span class="material-icons text-base leading-none">{{ 'favorite' }}</span>
        <span class="text-xs mt-1">Lembretes</span>
      </router-link>
      <router-link to="/shopping-list" class="flex flex-col items-center justify-center p-2 w-full"
        :class="[$route.path === '/shopping-list' ? 'text-pink-600' : 'text-pink-400']">
        <span class="material-icons text-base leading-none">{{ "shopping_cart" }}</span>
        <span class="text-xs mt-1">Mercado</span>
      </router-link>
      <router-link to="/important-dates" class="flex flex-col items-center justify-center py-2 pr-1 w-full"
        :class="[$route.path === '/important-dates' ? 'text-pink-600' : 'text-pink-400']">
        <span class="material-icons text-base leading-none">{{ 'calendar_month' }}</span>
        <span class="text-xs mt-1">Datas</span>
      </router-link>
    </div>
  </nav>

  <aside :class="[
    'fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-20',
    isExpanded ? 'w-64' : 'w-20',
    'hidden md:block'
  ]">
    <div class="flex flex-col h-full">
      <div class="flex flex-row p-4 border-b justify-between items-center">
        <div class="flex items-center justify-center space-x-2">
          <Logo />
          <span v-if="isExpanded" class="text-lg font-semibold text-pink-600 pl-2">LovePhotos</span>
        </div>
        <button @click="$emit('toggle')" class="rounded-lg hover:border hover:border-pink-600 transition-colors" :class="{
          'ml-5': !isExpanded
        }">
          <span class="material-icons text-gray-600">
            {{ isExpanded ? 'chevron_left' : 'chevron_right' }}
          </span>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-2 px-3">
          <li>
            <router-link to="/" class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'justify-center': !isExpanded }">
              <span class="material-icons text-pink-600">photo_library</span>
              <span v-if="isExpanded" class="ml-3 text-pink-600">
                Galeria
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/important-dates"
              class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'justify-center': !isExpanded }">
              <span class="material-icons text-pink-600">calendar_month</span>
              <span v-if="isExpanded" class="ml-3 text-pink-600">
                Datas Especiais
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/reminders" class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'justify-center': !isExpanded }">
              <span class="material-icons text-pink-600">favorite</span>
              <span v-if="isExpanded" class="ml-3 text-pink-600">
                Lembretes
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/shopping-list"
              class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'justify-center': !isExpanded }">
              <span class="material-icons text-pink-600">shopping_cart</span>
              <span v-if="isExpanded" class="ml-3 text-pink-600">
                Mercado
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center p-3 rounded-lg text-pink-600 hover:bg-gray-100 transition-colors">
          <span class="material-icons">logout</span>
          <span v-if="isExpanded" class="ml-3">Sair</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authService } from '../../services/auth.service'
import Logo from './Logo.vue'

const router = useRouter()

const handleLogout = () => {
  authService.logout()
  router.push('/login')
}

const props = defineProps({
  isExpanded: Boolean
})

const emit = defineEmits(['toggle'])
</script>