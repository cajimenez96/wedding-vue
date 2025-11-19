<template>
  <div class="photoswipe-gallery">
    <div class="gallery-container">
      <div 
        ref="galleryRef" 
        class="justified-gallery"
        :style="{ transform: `translateX(-${currentPage * 100}%)` }"
      >
        <div 
          v-for="(page, pageIndex) in paginatedImages" 
          :key="pageIndex"
          class="gallery-page"
        >
          <a
            v-for="(image, index) in page"
            :key="image.id"
            :href="image.url"
            :data-pswp-width="image.width"
            :data-pswp-height="image.height"
            class="gallery-item"
            @click.prevent="openPhotoSwipe(pageIndex * imagesPerPage + index)"
          >
            <img 
              :src="image.url" 
              :alt="`Imagen ${pageIndex * imagesPerPage + index + 1}`"
              class="gallery-image"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-controls">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 0"
        class="pagination-btn prev-btn"
        aria-label="Página anterior"
      >
        ‹
      </button>
      
      <div class="pagination-dots">
        <button
          v-for="page in totalPages"
          :key="page - 1"
          @click="goToPage(page - 1)"
          :class="['pagination-dot', { active: currentPage === page - 1 }]"
          :aria-label="`Ir a página ${page}`"
        />
      </div>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages - 1"
        class="pagination-btn next-btn"
        aria-label="Página siguiente"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

interface ImageItem {
  url: string;
  id: string;
  width: number;
  height: number;
}

const props = defineProps<{
  images: Array<{ url: string; id: string }>;
}>();

const galleryRef = ref<HTMLElement>();
const processedImages = ref<ImageItem[]>([]);
const currentPage = ref(0);
const imagesPerPage = 3;

const totalPages = computed(() => Math.ceil(processedImages.value.length / imagesPerPage));

const paginatedImages = computed(() => {
  const pages = [];
  for (let i = 0; i < processedImages.value.length; i += imagesPerPage) {
    pages.push(processedImages.value.slice(i, i + imagesPerPage));
  }
  return pages;
});

const scrollToGalleryTop = () => {
  if (window.innerWidth <= 1024) {
    const galleryElement = galleryRef.value?.closest('.photoswipe-gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    scrollToGalleryTop();
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    scrollToGalleryTop();
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  scrollToGalleryTop();
};

const loadImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
    };
    img.src = src;
  });
};

const processImages = async () => {
  const processed = await Promise.all(
    props.images.map(async (image) => {
      const dimensions = await loadImageDimensions(image.url);
      return {
        ...image,
        ...dimensions,
      };
    })
  );
  processedImages.value = processed;
};

const openPhotoSwipe = (index: number) => {
  const pswp = new PhotoSwipe({
    dataSource: processedImages.value.map(img => ({
      src: img.url,
      width: img.width,
      height: img.height,
    })),
    index,
    showHideAnimationType: 'zoom',
    bgOpacity: 0.9,
    spacing: 0.1,
    allowPanToNext: true,
    zoom: true,
    close: true,
    arrowKeys: true,
    escKey: true,
    clickToCloseNonZoomable: true,
    imageClickAction: 'zoom-or-close',
    tapAction: 'toggle-controls',
    doubleTapAction: 'zoom',
    preload: [1, 3],
  });
  
  pswp.init();
};

onMounted(() => {
  processImages();
});
</script>

<style scoped>
.photoswipe-gallery {
  width: 100%;
}

@media (min-width: 769px) {
  .photoswipe-gallery {
    padding-top: 20px;
  }
}

.gallery-container {
  overflow: hidden;
  width: 100%;
}

.justified-gallery {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.gallery-page {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;
  flex-shrink: 0;
  min-width: 100%;
  align-items: center;
  justify-content: center;
}

.gallery-page .gallery-item:first-child {
  margin-left: 40px;
}

.gallery-page .gallery-item:last-child {
  margin-right: 40px;
}

.gallery-item {
  max-height: 400px;
  max-width: 400px;
  min-height: 200px;
  min-width: 200px;
  height: auto;
  width: auto;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.gallery-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  object-position: center;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.1);
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding: 20px 0;
}

.pagination-btn {
  background: var(--green-color);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--gold-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}

.pagination-dots {
  display: flex;
  gap: 12px;
}

.pagination-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--green-color);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot.active {
  background: var(--green-color);
  transform: scale(1.2);
}

.pagination-dot:hover {
  background: var(--gold-color);
  border-color: var(--gold-color);
}

@media (max-width: 1024px) {
  .gallery-page {
    display: flex;
    flex-direction: row;
    gap: 15px;
    max-width: 1200px;
    padding: 30px 0 20px 0;
    align-items: center;
    justify-content: center;
  }

  .gallery-item {
    height: 220px;
    aspect-ratio: 1/1;
  }

  .gallery-page .gallery-item:first-child {
    margin-left: 30px;
  }

  .gallery-page .gallery-item:last-child {
    margin-right: 30px;
  }
}

@media (max-width: 768px) {
  .gallery-page {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 30px 0 20px 0;
    max-width: 900px;
    margin-left: 0;
    align-items: center;
    justify-content: center;
  }

  .gallery-item {
    height: 200px;
    aspect-ratio: 1/1;
    border-radius: 8px;
  }

  .gallery-page .gallery-item:first-child {
    margin-left: 0;
  }

  .gallery-page .gallery-item:last-child {
    margin-right: 0;
  }

  .pagination-btn {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  .pagination-controls {
    margin-top: 30px;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .gallery-page {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px 0 20px 0;
    max-width: 600px;
    margin-left: 0;
    align-items: center;
    justify-content: center;
  }

  .gallery-item {
    height: 280px;
    aspect-ratio: 1/1;
  }

  .gallery-page .gallery-item:first-child {
    margin-left: 0;
  }

  .gallery-page .gallery-item:last-child {
    margin-right: 0;
  }

  .pagination-btn {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .pagination-dot {
    width: 14px;
    height: 14px;
  }
}

/* Optimización específica para Realme X3 SuperZoom y pantallas similares (2400x1080) */
@media only screen 
  and (min-width: 360px) 
  and (max-width: 412px) 
  and (min-height: 700px) 
  and (max-height: 915px) {
  
  .photoswipe-gallery {
    padding-top: 15px;
  }

  .gallery-page {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 25px 0 20px 0;
    max-width: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: flex-start;
  }

  .gallery-item {
    height: 320px;
    width: 90%;
    max-width: 340px;
    aspect-ratio: 1/1;
    border-radius: 10px;
    margin: 0 auto;
  }

  .gallery-page .gallery-item:first-child {
    margin-left: auto;
    margin-right: auto;
  }

  .gallery-page .gallery-item:last-child {
    margin-left: auto;
    margin-right: auto;
  }

  .gallery-image {
    object-fit: cover;
    object-position: center;
  }

  .pagination-controls {
    margin-top: 25px;
    gap: 12px;
    padding: 15px 0;
  }

  .pagination-btn {
    width: 42px;
    height: 42px;
    font-size: 19px;
  }

  .pagination-dot {
    width: 13px;
    height: 13px;
    border-width: 2px;
  }

  .pagination-dot.active {
    transform: scale(1.3);
  }
}

/* Ajuste adicional para orientación landscape en Realme X3 */
@media only screen 
  and (min-width: 700px) 
  and (max-width: 915px) 
  and (min-height: 360px) 
  and (max-height: 412px) 
  and (orientation: landscape) {
  
  .gallery-page {
    flex-direction: row;
    gap: 12px;
    padding: 20px 0;
  }

  .gallery-item {
    height: 240px;
    width: auto;
    max-width: 240px;
  }

  .gallery-page .gallery-item:first-child {
    margin-left: 15px;
  }

  .gallery-page .gallery-item:last-child {
    margin-right: 15px;
  }
}

:global(.pswp) {
  --pswp-bg: rgba(0, 0, 0, 0.9);
}

:global(.pswp__img) {
  max-width: none;
  max-height: none;
}
</style>