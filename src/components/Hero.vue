<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { useScrollAnimation } from '../composables/useScrollAnimation';
import Button from "./Button.vue";

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
const { isVisible: showAnimations } = useScrollAnimation(heroRef, 0.3);
const imagesLoaded = ref(false);
const topImageRef = ref<HTMLImageElement>();
const botImageRef = ref<HTMLImageElement>();

// Control de carga de imágenes
const checkImagesLoaded = () => {
  const topImg = topImageRef.value;
  const botImg = botImageRef.value;
  
  if (topImg && botImg) {
    const topLoaded = topImg.complete && topImg.naturalHeight !== 0;
    const botLoaded = botImg.complete && botImg.naturalHeight !== 0;
    
    if (topLoaded && botLoaded) {
      imagesLoaded.value = true;
      triggerAnimations();
    }
  }
};

const triggerAnimations = () => {
  if (!imagesLoaded.value) return;
  
  const topEl = document.querySelector('.hero-decoration-top');
  const botEl = document.querySelector('.hero-decoration-bot');
  
  if (showAnimations.value) {
    if (topEl) topEl.classList.add('animate-slide-in');
    if (botEl) botEl.classList.add('animate-slide-in-bot');
  } else {
    if (topEl) topEl.classList.remove('animate-slide-in');
    if (botEl) botEl.classList.remove('animate-slide-in-bot');
  }
};

// Activación de animaciones
watch(showAnimations, () => {
  if (imagesLoaded.value) {
    triggerAnimations();
  }
}, { immediate: true });

watch(() => props.showDecoration, (newValue) => {
  if (newValue && imagesLoaded.value && showAnimations.value) {
    triggerAnimations();
  }
});

onMounted(() => {
  setTimeout(checkImagesLoaded, 50);
});
</script>

<template>
  <section
    ref="heroRef"
    id="inicio"
    class="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center relative hero-bg overflow-hidden"
  >
    <div class="hero-decoration-top">
      <img 
        ref="topImageRef"
        src="../assets/images/Hero-top.webp" 
        alt="" 
        loading="eager"
        decoding="sync"
        @load="checkImagesLoaded"
        @error="checkImagesLoaded"
      />
    </div>
    
    <div class="hero-decoration-bot">
      <img 
        ref="botImageRef"
        src="../assets/images/Hero-bot.webp" 
        alt="" 
        loading="eager"
        decoding="sync"
        @load="checkImagesLoaded"
        @error="checkImagesLoaded"
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
  background-size: cover;
  background-position: center top;
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
    min-width: 300px;
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
  z-index: 5;
  pointer-events: none;
  contain: layout style paint;
  opacity: 0;
  transform: translate(-100%, -100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-decoration-top img {
  width: auto;
  height: auto;
  max-width: 408px;
  opacity: 0.8;
  will-change: transform, opacity;
}

.hero-decoration-bot {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  pointer-events: none;
  contain: layout style paint;
  opacity: 0;
  transform: translate(100%, 100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-decoration-bot img {
  width: auto;
  height: auto;
  max-width: 408px;
  opacity: 0.8;
  will-change: transform, opacity;
}

@media (max-width: 1024px) and (min-width: 769px) {
  .hero-decoration-top img,
  .hero-decoration-bot img {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .hero-decoration-top img,
  .hero-decoration-bot img {
    max-width: 365px;
  }
}

@media (max-width: 480px) {
  .hero-decoration-top img,
  .hero-decoration-bot img {
    max-width: 243px;
  }
}


.animate-slide-in {
  animation: slideInFromCorner 1.5s ease-out forwards;
}

.animate-slide-in-bot {
  animation: slideInFromBottomCorner 1.5s ease-out forwards;
}

@keyframes slideInFromCorner {
  0% {
    transform: translate(-100%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0.8;
  }
}

@keyframes slideInFromBottomCorner {
  0% {
    transform: translate(100%, 100%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0.8;
  }
}

</style>
