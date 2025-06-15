<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold text-pink-600 mb-8">Bem-vindo ao Love Photos</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card de Galeria -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center mb-4">
          <span class="material-icons text-pink-600 mr-3">photo_library</span>
          <h2 class="text-xl font-semibold text-gray-800">Galeria</h2>
        </div>
        <p class="text-gray-600 mb-4">Compartilhe e organize suas fotos favoritas com seu parceiro.</p>
        <router-link 
          to="/" 
          class="inline-flex items-center text-pink-600 hover:text-pink-700"
        >
          Ver galeria
          <span class="material-icons ml-1">arrow_forward</span>
        </router-link>
      </div>

      <!-- Card de Datas Especiais -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center mb-4">
          <span class="material-icons text-pink-600 mr-3">calendar_month</span>
          <h2 class="text-xl font-semibold text-gray-800">Datas Especiais</h2>
        </div>
        <p class="text-gray-600 mb-4">Mantenha o controle de todas as datas importantes do seu relacionamento.</p>
        <router-link 
          to="/important-dates" 
          class="inline-flex items-center text-pink-600 hover:text-pink-700"
        >
          Ver datas
          <span class="material-icons ml-1">arrow_forward</span>
        </router-link>
      </div>

      <!-- Card de Lembretes -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center mb-4">
          <span class="material-icons text-pink-600 mr-3">favorite</span>
          <h2 class="text-xl font-semibold text-gray-800">Lembretes</h2>
        </div>
        <p class="text-gray-600 mb-4">Crie lembretes especiais para não esquecer de momentos importantes.</p>
        <router-link 
          to="/reminders" 
          class="inline-flex items-center text-pink-600 hover:text-pink-700"
        >
          Ver lembretes
          <span class="material-icons ml-1">arrow_forward</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente da página inicial
</script>
