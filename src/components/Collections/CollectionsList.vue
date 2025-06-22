<template>
  <div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <div v-for="collection in collections" :key="collection._id">
      <router-link :to="'/collection/' + collection._id">
        <img :src="collection.thumbnailUrl" :alt="collection.name" class="rounded shadow" />
        <div class="mt-2 text-center text-sm">{{ collection.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collectionService } from '../../services/collections'

const collections = ref([])

onMounted(async () => {
  try {
    collections.value = await collectionService.listCollections()
  } catch (error) {
    console.error('Error loading collections:', error)
  }
})
</script>
