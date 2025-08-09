<script setup lang="ts">
import Hero from './components/Hero.vue';

const handleConfirm = () => {
  // Aquí puedes manejar la lógica de confirmación
  console.log('Asistencia confirmada');
};

</script>

<template >
  <Hero
    groom="Alejandro"
    bride="Candelaria"
    date="15 de Septiembre, 2026"
    @confirm="handleConfirm"
  />

  <div class="h-screen"></div>
</template>

<style scoped>

</style>
