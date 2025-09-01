<script lang="ts" setup>
import Button from './Button.vue';
import Container from './Container.vue';
import Timer from './Timer.vue';
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  description?: string;
  location: string;
  startDate?: string;
}>();

const showTimer = ref(false);
const timerContainer = ref(null);
const currentSlide = ref(0);

let touchStartX = 0;
let touchEndX = 0;
let isHovering = false;
let hoverTimeout: number | null = null;

const handleMouseEnter = () => {
  isHovering = true;
  if (hoverTimeout) clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => {
    if (isHovering) {
      showTimer.value = true;
    }
  }, 150);
};

const handleMouseLeave = () => {
  isHovering = false;
  if (hoverTimeout) clearTimeout(hoverTimeout);
  showTimer.value = false;
};

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) > 50) {
    currentSlide.value = currentSlide.value === 0 ? 1 : 0;
  }
};
</script>

<template>
  <Container variant="light">
    <p class="text-4xl title-wedding title-section text-green-color text-center mb-10">
      {{ props.title }}
    </p>
    <div 
      class="timer-section hover-container desktop-version"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="timerContainer"
    >
      <div class="date-time-grid">
        <div></div>
        <div class="flex flex-col items-center gap-2 date-time-item" :class="{ 'hidden': showTimer }">
          <p class="text-3xl font-medium time-style">09</p>
          <p class="text-xl font-normal text-center">mayo</p>
        </div>
        <div class="flex items-center justify-center date-time-separator" :class="{ 'hidden': showTimer }">
          <div class="w-0.5 h-16 bg-[#E5E7EB]"></div>
        </div>
        <div class="flex flex-col items-center gap-2 date-time-item" :class="{ 'hidden': showTimer }">
          <p class="text-3xl font-medium time-style">14:00</p>
          <p class="text-xl font-normal text-center">hs</p>
        </div>
        <div></div>
        
        <div class="timer-overlay" :class="{ 'show': showTimer }">
          <Timer weddingDate="2026-05-09T14:00:00" />
        </div>
      </div>
    </div>
    
    <div 
      class="carousel-container mobile-version"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="carousel-slide">
          <div class="date-time-grid">
            <div></div>
            <div class="flex flex-col items-center gap-2">
              <p class="text-3xl font-medium time-style">09</p>
              <p class="text-xl font-normal text-center">mayo</p>
            </div>
            <div class="flex items-center justify-center">
              <div class="w-0.5 h-16 bg-[#E5E7EB]"></div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <p class="text-3xl font-medium time-style">14:00</p>
              <p class="text-xl font-normal text-center">hs</p>
            </div>
            <div></div>
          </div>
        </div>
        
        <div class="carousel-slide">
          <div class="timer-mobile">
            <Timer weddingDate="2026-05-09T14:00:00" />
          </div>
        </div>
      </div>
      
      <div class="carousel-indicators">
        <div class="indicator" :class="{ 'active': currentSlide === 0 }"></div>
        <div class="indicator" :class="{ 'active': currentSlide === 1 }"></div>
      </div>
    </div>
    <div class="border-t border-b border-gray-300 py-5 mt-10 flex flex-col gap-4">
      <p class="text-2xl text-center font-medium">{{ props.location }}</p>
      <p class="text-xl text-center" v-html="props.description"></p>
    </div>
    <div class="events-buttons-container">
      <Button variant="outline">Confirmar asistencia</Button>
      <Button variant="primary">Como llegar</Button>
    </div>
  </Container>
</template>

<style scoped>

.timer-section {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 2rem;
}

.date-time-grid {
  display: grid;
  grid-template-columns: 1fr auto auto auto 1fr;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.date-time-grid > div:nth-child(3) {
  margin-left: 0.5rem;
}

.date-time-grid > div:nth-child(2),
.date-time-grid > div:nth-child(4) {
  width: 80px;
}

.events-buttons-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1.25rem;
  justify-content: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.events-buttons-container :deep(button) {
  flex: 1;
}


.timer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-overlay.show {
  opacity: 1;
  visibility: visible;
}

.timer-overlay :deep(.number) {
  color: var(--green-color) !important;
  text-shadow: none !important;
}

.timer-overlay :deep(.data) {
  color: var(--green-color) !important;
}

.timer-overlay :deep(.border-box::after) {
  color: var(--green-color) !important;
}

.desktop-version {
  display: flex;
}

.mobile-version {
  display: none;
}

.carousel-container {
  position: relative;
  height: 80px;
  overflow: hidden;
  cursor: pointer;
  padding: 0 2rem;
}

.carousel-wrapper {
  display: flex;
  width: 200%;
  height: 100%;
  transition: transform 0.3s ease;
}

.carousel-slide {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.timer-mobile :deep(.number) {
  color: var(--green-color) !important;
  text-shadow: none !important;
}

.timer-mobile :deep(.data) {
  color: var(--green-color) !important;
}

.timer-mobile :deep(.border-box::after) {
  color: var(--green-color) !important;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #E5E7EB;
  transition: background 0.3s ease;
}

.indicator.active {
  background: var(--green-color);
}

@media (max-width: 1024px) {
  .desktop-version {
    display: none;
  }
  
  .mobile-version {
    display: block;
  }
}

.date-time-item,
.date-time-separator {
  transition: opacity 0.4s ease;
}

.date-time-item.hidden,
.date-time-separator.hidden {
  opacity: 0;
  visibility: hidden;
}

@media (max-width: 1024px) {
  .timer-overlay {
    min-width: 280px;
    padding: 1.5rem;
  }
  
  .events-buttons-container {
    flex-direction: column;
    max-width: none;
  }
  
  .events-buttons-container :deep(button) {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .timer-overlay {
    min-width: 260px;
    padding: 1.25rem;
  }
  
  .timer-overlay :deep(.number) {
    font-size: 2rem !important;
  }
  
  .timer-overlay :deep(.data) {
    font-size: 0.5rem !important;
  }
}
</style>