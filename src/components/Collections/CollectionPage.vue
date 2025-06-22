<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Galeria</h2>
    <div v-if="loading" class="flex justify-center">
      <p>Carregando...</p>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="photo in collectionPhotos" :key="photo._id" class="cursor-pointer transform hover:scale-105 transition" @click="openModal(photo.url)">
        <div class="overflow-hidden rounded-lg shadow-lg">
          <img :src="photo.url" alt="" class="w-full h-40 object-cover" />
        </div>
      </div>
    </div>

    <div v-if="selectedPhoto" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" @click="selectedPhoto = null">
      <img :src="selectedPhoto" class="max-w-full max-h-full rounded-lg shadow-lg transition-transform transform scale-100 hover:scale-105" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPhotosByCollection } from '../../services/photos'

const route = useRoute()
const selectedPhoto = ref(null)
const collectionPhotos = ref([])
const loading = ref(true)

const collectionId = route.params.id

const loadPhotos = async () => {
  try {
    collectionPhotos.value = await getPhotosByCollection(collectionId)
  } catch (error) {
    console.error('Error loading photos:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadPhotos)

const openModal = (url) => {
  selectedPhoto.value = url
}
</script>
