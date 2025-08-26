<script  lang="ts" setup>
  import 'vue3-carousel/carousel.css'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'

  import { ref, onMounted, onUnmounted } from 'vue'

  type Slide = 'fade' | 'slide';

defineProps<{
  images: {url: string, id: string}[]
}>();
  const currentSlide = ref(0)

  const slideTo = (nextSlide: number) => (currentSlide.value = nextSlide)

  const galleryConfig = {
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade' as Slide,
    mouseDrag: false,
    touchDrag: false,
    height: 400,
  }

  const thumbnailsConfig = ref({
    height: 100,
    itemsToShow: 6,
    wrapAround: true,
    touchDrag: false,
    gap: 10,
  })

  const updateThumbnailsConfig = () => {
    const width = window.innerWidth;
    
    if (width <= 768) {
      // Mobile
      thumbnailsConfig.value = {
        height: 120,
        itemsToShow: 3,
        wrapAround: true,
        touchDrag: false,
        gap: 15,
      };
    } else if (width <= 1024) {
      // Tablet
      thumbnailsConfig.value = {
        height: 110,
        itemsToShow: 4,
        wrapAround: true,
        touchDrag: false,
        gap: 12,
      };
    } else {
      // Desktop
      thumbnailsConfig.value = {
        height: 100,
        itemsToShow: 6,
        wrapAround: true,
        touchDrag: false,
        gap: 10,
      };
    }
  };

  onMounted(() => {
    updateThumbnailsConfig();
    window.addEventListener('resize', updateThumbnailsConfig);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateThumbnailsConfig);
  });

</script>

<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide" class="gallery-carousel">
    <Slide v-for="image in images" :key="image.id" class="gallery-slide">
      <img :src="image.url" alt="Gallery Image" class="gallery-image" />
    </Slide>
  </Carousel>

  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
    <Slide v-for="image in images" :key="image.id">
      <template #default="{ currentIndex, isActive }">
        <div
          :class="['thumbnail', { 'is-active': isActive }]"
          @click="slideTo(currentIndex)"
        >
          <img :src="image.url" alt="Thumbnail Image" class="thumbnail-image" />
        </div>
      </template>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.gallery-carousel {
  width: 100%;
}

.gallery-slide {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.gallery-image {
  border-radius: 16px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  max-height: 400px;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
  border-color: var(--green-color);
  transform: scale(1.05);
}

.thumbnail-image {
  border-radius: 6px;
}

/* Responsive thumbnail styles */
@media (max-width: 768px) {
  .thumbnail {
    min-height: 120px;
    border-width: 3px;
  }
  
  .thumbnail:hover,
  .thumbnail.is-active {
    transform: scale(1.08);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .thumbnail {
    min-height: 110px;
  }
  
  .thumbnail:hover,
  .thumbnail.is-active {
    transform: scale(1.06);
  }
}
</style>