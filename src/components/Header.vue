<template>
  <header class="bg-white border-b border-pink-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <Logo />
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-pink-600 hover:text-pink-700 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="material-icons">
              {{ isMobileMenuOpen ? 'close' : 'menu' }}
            </span>
          </button>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-pink-600 bg-pink-50 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <span class="material-icons mr-2">logout</span>
            Sair
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button
          v-if="isAuthenticated"
          @click="handleLogout"
          class="w-full flex items-center px-3 py-2 text-base font-medium rounded-md text-pink-600 hover:bg-pink-100"
        >
          <span class="material-icons mr-2">logout</span>
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';
import Logo from './Layout/Logo.vue';

const router = useRouter();
const isMobileMenuOpen = ref(false);

const isAuthenticated = computed(() => {
  return authService.isAuthenticated();
});

const handleLogout = async () => {
  try {
    authService.logout();
    router.push('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
</script>
