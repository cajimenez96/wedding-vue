<script setup lang="ts">
import Countdown from './components/Countdown.vue';
import Events from './components/Events.vue';
import Schedule from './components/Schedule.vue';
import Gallery from './components/Gallery.vue';
import Gifts from './components/Gifts.vue';
import Photos from './components/Photos.vue';
import DressCode from './components/DressCode.vue';
import Footer from './components/Footer.vue';
import ConfirmAssistance from './components/ConfirmAssistance.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import MusicModal from './components/MusicModal.vue';
import ScrollToTop from './components/ScrollToTop.vue';
import Presentation from './components/Presentation.vue';
import backgroundLeaves from './assets/images/back_lef-top.webp';

import { ref, onMounted } from 'vue';
import { useImageOptimization } from './composables/useImageOptimization';

const musicMuted = ref(false);
const canAutoPlayMusic = ref(false);
const { preloadCriticalImages } = useImageOptimization();


const handleMusicPreference = (withMusic: boolean) => {
  musicMuted.value = !withMusic;
  canAutoPlayMusic.value = true;
};


onMounted(() => {
  setTimeout(() => {
    const criticalImages = [
      '/src/assets/images/married-main.webp'
    ];
    preloadCriticalImages(criticalImages).catch(() => {
    });
  }, 100);
});

</script>

<template>
  <div class="app-container">
  <Hero />

  <Countdown
    weddingDate="2026-05-09T14:00:00"
    groom="Alejandro"
    bride="Candelaria"
    date="09 de Mayo, 2026"
  />

  <Presentation
    title="El amor no se explica, se celebra y"
    subtitle="hoy lo celebramos con quienes amamos"
    description='En este día en que nuestros corazones se eligen para siempre, queremos compartir la alegría con quienes forman parte de nuestra historia.
                 Tu presencia hará este día aún más especial para nosotros.'
  />

  <!-- Background para secciones intermedias -->
  <div class="background-leaves">
    <img :src="backgroundLeaves" alt="" class="bg-image" />
  </div>

  <Events
    title="Ceremonia"
    description="La Casona de Campo es un salón de eventos al aire libre que tiene todo lo que necesita para crear una ocasión especial e inolvidable para usted y sus invitados. "
    location="Casona de Campo"
    startDate="2026-09-15T18:00:00"
  />

  <Schedule />

  <Gallery
    title="Nuestra Galería de amor"
  />

  <DressCode
    title="Código de vestimenta"
    description="ELEGANTE"
  />

  <Photos 
    title="Compartí tus fotos"
    description="¡Ayudanos a capturar cada momento especial!<br>Subí tus fotos de la boda y creemos juntos el álbum de este día inolvidable."
  />

  <Gifts
    title="Regalos"
    description="Tu presencia es lo más importante para nosotros.<br>Si además querés hacernos un regalo te contamos cómo hacerlo."
  />

  <ConfirmAssistance
    title="Confirmar Asistencia"
    description="Tu presencia es el mejor regalo que podríamos recibir. Por favor, confirma tu asistencia antes del 15 de abril de 2026."
  />

  <Footer
    groom="Alejandro"
    bride="Candelaria"
  />

  <MusicPlayer :initial-muted="musicMuted" />
  <MusicModal @music-preference="handleMusicPreference" />
  <ScrollToTop />
  </div>
</template>

<style scoped>
.app-container {
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
}

.background-leaves {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  opacity: 0.032;
  pointer-events: none;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .background-leaves {
    background-size: cover;
    background-position: center center;
    min-height: calc(100vh * 3.5);
  }
}

@media (max-width: 768px) {
  .background-leaves {
    background-size: 120% auto;
    background-position: center top;
    min-height: calc(100vh * 3);
  }
}

@media (max-width: 480px) {
  .background-leaves {
    background-size: 150% auto;
    min-height: calc(100vh * 2.5);
    opacity: 0.04;
  }
}

</style>
