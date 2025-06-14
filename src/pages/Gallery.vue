<template>
  <div class="p-4 md:p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-pink-600">Galeria</h1>
        <button 
          @click="handleLogout"
          class="md:hidden flex items-center gap-2 text-pink-600 hover:text-pink-700"
        >
          <span class="material-icons">logout</span>
          <span>Sair</span>
        </button>
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-pink-600 mb-2">Nossas Memórias</h1>
      <p class="text-gray-600 mb-6">Capturem e guardem seus momentos especiais juntos</p>

      <!-- Collections Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="i in 6" 
          :key="i"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer border border-pink-100"
        >
          <div class="aspect-square bg-pink-50 rounded-lg mb-3 flex items-center justify-center">
            <span class="material-icons text-4xl text-pink-300">photo_library</span>
          </div>
          <h3 class="font-medium text-pink-600">Nossos Momentos Especiais</h3>
          <p class="text-sm text-gray-500">Coleção {{ i }}</p>
          <p class="text-xs text-pink-400 mt-1">{{ Math.floor(Math.random() * 20) + 1 }} memórias</p>
        </div>
      </div>

      <!-- Add New Collection Button -->
      <button 
        class="fixed bottom-20 md:bottom-6 right-6 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
        @click="showAddModal = true"
      >
        <span class="material-icons">add_photo_alternate</span>
      </button>

      <!-- Add Collection Modal -->
      <Modal v-if="showAddModal" @close="showAddModal = false">
        <template #header>
          <h3 class="text-lg font-medium text-pink-600">Nova Coleção</h3>
        </template>
        <template #default>
          <form @submit.prevent="addCollection" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Coleção</label>
              <input 
                type="text" 
                v-model="newCollection.name"
                class="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Ex: Nosso Primeiro Encontro"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea 
                v-model="newCollection.description"
                class="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows="3"
                placeholder="Conte um pouco sobre esta coleção..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-pink-200 border-dashed rounded-lg">
                <div class="space-y-1 text-center">
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                    >
                      <span>Upload uma imagem</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        class="sr-only"
                        accept="image/*"
                        @change="handleFileUpload"
                        required
                      >
                    </label>
                    <p class="pl-1">ou arraste e solte</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF até 10MB
                  </p>
                </div>
              </div>
            </div>
          </form>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-3">
            <button 
              @click="showAddModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              @click="addCollection"
              class="px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors"
            >
              Criar Coleção
            </button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../components/Modal.vue'
import authService from '../services/auth.service'
const router = useRouter()

const showAddModal = ref(false)
const newCollection = ref({
  name: '',
  description: '',
  coverUrl: ''
})

const handleLogout = () => {
  authService.logout()
  router.push('/login')
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // TODO: Implement file upload to get URL
    // For now, we'll use a placeholder
    newCollection.value.coverUrl = URL.createObjectURL(file)
  }
}

const addCollection = () => {
  // TODO: Implement collection creation with API
  showAddModal.value = false
  newCollection.value = {
    name: '',
    description: '',
    coverUrl: ''
  }
}
</script> 