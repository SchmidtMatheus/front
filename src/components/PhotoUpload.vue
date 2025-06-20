<template>
  <div class="p-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input type="text" v-model="title" placeholder="Título (opcional)" class="w-full border p-2 rounded focus:ring-pink-500 focus:border-pink-500" />
      <input type="file" @change="handleFileChange" accept="image/*" class="w-full border p-2 rounded focus:ring-pink-500 focus:border-pink-500" />
      <div v-if="preview" class="flex justify-center mb-2">
        <img :src="preview" alt="Preview" class="max-h-40 rounded shadow" />
      </div>
      <button type="submit" :disabled="uploading" class="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition-colors active:scale-95 flex items-center justify-center gap-2">
        <span v-if="uploading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
        <span v-else class="material-icons">cloud_upload</span>
        <span>{{ uploading ? 'Enviando...' : 'Enviar' }}</span>
      </button>
      <div v-if="error" class="text-red-500 text-center mt-2">{{ error }}</div>
      <div v-if="success" class="text-green-600 text-center mt-2">Foto enviada com sucesso!</div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { uploadPhoto } from '../services/photos'

const props = defineProps({
  collectionId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['uploaded'])

const title = ref('')
const url = ref('')
const file = ref(null)
const preview = ref(null)
const uploading = ref(false)
const error = ref('')
const success = ref(false)

function handleFileChange(e) {
  file.value = e.target.files[0] || null
  error.value = ''
  success.value = false
  if (file.value) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      preview.value = ev.target.result
    }
    reader.readAsDataURL(file.value)
  } else {
    preview.value = null
  }
}

watch(url, (val) => {
  if (val) {
    preview.value = val
    file.value = null
  }
})

async function handleSubmit() {
  uploading.value = true
  error.value = ''
  success.value = false
  let imageUrl = url.value

  if (file.value) {
    const formData = new FormData()
    formData.append('file', file.value)
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/images/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      imageUrl = data.imageUrl
    } catch (err) {
      error.value = 'Erro ao enviar imagem.';
      uploading.value = false
      return
    }
  }

  if (!imageUrl) {
    error.value = 'Selecione um arquivo ou informe uma URL.'
    uploading.value = false
    return
  }

  try {
    await uploadPhoto({
      url: imageUrl,
      description: title.value,
      collectionId: props.collectionId
    })
    title.value = ''
    url.value = ''
    file.value = null
    preview.value = null
    success.value = true
    emit('uploaded')
  } catch (err) {
    error.value = err.message || 'Erro ao fazer upload da foto'
  } finally {
    uploading.value = false
  }
}
</script>
