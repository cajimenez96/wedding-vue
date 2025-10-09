<script setup lang="ts">
import { ref } from 'vue';

const heroRef = ref<HTMLElement>();
</script>

<template>
  <section
    ref="heroRef"
    id="inicio"
    class="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center relative hero-bg overflow-hidden"
  >
      
    <div class="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 text-center fade-in">
      <p class="uppercase text-md md:text-lg font-light title-wedding text-white mb-4">Nos casamos</p>
    </div>

    <div
      class="scroll-indicator absolute bottom-5 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-pulse text-white"
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
</style>
