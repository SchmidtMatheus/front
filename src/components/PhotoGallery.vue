
<template>
  <div class="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <div v-for="photo in photos" :key="photo._id" @click="openModal(photo)">
      <img :src="photo.url" :alt="photo.title" class="rounded shadow cursor-pointer" />
    </div>

    <PhotoModal v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPhotosByCollection } from '../services/photos'
import PhotoModal from './PhotoModal.vue'

const props = defineProps({
  collectionId: String
})

const photos = ref([])
const selectedPhoto = ref(null)

const openModal = (photo) => {
  selectedPhoto.value = photo
}

onMounted(async () => {
  photos.value = await getPhotosByCollection(props.collectionId)
})
</script>
