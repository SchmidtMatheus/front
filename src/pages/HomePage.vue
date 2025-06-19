<template>
  <div class="min-h-screen bg-pink-50 flex flex-col">
    <div class="flex-1 flex flex-col justify-center items-center py-12 px-4">
      <transition name="fade-slide" appear>
        <div class="w-full max-w-3xl text-center mb-10" key="hero">
          <div class="flex justify-center mb-6">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80" alt="Casal feliz" class="rounded-2xl shadow-lg w-40 h-40 object-cover border-4 border-pink-200" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-pink-600 mb-4 drop-shadow">Bem-vindo ao <span class="text-pink-400">Love Photos</span></h1>
          <p class="text-lg md:text-xl text-pink-500 mb-6">Guarde, compartilhe e celebre seus melhores momentos a dois.</p>
          <router-link to="/login" class="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 active:scale-95 text-white px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300">
            <span class="material-icons text-2xl">login</span>
            Entrar agora
          </router-link>
        </div>
      </transition>
      <transition-group name="fade-slide" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mt-2">
        <div
          v-for="card in cards"
          :key="card.title"
          class="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-shadow flex flex-col items-center cursor-pointer group transform hover:-translate-y-1 hover:scale-105 duration-200 border-2 border-transparent hover:border-pink-200 focus:outline-none"
          @click="handleCardClick(card.link)"
        >
          <span class="material-icons text-pink-600 text-4xl mb-4 group-hover:scale-110 transition-transform">{{ card.icon }}</span>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ card.title }}</h2>
          <p class="text-gray-600 mb-4">{{ card.description }}</p>
          <span class="inline-flex items-center text-pink-600 group-hover:text-pink-700 font-medium transition-colors">
            {{ card.cta }}
            <span class="material-icons ml-1">arrow_forward</span>
          </span>
        </div>
      </transition-group>
      <Modal v-model="showLoginModal">
        <div class="text-center p-4">
          <span class="material-icons text-pink-500 text-5xl mb-4">lock</span>
          <h3 class="text-2xl font-bold text-pink-700 mb-2">Faça login para acessar</h3>
          <p class="text-pink-500 mb-6">Você precisa estar logado para acessar esta funcionalidade.</p>
          <router-link to="/login" class="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-colors">
            <span class="material-icons">login</span>
            Fazer login
          </router-link>
        </div>
      </Modal>
    </div>
    <footer class="text-center text-pink-300 py-6 text-sm">
      &copy; {{ new Date().getFullYear() }} Love Photos. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../components/Modal.vue'

const router = useRouter()
const showLoginModal = ref(false)

const cards = [
  {
    icon: 'photo_library',
    title: 'Galeria',
    description: 'Compartilhe e organize suas fotos favoritas com seu parceiro.',
    link: '/',
    cta: 'Ver galeria',
  },
  {
    icon: 'calendar_month',
    title: 'Datas Especiais',
    description: 'Mantenha o controle de todas as datas importantes do seu relacionamento.',
    link: '/important-dates',
    cta: 'Ver datas',
  },
  {
    icon: 'favorite',
    title: 'Lembretes',
    description: 'Crie lembretes especiais para não esquecer de momentos importantes.',
    link: '/reminders',
    cta: 'Ver lembretes',
  },
]

function isAuthenticated() {
  return !!localStorage.getItem('token')
}

function handleCardClick(link) {
  if (isAuthenticated()) {
    router.push(link)
  } else {
    showLoginModal.value = true
  }
}
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s infinite;
}
</style>
