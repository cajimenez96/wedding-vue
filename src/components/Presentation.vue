<script lang="ts" setup>
import Container from './Container.vue';
import decImage from '../assets/images/back/dec-1.webp';

defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <Container variant="green">
    <div class="presentation-decoration">
      <img :src="decImage" alt="" class="presentation-decoration-image" />
    </div>
    <p class="text-4xl title-wedding title-section text-center">
      {{ title }}
    </p>  
    <p class="my-10 text-xl text-center" v-html="description"></p>
  </Container>
</template>

<style scoped>
.presentation-decoration {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.presentation-decoration-image {
  width: 15rem;
  height: auto;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .presentation-decoration-image {
    width: 12rem;
  }
}

@media (max-width: 480px) {
  .presentation-decoration-image {
    width: 10rem;
  }
}
</style>