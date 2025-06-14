<template>
  <div>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-pink-600 mb-2">Nossas Datas Especiais</h1>
      <p class="text-pink-500">Lembre-se de todos os momentos especiais juntos</p>
    </div>

    <!-- Add Date Button -->
    <div class="flex justify-end mb-6">
      <button 
        @click="showModal = true"
        class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
      >
        <span class="material-icons">add</span>
        <span>Nova Data</span>
      </button>
    </div>

    <!-- Dates List -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-xl font-semibold text-pink-700 mb-4">Nossas Datas Importantes</h2>
      <div class="space-y-4">
        <div
          v-for="date in importantDates"
          :key="date.id"
          class="border-b border-pink-100 pb-4 last:border-0"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-pink-800">{{ date.description }}</h3>
              <p class="text-sm text-pink-400 mt-2">
                <span class="material-icons text-sm align-middle mr-1">favorite</span>
                {{ formatDate(date.date) }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span 
                  v-for="dest in date.destination" 
                  :key="dest._id"
                  class="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm"
                >
                  {{ dest.name }}
                </span>
              </div>
            </div>
            <button
              @click="removeDate(date.id)"
              class="text-pink-400 hover:text-pink-600 transition-colors"
            >
              <span class="material-icons">delete_outline</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Date Modal -->
    <Modal v-model="showModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold text-pink-700 mb-4">Adicionar Data Especial</h2>
        <form @submit.prevent="addDate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-pink-600">Descrição</label>
            <input
              type="text"
              v-model="newDate.description"
              placeholder="ex: Nosso Aniversário"
              class="mt-1 block w-full rounded-lg border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-pink-600">Data</label>
            <input
              type="date"
              v-model="newDate.date"
              class="mt-1 block w-full rounded-lg border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-pink-700 mb-1">Destinatários</label>
            <div class="relative">
              <input
                type="text"
                v-model="searchTerm"
                @focus="showDropdown = true"
                placeholder="Digite para buscar destinatários"
                class="w-full rounded-lg border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
              <div v-if="showDropdown" class="absolute z-10 w-full mt-1 bg-white border border-pink-200 rounded-lg shadow-lg">
                <div
                  v-for="user in filteredUsers"
                  :key="user._id"
                  @click="toggleUser(user)"
                  class="px-4 py-2 hover:bg-pink-50 cursor-pointer"
                >
                  {{ user.name }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="userId in newDate.destination" 
                :key="userId"
                class="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {{ users.find(u => u._id === userId)?.name }}
                <button 
                  type="button"
                  @click="removeUser(userId)"
                  class="text-pink-400 hover:text-pink-600"
                >
                  <span class="material-icons text-sm">close</span>
                </button>
              </span>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 text-pink-600 hover:text-pink-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../components/Modal.vue'
import api from '../services/axios'

const router = useRouter()
const showModal = ref(false)
const newDate = ref({
  description: '',
  date: '',
  destination: []
})

const importantDates = ref([])
const users = ref([])
const searchTerm = ref('')
const showDropdown = ref(false)

onMounted(async () => {
  try {
    // Get current user from localStorage
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    // Fetch users
    const usersRes = await api.get('/users')
    users.value = usersRes.data

    // Fetch important dates
    await loadDates()
  } catch (error) {
    if (error.response?.status === 401) {
      router.push('/login')
    }
  }
})

async function loadDates() {
  try {
    const res = await api.get('/important-dates')
    importantDates.value = res.data
  } catch (error) {
    alert(error.message || 'Erro ao carregar datas importantes')
  }
}

const filteredUsers = computed(() => {
  return users.value.filter(user => 
    !newDate.value.destination.includes(user._id) &&
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const toggleUser = (user) => {
  if (!newDate.value.destination.includes(user._id)) {
    newDate.value.destination.push(user._id)
  }
  searchTerm.value = ''
  showDropdown.value = false
}

const removeUser = (userId) => {
  newDate.value.destination = newDate.value.destination.filter(id => id !== userId)
}

async function addDate() {
  try {
    if (!newDate.value.description || !newDate.value.date || !newDate.value.destination.length) {
      alert('Preencha todos os campos')
      return
    }

    await api.post('/important-dates', newDate.value)
    await loadDates()
    newDate.value = { description: '', date: '', destination: [] }
    searchTerm.value = ''
    showModal.value = false
  } catch (error) {
    alert(error.message || 'Erro ao adicionar data importante')
  }
}

async function removeDate(id) {
  try {
    await api.delete(`/important-dates/${id}`)
    await loadDates()
  } catch (error) {
    alert(error.message || 'Erro ao remover data importante')
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script> 