<template>
  <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <div v-for="photo in photos" :key="photo._id"
      class="bg-white rounded-xl shadow-lg p-0 flex flex-col items-center cursor-pointer polaroid-card transition-transform hover:-translate-y-2 hover:shadow-2xl active:scale-95 relative group"
      @click="openModal(photo)"
      @touchstart="handleTouchStart(photo._id)"
      @touchend="handleTouchEnd"
      :class="{ 'polaroid-tap': touching === photo._id }"
    >
      <!-- Ações da foto: só aparecem em desktop (hover/focus) ou se long-press no mobile -->
      <div class="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
        :class="{ '!opacity-100': isMobile && showDeleteId === photo._id }"
        @click.stop>
        <!-- Botão de definir como capa -->
        <button
          v-if="(!isMobile && (!deletingId || deletingId !== photo._id)) || (isMobile && showDeleteId === photo._id)"
          @click.stop="setCover(photo._id)"
          class="bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-all focus:outline-none"
          title="Definir como capa da coleção"
        >
          <span class="material-icons text-lg">image</span>
        </button>
        <!-- Botão de deletar -->
        <button
          v-if="(!isMobile && (!deletingId || deletingId !== photo._id)) || (isMobile && showDeleteId === photo._id)"
          @click.stop="confirmDelete(photo._id)"
          class="bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-all focus:outline-none"
          title="Excluir foto"
        >
          <span class="material-icons text-lg">delete</span>
        </button>
      </div>

      <!-- Confirmação de exclusão -->
      <div v-if="deletingId === photo._id" class="absolute top-2 right-2 z-20 flex flex-col items-end">
        <div class="bg-white p-2 rounded shadow text-xs text-gray-700 mb-1">Confirmar?</div>
        <div class="flex gap-1">
          <button @click.stop="deletePhotoById(photo._id)" class="bg-pink-600 hover:bg-pink-700 text-white px-2 py-1 rounded text-xs">Sim</button>
          <button @click.stop="deletingId = null" class="bg-gray-100 hover:bg-gray-200 text-pink-600 px-2 py-1 rounded text-xs">Não</button>
        </div>
      </div>

      <!-- Indicador de foto de capa -->
      <div v-if="collection && collection.coverPhotoId && photo._id === collection.coverPhotoId._id" class="absolute top-2 left-2 z-10 bg-white bg-opacity-80 rounded-full p-1 shadow text-pink-600">
        <span class="material-icons text-lg">star</span>
      </div>

      <div class="w-full flex justify-center relative">
        <img :src="photo.url" :alt="photo.title" class="rounded-t-xl object-cover max-h-64 w-full polaroid-img" />
        <div class="md:hidden absolute inset-0 flex items-end justify-center pointer-events-none">
          <div class="bg-black bg-opacity-30 text-white text-xs rounded-b-xl px-2 py-1 mb-2 handwriting-mobile select-none">
            Toque para ampliar
          </div>
        </div>
      </div>
      <div class="w-full px-4 py-3 bg-white rounded-b-xl border-t border-pink-100">
        <p class="text-pink-700 text-base handwriting text-center break-words min-h-[2.5rem]">{{ photo.description || 'Sem descrição' }}</p>
      </div>
    </div>
    <PhotoModal v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getPhotosByCollection, deletePhoto } from '../services/photos'
import { collectionService } from '../services/collections'
import PhotoModal from './PhotoModal.vue'

const props = defineProps({
  collectionId: {
    type: String,
    required: true
  },
  refreshKey: { type: [String, Number], default: 0 }
})

const photos = ref([])
const selectedPhoto = ref(null)
const deletingId = ref(null)
const touching = ref(null)
const showDeleteId = ref(null)
const collection = ref(null)
let touchTimeout = null

const isMobile = computed(() => window.innerWidth < 768)

const openModal = (photo) => {
  selectedPhoto.value = photo
}

async function loadPhotos() {
  if (!props.collectionId) return;
  photos.value = await getPhotosByCollection(props.collectionId)
  collection.value = await collectionService.getCollection(props.collectionId)
}

onMounted(() => {
  loadPhotos()
  window.addEventListener('resize', handleResize)
})

watch(() => props.refreshKey, loadPhotos)

function confirmDelete(id) {
  deletingId.value = id
  showDeleteId.value = null
}

async function deletePhotoById(id) {
  try {
    await deletePhoto(id)
    await loadPhotos()
    deletingId.value = null
  } catch (e) {
    alert('Erro ao excluir foto')
    deletingId.value = null
  }
}

async function setCover(photoId) {
  try {
    await collectionService.setCoverPhoto(props.collectionId, photoId)
    await loadPhotos()
  } catch (e) {
    alert('Erro ao definir foto como capa')
  }
}

function handleTouchStart(id) {
  touching.value = id
  if (isMobile.value) {
    touchTimeout = setTimeout(() => {
      showDeleteId.value = id
    }, 500)
  }
}

function handleTouchEnd() {
  touching.value = null
  if (isMobile.value) {
    clearTimeout(touchTimeout)
    touchTimeout = null
    setTimeout(() => {
      showDeleteId.value = null
    }, 1200)
  }
}

function handleResize() {
  // trigger reactivity
  touching.value = null
  showDeleteId.value = null
}
</script>

<style scoped>
.polaroid-card {
  box-shadow: 0 8px 24px 0 rgba(0,0,0,0.10), 0 1.5px 3px 0 rgba(0,0,0,0.08);
  border-bottom: 24px solid #fff;
  border-radius: 18px;
  background: #fff;
  min-height: 260px;
  position: relative;
}
.polaroid-img {
  border-radius: 18px 18px 0 0;
  object-fit: cover;
  width: 100%;
  max-height: 260px;
  background: #f9fafb;
}
.handwriting {
  font-family: 'Pacifico', 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}
.handwriting-mobile {
  font-family: 'Pacifico', 'Comic Sans MS', cursive, sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.15);
}
.polaroid-tap {
  filter: brightness(0.92) drop-shadow(0 0 0.5rem #f472b6);
  border-color: #f472b6;
}
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
