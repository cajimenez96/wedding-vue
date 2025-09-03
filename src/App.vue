<script setup lang="ts">
import Hero from './components/Hero.vue';
import Events from './components/Events.vue';
import Schedule from './components/Schedule.vue';
import Gallery from './components/Gallery.vue';
import Gifts from './components/Gifts.vue';
import Footer from './components/Footer.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import MusicModal from './components/MusicModal.vue';
import ScrollToTop from './components/ScrollToTop.vue';
import Presentation from './components/Presentation.vue';
import backgroundLeaves from './assets/images/back_lef-top.webp';

import { ref, onMounted } from 'vue';
import { useImageOptimization } from './composables/useImageOptimization';

const musicMuted = ref(false);
const showHeroDecoration = ref(false);
const { preloadCriticalImages } = useImageOptimization();

const handleConfirm = () => {
  
};

const handleMusicPreference = (withMusic: boolean) => {
  musicMuted.value = !withMusic;
};

const handleModalClosed = () => {
  showHeroDecoration.value = true;
};

// Preload critical images on app mount
onMounted(() => {
  // Don't block the modal with preloading
  setTimeout(() => {
    const criticalImages = [
      '/src/assets/images/married-main.webp',
      '/src/assets/images/Hero-top.webp',
      '/src/assets/images/Hero-bot.webp'
    ];
    preloadCriticalImages(criticalImages).catch(() => {
      // Ignore preload errors
    });
  }, 100);
});

</script>

<template >
  <Hero
    groom="Alejandro"
    bride="Candelaria"
    date="09 de Mayo, 2026"
    :show-decoration="showHeroDecoration"
    @confirm="handleConfirm"
  />

  <Presentation
    title="La medida del amor es amar sin medida"
    description='Nos complace invitarte a acompañarnos en el día más especial de nuestras vidas, cuando uniremos nuestros corazones en matrimonio. <br><br>Tu presencia hará de este momento un recuerdo inolvidable.'
  />

  <!-- Background para secciones intermedias -->
  <div class="background-leaves">
    <img :src="backgroundLeaves" alt="" class="bg-image" />
  </div>

  <Events
    title="Ceremonia"
    description="La Casona de Campo es un salón de eventos al aire libre que tiene todo lo que necesita para crear una ocasión especial e inolvidable para usted y sus invitados. "
    location="Casona Campo"
    startDate="2026-09-15T18:00:00"
  />

  <Schedule />

  <Gallery
    title="Nuestra Galería de amor"
  />

  <Gifts
    title="Regalos"
    description="Tu presencia es lo más importante para nosotros.<br>Si además querés hacernos un regalo te contamos cómo hacerlo."
  />

  <Footer
    groom="Alejandro"
    bride="Candelaria"
  />

  <MusicPlayer :initial-muted="musicMuted" />
  <MusicModal @music-preference="handleMusicPreference" @modal-closed="handleModalClosed" />
  <ScrollToTop />

</template>

<style scoped>
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
