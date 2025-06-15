<template>
  <div class="flex items-center gap-2">
    <div class="relative">
      <!-- Círculo de fundo -->
      <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
        <!-- Ícone de câmera estilizado -->
        <svg 
          class="w-5 h-5 text-pink-600" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z" 
            fill="currentColor"
          />
          <path 
            d="M9 3L7.17 5H4C2.9 5 2 5.9 2 7V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5H16.83L15 3H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      <!-- Coração pequeno no canto -->
      <div class="absolute -top-1 -right-1 w-4 h-4 text-pink-500">
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente de logo com ícone de câmera e coração
</script> 