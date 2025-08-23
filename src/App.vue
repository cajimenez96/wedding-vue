<script setup lang="ts">
import Hero from './components/Hero.vue';
import Timer from './components/Timer.vue';
import Events from './components/Events.vue';
import Separator from './components/Separator.vue';

const handleConfirm = () => {
  // Aquí puedes manejar la lógica de confirmación
  console.log('Asistencia confirmada');
};

</script>

<template >
  <Hero
    groom="Alejandro"
    bride="Candelaria"
    date="09 de Mayo, 2026"
    @confirm="handleConfirm"
  />

  <Timer
    title="Cuenta regresiva para el gran día"
    description='Faltan pocos días para nuestra boda. <br>¡Estamos emocionados de compartir este momento especial contigo!'
    weddingDate="2026-05-09T14:00:00"
  />

  <Separator />

  <Events title="Ceremonia" location="Casona Campo" startDate="2026-09-15T18:00:00" />
</template>

<style scoped>

</style>
