
<template>
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white p-4 rounded shadow max-w-md w-full text-center">
      <h2 class="text-lg font-bold mb-2">{{ photo.title }}</h2>
      <img :src="photo.url" :alt="photo.title" class="mb-2" />
      <p class="text-sm">{{ photo.description }}</p>
      <button @click="$emit('close')" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Fechar</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  photo: Object
})
</script>
