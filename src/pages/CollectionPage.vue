<template>
  <div class="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div v-if="loading" class="flex flex-col items-center justify-center py-10">
        <span class="material-icons animate-spin text-pink-400 text-5xl mb-2">autorenew</span>
        <span class="text-pink-400">Carregando...</span>
      </div>
      <div v-else>
        <div class="flex flex-row items-start md:items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <div v-if="editing">
              <input v-model="editName" class="text-3xl font-bold text-pink-600 mb-1 bg-pink-50 border-b-2 border-pink-200 focus:outline-none focus:border-pink-500 w-full" />
              <textarea v-model="editDescription" rows="2" class="text-pink-500 text-base md:text-lg bg-pink-50 border-b-2 border-pink-200 focus:outline-none focus:border-pink-500 w-full resize-none mt-2" />
              <div class="flex gap-2 mt-2">
                <button @click="saveEdit" class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded shadow font-semibold">Salvar</button>
                <button @click="cancelEdit" class="bg-gray-100 hover:bg-gray-200 text-pink-600 px-4 py-1 rounded shadow">Cancelar</button>
              </div>
            </div>
            <div v-else>
              <h1 class="text-3xl font-bold text-pink-600 mb-1 inline-block">{{ collection.name }}</h1>
              <button @click="startEdit" class="ml-2 text-pink-400 hover:text-pink-600 align-middle" title="Editar">
                <span class="material-icons text-base">edit</span>
              </button>
              <p class="text-pink-500 text-base md:text-lg">{{ collection.description || 'Sem descrição.' }}</p>
            </div>
          </div>
          <button v-if="!editing" @click="showAddPhotoModal = true"
            class="hidden md:inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 active:scale-95 self-start md:self-auto">
            <span class="material-icons">add_a_photo</span>
            <span class="hidden md:inline">Adicionar Fotos</span>
          </button>
        </div>
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
    <button v-if="!editing" @click="showAddPhotoModal = true"
      class="fixed bottom-20 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl md:hidden focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 transition-all">
      <span class="material-icons">add_a_photo</span>
    </button>
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
console.log('CollectionPage - collectionId:', collectionId);

const collection = ref({})
const loading = ref(true)
const showAddPhotoModal = ref(false)
const refreshKey = ref(0)

const editing = ref(false)
const editName = ref('')
const editDescription = ref('')

onMounted(async () => {
  loading.value = true
  try {
    collection.value = await collectionService.getCollection(collectionId)
    console.log('CollectionPage - collection loaded:', collection.value);
  } catch (e) {
    console.error('Error loading collection:', e);
    collection.value = { name: 'Coleção não encontrada', description: '' }
  }
  loading.value = false
})

function onPhotoUploaded() {
  refreshKey.value++
  showAddPhotoModal.value = false
}

function startEdit() {
  editName.value = collection.value.name
  editDescription.value = collection.value.description
  editing.value = true
}

function cancelEdit() {
  editing.value = false
}

async function saveEdit() {
  try {
    const updated = await collectionService.updateCollection(collectionId, {
      name: editName.value,
      description: editDescription.value
    })
    collection.value = updated
    editing.value = false
  } catch (e) {
    alert('Erro ao salvar alterações')
  }
}
</script>
