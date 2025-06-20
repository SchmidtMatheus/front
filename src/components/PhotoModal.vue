<template>
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white p-4 rounded shadow max-w-md w-full text-center relative">
      <button @click="$emit('close')"
        class="absolute top-3 right-3 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-pink-300 active:scale-95 transition-all"
        title="Fechar"
      >
        <span class="material-icons text-2xl">close</span>
      </button>
      <h2 class="text-lg font-bold mb-2">{{ photo.title }}</h2>
      <img :src="photo.url" :alt="photo.title" class="mb-2 max-w-full max-h-[70vh] mx-auto rounded-lg" />
      <p class="text-sm">{{ photo.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  photo: Object
})
</script>
