<script  lang="ts" setup>
  import 'vue3-carousel/carousel.css'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'

  import { ref } from 'vue'

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
    height: 320,
  }

  const thumbnailsConfig = {
    height: 100,
    itemsToShow: 6,
    wrapAround: true,
    touchDrag: false,
    gap: 10,
  }

</script>

<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
    <Slide v-for="image in images" :key="image.id">
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

.gallery-image {
  border-radius: 16px;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
</style>