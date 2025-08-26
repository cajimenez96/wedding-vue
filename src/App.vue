<script setup lang="ts">
import Hero from './components/Hero.vue';
import Timer from './components/Timer.vue';
import Events from './components/Events.vue';
import Separator from './components/Separator.vue';
import Gallery from './components/Gallery.vue';
import Gifts from './components/Gifts.vue';
import Footer from './components/Footer.vue';
import MusicPlayer from './components/MusicPlayer.vue';

const handleConfirm = () => {
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

  <Events
    title="Ceremonia"
    description="La Casona de Campo es un salón de eventos al aire libre que tiene todo lo que necesita para crear una ocasión especial e inolvidable para usted y sus invitados. "
    location="Casona Campo"
    startDate="2026-09-15T18:00:00"
  />

  <Separator />

  <Gallery
    title="Nuestra Galería de amor"
  />

  <Separator />

  <Gifts
    title="Regalos"
    description="Tu presencia es lo más importante para nosotros.<br>Si además querés hacernos un regalo te contamos cómo hacerlo."
  />

  <Footer
    groom="Alejandro"
    bride="Candelaria"
  />

  <MusicPlayer />

</template>

<style scoped>

</style>
