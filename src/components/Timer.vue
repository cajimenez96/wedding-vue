<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Container from './Container.vue';

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
  <div class="my-18">
    <div class="w-full justify-center items-center flex flex-col gap-4 p-8">
      <p class="text-4xl title-wedding title">{{ title }}</p>
      <p class="text-xl" v-html="description"></p>
    </div>
    <div class="mt-5 w-full flex justify-center items-center">
      <div class="w-1/2 md:w-1/4 flex justify-center items-center gap-8" v-if="!isNow">
        <Container customClass="w-[180px]">
          <div class="text-center">
            <p class="number">{{ days }}</p>
            <p class="data">Dias</p>
          </div>
        </Container>
        <Container customClass="w-[180px]">
          <div class="text-center">
            <p class="number">{{ hours }}</p>
            <p class="data">Horas</p>
          </div>
        </Container>
        <Container customClass="w-[180px]">
          <div class="text-center">
            <p class="number">{{ minutes }}</p>
            <p class="data">Minutos</p>
          </div>
        </Container>
        <Container customClass="w-[180px]">
          <div class="text-center">
            <p class="number">{{ seconds }}</p>
            <p class="data">Segundos</p>
          </div>
        </Container>
      </div>
      <div v-else>
        <p class="text-4xl font-bold title-wedding title">¡Es hoy!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Sail', cursive;
  color: var(--brown-color);
  letter-spacing: .5px;
}
.number {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--gold-color);
  line-height: 1;
  margin-bottom: 0.5rem;
}
.data {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-light);
  font-weight: 500;
}
</style>