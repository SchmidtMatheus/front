<template>
  <div class="min-h-screen bg-pink-50 flex flex-col justify-center items-center py-12 px-4">
    <div class="w-full max-w-md text-center mb-8">
      <div class="flex justify-center mb-4">
        <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80"
          alt="Casal feliz" class="rounded-2xl shadow-lg w-28 h-28 object-cover border-4 border-pink-200 mx-auto" />
      </div>
      <h2 class="text-3xl font-extrabold text-pink-600 mb-2 drop-shadow flex flex-row justify-center">Entre na sua conta
        <Logo class="pl-2" />
      </h2>
      <p class="text-pink-400 mb-1">Acesse para guardar e compartilhar seus melhores momentos!</p>
    </div>
    <transition name="fade-slide" appear>
      <div class="bg-white py-10 px-8 shadow-xl rounded-2xl w-full max-w-md">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-pink-600 text-left">Email</label>
            <div class="mt-1">
              <input id="email" v-model="email" name="email" type="email" required
                class="appearance-none block w-full px-3 py-2 border border-pink-200 rounded-lg shadow-sm placeholder-pink-200 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Seu email" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-pink-600 text-left">Senha</label>
            <div class="mt-1">
              <input id="password" v-model="password" name="password" type="password" required
                class="appearance-none block w-full px-3 py-2 border border-pink-200 rounded-lg shadow-sm placeholder-pink-200 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Sua senha" />
            </div>
          </div>

          <div>
            <button type="submit"
              class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300">
              <span class="material-icons text-2xl">login</span>
              Entrar
            </button>
          </div>
        </form>

        <div class="mt-8">
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-pink-400">
              Não tem uma conta?
              <router-link to="/register"
                class="font-bold text-pink-600 hover:text-pink-700 transition-colors underline ml-1">
                Registre-se
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';
import Logo from '../components/Layout/Logo.vue';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await authService.login(email.value, password.value);
    router.push('/');
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>