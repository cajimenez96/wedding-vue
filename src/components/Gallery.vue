<script lang="ts" setup>
import CustomCarousel from './CustomCarousel.vue';
import Container from './Container.vue';

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
  <Container variant="light" customClass="md:w-[65%]">
    <div class="text-center">
      <h2 class="text-4xl title-wedding title-section text-green-color">{{ title }}</h2>
    </div>
    <div class="w-[95%] md:w-4/5 mx-auto my-20">
      <CustomCarousel :images="images" />
    </div>
  </Container>
</template>

<style scoped>

</style>