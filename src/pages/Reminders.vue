<template>
  <div>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-pink-600 my-2">Lembretes</h1>
      <p class="text-pink-500">Nunca esqueça os pequenos detalhes que fazem a diferença</p>
    </div>

    <!-- Add Reminder Button -->
    <div class="flex justify-end mb-6">
      <button 
        @click="showModal = true"
        class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
      >
        <span class="material-icons">add</span>
        <span>Novo Lembrete</span>
      </button>
    </div>

    <!-- Reminders List -->
    <div class="space-y-8">
      <!-- Sent Reminders -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-pink-700 mb-4">Lembretes Enviados</h2>
        <div class="space-y-4">
          <div 
            v-for="reminder in sentReminders" 
            :key="reminder._id" 
            class="border-b border-pink-100 pb-4 last:border-0"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-pink-800">{{ reminder.title }}</h3>
                <p class="text-pink-600 mt-1">{{ reminder.description }}</p>
                <p class="text-sm text-pink-400 mt-2">
                  <span class="material-icons text-sm align-middle mr-1">schedule</span>
                  {{ formatDate(reminder.datetime) }}
                </p>
                <p class="text-sm text-pink-400">
                  Para: {{ reminder.destination.name }}
                </p>
              </div>
              <button 
                @click="deleteReminder(reminder._id)" 
                class="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <span class="material-icons">delete_outline</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Received Reminders -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-pink-700 mb-4">Lembretes Recebidos</h2>
        <div class="space-y-4">
          <div 
            v-for="reminder in receivedReminders" 
            :key="reminder._id" 
            class="border-b border-pink-100 pb-4 last:border-0"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-pink-800">{{ reminder.title }}</h3>
                <p class="text-pink-600 mt-1">{{ reminder.description }}</p>
                <p class="text-sm text-pink-400 mt-2">
                  <span class="material-icons text-sm align-middle mr-1">schedule</span>
                  {{ formatDate(reminder.datetime) }}
                </p>
                <p class="text-sm text-pink-400">
                  De: {{ reminder.createdBy.name }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="reminder.isRead" class="text-xs text-pink-400">Lido</span>
                <button 
                  v-else
                  @click="markAsRead(reminder._id)" 
                  class="text-pink-400 hover:text-pink-600 transition-colors"
                >
                  <span class="material-icons">check_circle_outline</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Reminder Modal -->
    <Modal v-model="showModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold text-pink-700 mb-4">Adicionar Lembrete</h2>
        <form @submit.prevent="addReminder" class="space-y-4">
          <div>
            <label class="block text-pink-700 mb-1">Título</label>
            <input 
              type="text" 
              v-model="newReminder.title" 
              required 
              class="w-full rounded border-pink-300 focus:ring-pink-400"
              placeholder="Título do lembrete..."
            >
          </div>
          <div>
            <label class="block text-pink-700 mb-1">Descrição</label>
            <input 
              type="text" 
              v-model="newReminder.description" 
              required 
              class="w-full rounded border-pink-300 focus:ring-pink-400"
              placeholder="Adicione alguns detalhes..."
            >
          </div>
          <div>
            <label class="block text-pink-700 mb-1">Data</label>
            <input 
              type="datetime-local" 
              v-model="newReminder.datetime" 
              required 
              class="w-full rounded border-pink-300 focus:ring-pink-400"
            >
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
const newReminder = ref({
  title: '',
  description: '',
  datetime: '',
})

const sentReminders = ref([])
const receivedReminders = ref([])
const currentUser = ref(null)
const partner = ref(null)

onMounted(async () => {
  try {
    // Get current user from localStorage
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    currentUser.value = JSON.parse(userData)

    // Fetch partner
    try {
      const coupleRes = await api.get('/couples/find')
      const couple = coupleRes.data
      const partnerId = couple.user1 === currentUser.value._id ? couple.user2 : couple.user1
      
      const partnerRes = await api.get(`/users/${partnerId}`)
      partner.value = partnerRes.data
    } catch (error) {
      throw new Error('Não foi possível encontrar seu parceiro. Verifique se você está em um casal.')
    }

    // Fetch reminders
    await loadReminders()
  } catch (error) {
    if (error.response?.status === 401) {
      router.push('/login')
    }
  }
})

async function loadReminders() {
  try {
    const res = await api.get('/reminders')
    sentReminders.value = res.data.sent
    receivedReminders.value = res.data.received
  } catch (error) {
    alert(error.message || 'Erro ao carregar lembretes')
  }
}

async function addReminder() {
  try {
    if (!partner.value) {
      throw new Error('Não foi possível encontrar seu parceiro')
    }

    await api.post('/reminders', {
      ...newReminder.value,
      destination: partner.value._id,
      createdBy: currentUser.value._id
    })
    await loadReminders()
    newReminder.value = {
      title: '',
      description: '',
      datetime: '',
    }
    showModal.value = false
  } catch (error) {
    alert(error.message || 'Erro ao adicionar lembrete')
  }
}

async function deleteReminder(id) {
  try {
    await api.delete(`/reminders/${id}`)
    await loadReminders()
  } catch (error) {
    alert(error.message || 'Erro ao deletar lembrete')
  }
}

async function markAsRead(id) {
  try {
    await api.patch(`/reminders/${id}/read`)
    await loadReminders()
  } catch (error) {
    alert(error.message || 'Erro ao marcar lembrete como lido')
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })
}
</script> 