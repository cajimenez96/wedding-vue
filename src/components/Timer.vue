<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  weddingDate: string;
}>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isNow = ref(false);

const formatTime = () => {
  const now = new Date();
  const target = new Date(props.weddingDate);
  const diff = target.getTime() - now.getTime();

  if (diff > 0) {
    days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((diff / (1000 * 60)) % 60);
    seconds.value = Math.floor((diff / 1000) % 60);
    return;
  }
  isNow.value = true;
}

let interval: number | undefined;
onMounted(() => {
  formatTime(); // Ejecutar inmediatamente
  interval = window.setInterval(formatTime, 1000);
})

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

</script>

<template>
  <div class="mt-5 w-full flex justify-center items-center">
    <div class="flex justify-center items-center gap-4" v-if="!isNow">
      <div class="md:px-5 text-center">
        <p class="number">{{ days }}</p>
        <p class="data">Dias</p>
      </div>

      <div class="border-box" />
    
      <div class="md:px-5 text-center">
        <p class="number">{{ hours }}</p>
        <p class="data">Horas</p>
      </div>

      <div class="border-box" />
    
      <div class="md:px-5 text-center">
        <p class="number">{{ minutes }}</p>
        <p class="data">Minutos</p>
      </div>

      <div class="border-box" />
    
      <div class="md:px-5 text-center">
        <p class="number">{{ seconds }}</p>
        <p class="data">Segundos</p>
      </div>
    </div>
    <div v-else>
      <p class="text-4xl font-bold title-wedding title">¡Es hoy!</p>
    </div>
  </div>
</template>

<style scoped>
.border-box::after {
  content: ":";
  font-family: 'Sail', cursive;
  color: var(--white);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.number {
  font-family: 'Sail', cursive;
  font-size: 3rem;
  font-weight: lighter;
  color: var(--white);
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.data {
  font-size: .6rem;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: var(--white);
  font-weight: 400;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  .number {
    font-size: 3rem;
  }
  .data {
    font-size: .5rem;
  }
}
</style>