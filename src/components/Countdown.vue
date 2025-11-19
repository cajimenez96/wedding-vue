<script setup lang="ts">
import { ref } from "vue";
import { useScrollAnimation } from "../composables/useScrollAnimation";
import Container from "./Container.vue";
import Timer from "./Timer.vue";
import backgroundLeafsLeft from "../assets/images/back_lef-left.webp";
import backgroundLeafsRight from "../assets/images/back_lef-right.webp";

defineProps<{
  title?: string;
  description?: string;
  weddingDate?: string;
  groom?: string;
  bride?: string;
  date?: string;
}>();

const countdownRef = ref<HTMLElement>();
const { isVisible: showBackgroundImages } = useScrollAnimation(
  countdownRef,
  0.6
);
</script>

<template>
  <Container
    variant="white"
    size="wide"
    customClass="relative countdown-container min-h-screen flex items-center justify-center"
  >
    <div class="countdown-content">
      <div
        class="countdown-background-left"
        :class="{ 'animate-slide-left': showBackgroundImages }"
      >
        <img :src="backgroundLeafsLeft" alt="" class="leafs-left-image" />
      </div>
      <div
        class="countdown-background-right"
        :class="{ 'animate-slide-right': showBackgroundImages }"
      >
        <img :src="backgroundLeafsRight" alt="" class="leafs-right-image" />
      </div>
      <div ref="countdownRef" class="countdown-content relative z-10">
        <!-- Nombres de los novios y fecha -->
        <div
          v-if="groom && bride && date"
          class="names-date-section text-center mb-10 -mb-6"
        >
          <h1 class="countdown-title">
            <span class="desktop-layout">{{ groom }} & {{ bride }}</span>
            <span class="mobile-layout">
              <span class="groom-name">{{ groom }}</span>
              <span class="ampersand">&</span>
              <span class="bride-name">{{ bride }}</span>
            </span>
          </h1>
          <p class="countdown-date">{{ date }}</p>
        </div>
      </div>

      <!-- Título y descripción del countdown -->
      <div v-if="title" class="text-center mb-10">
        <h2 class="text-4xl title-wedding title-section">{{ title }}</h2>
        <p
          v-if="description"
          class="text-xl text-center mt-4"
          v-html="description"
        ></p>
      </div>

      <!-- Temporizador -->
      <div class="timer-wrapper">
        <div class="timer-container">
          <Timer :weddingDate="weddingDate || '2026-05-09T14:00:00'" />
        </div>
      </div>
    </div>
  </Container>
</template>

<style scoped>
/* Decoraciones laterales - Adaptadas para fondo blanco */
.countdown-background-left {
  position: absolute;
  top: 0;
  left: -550px;
  width: 350px;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-100px);
  transition: all 1.2s ease-out;
}

.countdown-background-right {
  position: absolute;
  top: 0;
  right: -550px;
  width: 350px;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transform: translateX(100px);
  transition: all 1.2s ease-out;
}

.animate-slide-left {
  opacity: 1;
  transform: translateX(0);
}

.animate-slide-right {
  opacity: 1;
  transform: translateX(0);
}

.leafs-left-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  opacity: 0.15;
  mix-blend-mode: multiply;
  filter: brightness(0.8) contrast(1.2) saturate(1.3);
  padding-right: 50px;
}

.leafs-right-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
  opacity: 0.15;
  mix-blend-mode: multiply;
  filter: brightness(0.8) contrast(1.2) saturate(1.3);
  padding-left: 50px;
}

.countdown-container :deep(.container) {
  overflow-x: hidden;
}

.countdown-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.names-date-section {
  margin-bottom: 2rem;
}

.countdown-title {
  font-family: "Sail", cursive;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.2;
  color: var(--green-color);
}

.countdown-title .desktop-layout {
  display: inline;
}

.countdown-title .mobile-layout {
  display: none;
}

.countdown-date {
  font-size: 1.3rem;
  font-weight: 300;
  opacity: 0.95;
  letter-spacing: 1px;
  color: var(--green-color);
}

.timer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 2rem 0;
  margin-top: -1rem;
}

.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  background-color: var(--green-color);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 32px rgba(74, 99, 96, 0.2);
  margin: 0 auto;
}

:deep(.number) {
  color: var(--white) !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
}

:deep(.data) {
  color: var(--white) !important;
}

:deep(.border-box::after) {
  color: var(--white) !important;
}

@media (max-width: 1024px) {
  .timer-container {
    max-width: 500px;
    padding: 2.25rem 2rem;
  }
}

@media (max-width: 768px) {
  .timer-wrapper {
    padding: 0.5rem 0 1.5rem 0;
    margin-top: 0;
  }

  .timer-container {
    max-width: 450px;
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }

  :deep(.number) {
    font-size: 2rem !important;
  }

  :deep(.data) {
    font-size: 0.5rem !important;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .countdown-title .desktop-layout {
    display: none;
  }

  .countdown-title .mobile-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .countdown-title .groom-name,
  .countdown-title .bride-name {
    display: block;
  }

  .countdown-title .ampersand {
    display: block;
    font-size: 2.5rem;
    opacity: 0.8;
  }

  .countdown-date {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .names-date-section {
    margin-bottom: 1.5rem;
  }

  .countdown-title {
    font-size: 3rem;
  }

  .countdown-title .desktop-layout {
    display: none;
  }

  .countdown-title .mobile-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .countdown-title .groom-name,
  .countdown-title .bride-name {
    display: block;
  }

  .countdown-title .ampersand {
    display: block;
    font-size: 2rem;
    opacity: 0.8;
  }

  .countdown-date {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .names-date-section {
    margin-bottom: 1rem;
  }

  .countdown-title {
    font-size: 2.5rem;
  }

  .countdown-date {
    font-size: 1rem;
  }

  .timer-container {
    max-width: 350px;
    padding: 1.75rem 1.25rem;
    border-radius: 10px;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .countdown-background-left,
  .countdown-background-right {
    width: 280px;
  }
  
  .countdown-background-left {
    left: -105px;
  }
  
  .countdown-background-right {
    right: -105px;
  }

  .leafs-left-image {
    padding-right: 30px;
  }

  .leafs-right-image {
    padding-left: 30px;
  }
}

@media (max-width: 768px) {
  .countdown-background-left,
  .countdown-background-right {
    width: 150px;
  }
  
  .countdown-background-left {
    left: 34px;
  }
  
  .countdown-background-right {
    right: 34px;
  }

  .leafs-left-image {
    padding-right: 20px;
    opacity: 0.12;
  }

  .leafs-right-image {
    padding-left: 20px;
    opacity: 0.12;
  }
}

@media (max-width: 480px) {
  .countdown-background-left,
  .countdown-background-right {
    width: 220px;
  }
  
  .countdown-background-left {
    left: -2px;
  }
  
  .countdown-background-right {
    right: -2px;
  }

  .leafs-left-image {
    padding-right: 15px;
    opacity: 0.1;
  }

  .leafs-right-image {
    padding-left: 15px;
    opacity: 0.1;
  }
}
</style>
