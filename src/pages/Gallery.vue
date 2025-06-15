<template>
 <div class="min-h-screen pb-8 px-4"> 
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-pink-600">Galeria</h1>
      <div class="flex gap-4">
        <button @click="showAddModal = true"
          class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Nova Coleção
        </button>
        <button @click="handleLogout" class="md:hidden flex items-center gap-2 text-pink-600 hover:text-pink-700">
          <span class="material-icons">logout</span>
          <span>Sair</span>
        </button>
      </div>
    </div>

    <!-- Coleções -->
    <div v-if="collections.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="collection in collections" :key="collection._id"
        class="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
        <div class="w-full aspect-video bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          <img v-if="collection.coverPhotoUrl" :src="collection.coverPhotoUrl" alt="Capa da coleção"
            class="h-full w-auto object-contain" />
          <Logo v-else />
        </div>
        <h2 class="text-lg font-semibold text-gray-700 mt-2 truncate">{{ collection.name }}</h2>
        <p class="text-xs text-pink-500 mt-1 line-clamp-2">
          {{ collection.description || 'Sem descrição.' }}
        </p>
      </div>
    </div>


    <!-- Sem coleções -->
    <div v-else class="text-center mt-16">
      <p class="text-md text-pink-600">Capturem e guardem seus momentos especiais juntos.</p>
      <p class="text-sm mt-2 text-pink-500">Clique em "Nova Coleção" para começar.</p>
    </div>

    <!-- Modal -->
    <Modal v-model="showAddModal">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Nova Coleção</h2>
      <AddCollectionForm @cancel="showAddModal = false" @created="() => { showAddModal = false; loadCollections() }" />
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AddCollectionForm from '../components/Collections/AddCollectionForm.vue'
import Logo from '../components/Layout/Logo.vue'
import Modal from '../components/Modal.vue'
import { authService } from '../services/auth.service'
import { collectionService } from '../services/collections.js'

const router = useRouter()

const showAddModal = ref(false)
const newCollection = ref({ name: '', description: '' })
const selectedFile = ref(null)
const collections = ref([])
const isSubmitting = ref(false)

const loadCollections = async () => {
  try {
    collections.value = await collectionService.listCollections()
  } catch (error) {
    alert('Erro ao carregar coleções')
    console.error(error)
  }
}

onMounted(loadCollections)

const handleLogout = () => {
  authService.logout()
  router.push('/login')
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const maxSizeMB = 10
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Imagem deve ter no máximo ${maxSizeMB}MB.`)
      selectedFile.value = null
      return
    }
    selectedFile.value = file
  }
}

const addCollection = async () => {
  if (!selectedFile.value || !newCollection.value.name) {
    alert('Preencha o nome e selecione um arquivo.')
    return
  }

  if (!selectedFile.value) {
    alert('Selecione uma imagem de capa antes de criar.')
    return
  }

  isSubmitting.value = true

  try {
    await collectionService.createCollection({
      name: newCollection.value.name,
      description: newCollection.value.description,
      file: selectedFile.value
    })

    await loadCollections()

    newCollection.value = { name: '', description: '' }
    selectedFile.value = null
    showAddModal.value = false
  } catch (error) {
    alert('Erro ao criar coleção.')
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
