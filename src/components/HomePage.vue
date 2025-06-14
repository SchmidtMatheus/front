<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Coleções</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div v-for="collection in collections" :key="collection.id" class="cursor-pointer transform hover:scale-105 transition" @click="goToCollection(collection.id)">
        <div class="overflow-hidden rounded-lg shadow-lg">
          <img :src="collection.coverUrl" alt="" class="w-full h-40 object-cover" />
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
import { collections } from '../services/collections'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCollection = (id) => {
  router.push(`/collection/${id}`)
}
</script>
