<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Coleções</h2>
    <div v-if="loading" class="flex justify-center">
      <p>Carregando...</p>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div v-for="collection in collections" :key="collection._id" class="cursor-pointer transform hover:scale-105 transition" @click="goToCollection(collection._id)">
        <div class="overflow-hidden rounded-lg shadow-lg">
          <img v-if="collection.coverPhotoId && collection.coverPhotoId.url" :src="collection.coverPhotoId.url" alt="" class="w-full h-40 object-cover" />
          <div v-else class="w-full h-40 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-500">Sem foto</span>
          </div>
        </div>
        <p class="mt-2 text-center font-medium">{{ collection.name }}</p>
      </div>
    </div>
    <router-link to="/upload" class="block mt-6 text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow transition">
      Fazer Upload de Fotos
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collectionService } from '../services/collections'
import { useRouter } from 'vue-router'

const router = useRouter()
const collections = ref([])
const loading = ref(true)

const loadCollections = async () => {
  try {
    collections.value = await collectionService.listCollections()
  } catch (error) {
    console.error('Error loading collections:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadCollections)

const goToCollection = (id) => {
  router.push(`/collection/${id}`)
}
</script>
