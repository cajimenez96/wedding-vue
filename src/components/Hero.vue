<script setup lang="ts">
import Button from './Button.vue';

defineProps<{
  groom: string;
  bride: string;
  date: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();


</script>

<template>
  <section id="inicio" class="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center relative hero-bg">
    <div class="text-center flex flex-col items-center gap-20 fade-in">
      <div class="flex flex-col gap-5">
        <p class="uppercase text-md font-light hero-wedding">Nos casamos</p>
        <h1 class="hero-title">{{ groom }} & {{ bride }}</h1>
        <p class=" hero-date">{{ date }}</p>
      </div>
      <div class="w-1/2">
        <Button variant="primary" @click="emit('confirm')">
          <i class="fas fa-heart me-2" aria-hidden="true"></i>
          Confirma tu Asistencia
        </Button>
      </div>

    </div>
  
    <div class="scroll-indicator absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-ping text-white">
      <i class="fas fa-chevron-down" aria-hidden="true"></i>
    </div>
  </section>
</template>

<style scoped>
.hero-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('../assets/images/married-main.webp');
  background-size: 130%;
  background-position: top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.hero-wedding {
  letter-spacing: 3px;
  opacity: 0.9;
  color: var(--white);
}
.hero-title {
  font-family: 'Sail', cursive;
  font-size: 5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  color: var(--white);
}
.hero-date {
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 2rem;
  opacity: 0.95;
  letter-spacing: 1px;
  color: var(--white)
}
</style>