<script lang="ts" setup>
import { ref } from 'vue';
import PhotoSwipeGallery from './PhotoSwipeGallery.vue';
import Container from './Container.vue';
import { GALLERY_IMAGES } from '../config/cloudinaryGallery';

defineProps<{
  title?: string;
}>();

const images = ref(GALLERY_IMAGES);
</script>

<template>
  <Container variant="light" customClass="md:w-[90%]">
    <div class="text-center mb-12">
      <h2 class="text-4xl title-wedding title-section text-green-color">{{ title }}</h2>
    </div>
    <div class="w-full mx-auto">
      <PhotoSwipeGallery :images="images" />
    </div>
  </Container>
</template>