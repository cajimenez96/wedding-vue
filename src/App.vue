<script setup lang="ts">
import Hero from './components/Hero.vue';
import Timer from './components/Timer.vue';

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

  <Timer
    title="Cuenta regresiva para el gran día"
    description='Faltan pocos días para nuestra boda. <br>¡Estamos emocionados de compartir este momento especial contigo!'
    weddingDate="2026-09-15T18:00:00"
  />
</template>

<style scoped>

</style>
