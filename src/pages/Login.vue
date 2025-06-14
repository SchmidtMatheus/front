<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-pink-600">
          Login
        </h2>
        <p class="mt-2 text-center text-sm text-pink-500">
          Entre com suas credenciais
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-pink-300 placeholder-pink-500 text-pink-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-pink-300 placeholder-pink-500 text-pink-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
            >
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
            Entrar
          </button>
        </div>

        <div class="text-center">
          <router-link to="/register" class="text-pink-600 hover:text-pink-500">
            Não tem uma conta? Registre-se
          </router-link>
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
const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    error.value = ''
    
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    // Salvar token e dados do usuário
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao fazer login'
  }
}
</script> 