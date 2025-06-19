<template>
  <div class="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div v-if="loading" class="flex flex-col items-center justify-center py-10">
        <span class="material-icons animate-spin text-pink-400 text-5xl mb-2">autorenew</span>
        <span class="text-pink-400">Carregando...</span>
      </div>
      <div v-else>
        <h1 class="text-3xl font-bold text-pink-600 mb-2">{{ collection.name }}</h1>
        <p class="text-pink-500 mb-6">{{ collection.description || 'Sem descrição.' }}</p>
        <button @click="showAddPhotoModal = true"
          class="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-pink-300 active:scale-95">
          <span class="material-icons">add_a_photo</span>
          Adicionar Fotos
        </button>
        <PhotoGallery :collectionId="collectionId" :refreshKey="refreshKey" />
      </div>
    </div>
    <Modal v-model="showAddPhotoModal">
      <div class="p-4 text-center">
        <h2 class="text-xl font-bold text-pink-600 mb-4">Adicionar Fotos à Coleção</h2>
        <PhotoUpload :collectionId="collectionId" @uploaded="onPhotoUploaded" />
        <button @click="showAddPhotoModal = false" class="mt-6 px-6 py-2 rounded bg-pink-100 text-pink-600 hover:bg-pink-200">Fechar</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { collectionService } from '../services/collections'
import PhotoGallery from '../components/PhotoGallery.vue'
import Modal from '../components/Modal.vue'
import PhotoUpload from '../components/PhotoUpload.vue'

const route = useRoute()
const collectionId = route.params.id
const collection = ref({})
const loading = ref(true)
const showAddPhotoModal = ref(false)
const refreshKey = ref(0)

onMounted(async () => {
  loading.value = true
  try {
    collection.value = await collectionService.getCollection(collectionId)
  } catch (e) {
    collection.value = { name: 'Coleção não encontrada', description: '' }
  }
  loading.value = false
})

function onPhotoUploaded() {
  refreshKey.value++
  showAddPhotoModal.value = false
}
</script>
