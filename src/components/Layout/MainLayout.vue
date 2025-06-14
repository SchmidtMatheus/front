<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-white">
    <Sidebar />
    <main class="md:ml-20 lg:ml-64 p-4 pb-20 md:pb-8 transition-all duration-300">
      <div class="max-w-4xl mx-auto">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
</script> 