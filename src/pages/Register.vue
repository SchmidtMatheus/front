<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-pink-600">
          Registro de Casal
        </h2>
        <p class="mt-2 text-center text-sm text-pink-500">
          Crie suas contas para começar
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- NENECO -->
          <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 class="text-lg font-medium text-pink-700 mb-4">NENECO</h3>
            <div class="space-y-4">
              <div>
                <label for="neneco-name" class="block text-sm font-medium text-pink-700">Nome</label>
                <input
                  id="neneco-name"
                  v-model="user1.name"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
              </div>
              <div>
                <label for="neneco-email" class="block text-sm font-medium text-pink-700">Email</label>
                <input
                  id="neneco-email"
                  v-model="user1.email"
                  type="email"
                  required
                  class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
              </div>
              <div>
                <label for="neneco-password" class="block text-sm font-medium text-pink-700">Senha</label>
                <input
                  id="neneco-password"
                  v-model="user1.password"
                  type="password"
                  required
                  class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
              </div>
            </div>
          </div>

          <!-- NENECA -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-medium text-pink-700 mb-4">NENECA</h3>
            <div class="space-y-4">
              <div>
                <label for="neneca-name" class="block text-sm font-medium text-pink-700">Nome</label>
                <input
                  id="neneca-name"
                  v-model="user2.name"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
              </div>
              <div>
                <label for="neneca-email" class="block text-sm font-medium text-pink-700">Email</label>
                <input
                  id="neneca-email"
                  v-model="user2.email"
                  type="email"
                  required
                  class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
              </div>
              <div>
                <label for="neneca-password" class="block text-sm font-medium text-pink-700">Senha</label>
                <input
                  id="neneca-password"
                  v-model="user2.password"
                  type="password"
                  required
                  class="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/axios'

const router = useRouter()
const user1 = ref({
  name: '',
  email: '',
  password: '',
  role: 'NENECO'
})
const user2 = ref({
  name: '',
  email: '',
  password: '',
  role: 'NENECA'
})
const error = ref('')

async function handleRegister() {
  try {
    error.value = ''
    
    // Validar se os emails são diferentes
    if (user1.value.email === user2.value.email) {
      error.value = 'Os emails devem ser diferentes'
      return
    }

    // Enviar dados para o backend
    await api.post('/auth/register', {
      users: [user1.value, user2.value]
    })

    // Redirecionar para o login
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao registrar usuários'
  }
}
</script> 