
<template>
  <div>
    <Header title="Coleção de Fotos" />
    <PhotoGallery :collectionId="$route.params.id" />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import PhotoGallery from '../components/PhotoGallery.vue'
</script>
