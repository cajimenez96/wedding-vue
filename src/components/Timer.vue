<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie'
import Calendar from '../assets/lottie/calendar.json';

const props = defineProps<{
  title?: string;
  description?: string;
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
  interval = window.setInterval(formatTime, 1000);
})

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

</script>

<template>
  <section class="container-timer w-full">
    <div class="my-18">
      <div class="mx-auto">
        <Vue3Lottie :animationData="Calendar" :height="50" :width="50" />
      </div>
      <div class="w-full justify-center items-center md:text-center flex flex-col gap-10 p-8">
        <p class="text-4xl title-wedding title">{{ title }}</p>
        <p class="text-xl" v-html="description"></p>
      </div>
      <div class="mt-5 w-full flex justify-center items-center">
        <div class="flex justify-center items-center gap-8" v-if="!isNow">
          <div class="flex justify-center items-center gap-4">
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
        </div>
        <div v-else>
          <p class="text-4xl font-bold title-wedding title">¡Es hoy!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container-timer {
  height: 690px;
  border-bottom: .5 solid var(--gold-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-family: 'Sail', cursive;
  color: var(--brown-color);
  letter-spacing: .5px;
}
.border-box::after {
  content: ":";
  font-family: 'Sail', cursive;
  color: var(--gold-color);
}
.number {
  font-family: 'Sail', cursive;
  font-size: 5rem;
  font-weight: lighter;
  color: var(--gold-color);
  line-height: 1;
  margin-bottom: 0.5rem;
}
.data {
  font-size: .6rem;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: var(--text-light);
  font-weight: 400;
}

@media (max-width: 768px) {
  .container-timer {
    height: auto;
    padding: 20px;
  }
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