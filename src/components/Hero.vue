<script setup lang="ts">
import { ref } from 'vue';
import Button from "./Button.vue";
import { useScrollAnimation } from '../composables/useScrollAnimation';

const props = defineProps<{
  groom: string;
  bride: string;
  date: string;
  showDecoration?: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
}>();

const heroRef = ref<HTMLElement>();
const { isVisible: heroAnimationsVisible } = useScrollAnimation(heroRef, 0.1, true); // Initially visible
</script>

<template>
  <section
    ref="heroRef"
    id="inicio"
    class="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center relative hero-bg"
  >
    <!-- Hero-top decoration -->
    <div v-if="showDecoration && heroAnimationsVisible" class="hero-decoration-top animate-slide-in">
      <img 
        src="../assets/images/Hero-top.webp" 
        alt="" 
        loading="eager"
        decoding="sync"
      />
    </div>
    
    <!-- Hero-bot decoration -->
    <div v-if="showDecoration && heroAnimationsVisible" class="hero-decoration-bot animate-slide-in-bot">
      <img 
        src="../assets/images/Hero-bot.webp" 
        alt="" 
        loading="eager"
        decoding="sync"
      />
    </div>
    <div class="text-center flex flex-col items-center gap-20 fade-in">
      <div class="flex flex-col gap-5">
        <p class="uppercase text-md font-light title-wedding">Nos casamos</p>
        <h1 class="hero-title">
          <span class="desktop-layout">{{ groom }} & {{ bride }}</span>
          <span class="mobile-layout">
            <span class="groom-name">{{ groom }}</span>
            <span class="ampersand">&</span>
            <span class="bride-name">{{ bride }}</span>
          </span>
        </h1>
        <p class="hero-date">{{ date }}</p>
      </div>
      <div class="hero-button-container">
        <Button variant="primary" @click="emit('confirm')">
          <i class="fas fa-heart me-2" aria-hidden="true"></i>
          Confirma tu Asistencia
        </Button>
      </div>
    </div>

    <div
      class="scroll-indicator absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-ping text-white"
    >
      <i class="fas fa-chevron-down" aria-hidden="true"></i>
    </div>
  </section>
</template>

<style scoped>
.hero-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../assets/images/married-main.webp");
  background-size: center;
  background-position: top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.hero-title {
  font-family: "Sail", cursive;
  font-size: 5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  color: var(--white);
}

.hero-title .desktop-layout {
  display: inline;
}

.hero-title .mobile-layout {
  display: none;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-title .desktop-layout {
    display: none;
  }
  
  .hero-title .mobile-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .hero-title .groom-name, 
  .hero-title .bride-name {
    display: block;
  }
  
  .hero-title .ampersand {
    display: block;
    font-size: 2rem;
    opacity: 0.8;
  }
}

.hero-button-container {
  width: calc(100% - 2rem);
  max-width: none;
  padding: 0 1rem;
}

@media (max-width: 767px) {
  .hero-button-container {
    width: calc(100vw - 2rem);
    padding: 0 1rem;
  }
  
  .hero-button-container :deep(.button) {
    white-space: nowrap;
    min-width: 280px;
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
}

@media (min-width: 768px) {
  .hero-button-container {
    width: 50%;
    max-width: 300px;
    padding: 0;
  }
}
.hero-date {
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 2rem;
  opacity: 0.95;
  letter-spacing: 1px;
  color: var(--white);
}

.hero-decoration-top {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  contain: layout style paint;
}

.hero-decoration-top img {
  width: auto;
  height: auto;
  max-width: 408px;
  opacity: 0.5;
  will-change: transform, opacity;
}

.hero-decoration-bot {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
  contain: layout style paint;
}

.hero-decoration-bot img {
  width: auto;
  height: auto;
  max-width: 408px;
  opacity: 0.5;
  will-change: transform, opacity;
}

@media (max-width: 768px) {
  .hero-decoration-top img,
  .hero-decoration-bot img {
    max-width: 245px;
  }
}

.animate-slide-in {
  animation: slideInFromCorner 1.5s ease-out;
}

.animate-slide-in-bot {
  animation: slideInFromBottomCorner 1.5s ease-out;
}

@keyframes slideInFromCorner {
  0% {
    transform: translate(-100%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes slideInFromBottomCorner {
  0% {
    transform: translate(100%, 100%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

</style>
