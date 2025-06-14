<template>
  <div class="p-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input type="text" v-model="title" placeholder="Título" class="w-full border p-2 rounded" />
      <input type="text" v-model="url" placeholder="URL da imagem" class="w-full border p-2 rounded" />
      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const url = ref('')

const handleSubmit = async () => {
  try {
    await api.post('/photos', {
      title: title.value,
      url: url.value
    })
    title.value = ''
    url.value = ''
    showModal.value = false
  } catch (error) {
    alert(error.message || 'Erro ao fazer upload da foto')
  }
}
</script>
