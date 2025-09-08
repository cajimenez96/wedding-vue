<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useImageOptimization } from '../composables/useImageOptimization';

interface Props {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  class?: string;
  sizes?: string;
  priority?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  class: '',
  sizes: '100vw',
  priority: false
});

const { getOptimalImageSrc, preloadImage } = useImageOptimization();
const isLoaded = ref(false);
const hasError = ref(false);
const imageRef = ref<HTMLImageElement>();

const isMobile = computed(() => window.innerWidth <= 768);
const optimizedSrc = computed(() => getOptimalImageSrc(props.src, isMobile.value));

const handleLoad = () => {
  isLoaded.value = true;
};

const handleError = () => {
  hasError.value = true;
  console.warn(`Failed to load image: ${optimizedSrc.value}`);
};

onMounted(() => {
  if (props.priority) {
    preloadImage(optimizedSrc.value);
  }
});
</script>

<template>
  <div class="relative inline-block">
    <!-- Loading placeholder -->
    <div 
      v-if="!isLoaded && !hasError" 
      class="absolute inset-0 bg-gray-200 animate-pulse rounded"
    ></div>
    
    <!-- Actual image -->
    <img
      ref="imageRef"
      :src="optimizedSrc"
      :alt="alt"
      :loading="loading"
      :class="[
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        props.class
      ]"
      :sizes="sizes"
      @load="handleLoad"
      @error="handleError"
    />
    
    <!-- Error fallback -->
    <div 
      v-if="hasError" 
      class="flex items-center justify-center bg-gray-100 text-gray-500 text-sm p-4 rounded"
    >
      <i class="fas fa-image mr-2"></i>
      Imagen no disponible
    </div>
  </div>
</template>