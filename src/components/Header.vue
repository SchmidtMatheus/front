
<template>
  <header class="bg-blue-600 text-white p-4 text-center text-xl font-bold">
    {{ title }}
  </header>
</template>

<script setup>
defineProps({
  title: String
})
</script>
