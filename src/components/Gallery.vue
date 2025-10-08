<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import PhotoSwipeGallery from './PhotoSwipeGallery.vue';
import Container from './Container.vue';

defineProps<{
  title?: string;
}>();

const images = ref<Array<{url: string, id: string}>>([]);
const isLoading = ref(true);

// Carga de imágenes
const loadImages = async () => {
  try {
    const imageModules = import.meta.glob('../assets/carousel/*.jpg', { eager: false });
    const loadedImages = await Promise.all(
      Object.entries(imageModules).map(async ([path, loader]) => {
        try {
          const mod = await loader();
          const id = path.split('/').pop() || path;
          return {
            url: (mod as any).default,
            id,
          };
        } catch (error) {
          console.warn(`Failed to load image: ${path}`, error);
          return null;
        }
      })
    );
    
    images.value = loadedImages.filter(img => img !== null) as Array<{url: string, id: string}>;
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to load gallery images:', error);
    isLoading.value = false;
  }
};

onMounted(() => {
  loadImages();
});

</script>

<template>
  <Container variant="light" customClass="md:w-[90%]">
    <div class="text-center mb-12">
      <h2 class="text-4xl title-wedding title-section text-green-color">{{ title }}</h2>
    </div>
    <div class="w-full mx-auto">
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span class="ml-3 text-green-600">Cargando galería...</span>
      </div>
      <PhotoSwipeGallery v-else :images="images" />
    </div>
  </Container>
</template>

