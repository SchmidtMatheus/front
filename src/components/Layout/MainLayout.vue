<template>
  <div class="min-h-screen bg-pink-50">
    <div class="flex">
      <Sidebar v-if="isAuthenticated" :isExpanded="isExpanded" @toggle="toggleSidebar" />
      <main class="flex-1 main-content p-0 min-h-screen" :class="[
        isMobile ? 'ml-0' : (isExpanded ? 'ml-64' : 'ml-20')
      ]">
        <div class="p-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { authService } from '../../services/auth.service'
import Sidebar from './Sidebar.vue'

const isAuthenticated = computed(() => authService.isAuthenticated())
const isExpanded = ref(false)
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}
</script>