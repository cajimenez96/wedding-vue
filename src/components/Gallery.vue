<script lang="ts" setup>
import CustomCarousel from './CustomCarousel.vue';
import { Vue3Lottie } from 'vue3-lottie'
import Camera from '../assets/lottie/camera.json';

defineProps<{
  title?: string;
}>();

const imageModules = import.meta.glob('../assets/carousel/*.jpg', { eager: true });
const images = Object.entries(imageModules).map(([path, mod]) => {
  const id = path.split('/').pop() || path;
  return {
    url: (mod as any).default,
    id,
  };
});

</script>

<template>
  <div class="mx-auto mb-10 text-center">
    <Vue3Lottie :animationData="Camera" :height="80" :width="80" />
    <h2 class="text-4xl title-wedding title-section mt-10">{{ title }}</h2>
  </div>
  <div class="w-[95%] md:w-3/5 mx-auto my-20">
    <CustomCarousel :images="images" />
  </div>
</template>

<style scoped>

</style>