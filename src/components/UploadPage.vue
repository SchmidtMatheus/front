<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Upload de Fotos</h2>
    <label class="block mb-4">
      <span class="text-gray-700">Selecione fotos</span>
      <input type="file" multiple @change="handleFiles" class="block w-full text-sm text-gray-500 mt-1" />
    </label>
    <div v-if="previews.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      <div v-for="(preview, index) in previews" :key="index" class="overflow-hidden rounded-lg shadow-lg">
        <img :src="preview" alt="" class="w-full h-40 object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const previews = ref([])

const handleFiles = (event) => {
  previews.value = []
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previews.value.push(e.target.result)
    }
    reader.readAsDataURL(files[i])
  }
}
</script>
