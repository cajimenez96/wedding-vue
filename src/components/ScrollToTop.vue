<template>
  <button 
    v-if="showButton"
    @click="scrollToTop"
    class="scroll-to-top"
    :class="{ 'visible': showButton }"
    aria-label="Volver al inicio"
  >
    <i class="fas fa-chevron-up" aria-hidden="true"></i>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);
let heroHeight = 0;

const checkScroll = () => {
  const scrollY = window.scrollY;
  showButton.value = scrollY > heroHeight;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const calculateHeroHeight = () => {
  const heroElement = document.getElementById('inicio');
  if (heroElement) {
    heroHeight = heroElement.offsetHeight;
  }
};

onMounted(() => {
  calculateHeroHeight();
  window.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', calculateHeroHeight);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
  window.removeEventListener('resize', calculateHeroHeight);
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 99, 96, 0.2);
  border-radius: 50%;
  color: var(--green-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  z-index: 100;
}

.scroll-to-top.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.scroll-to-top:hover {
  background: var(--green-color);
  color: var(--white);
  border-color: var(--green-color);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(74, 99, 96, 0.3);
}

.scroll-to-top:active {
  transform: translateY(-1px) scale(1.02);
}

@media (max-width: 768px) {
  .scroll-to-top {
    width: 36px;
    height: 36px;
    bottom: 1.5rem;
    right: 1.5rem;
    font-size: 0.8rem;
  }
}
</style>