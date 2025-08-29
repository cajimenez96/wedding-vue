<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Container from './Container.vue';
import mainEvent from '../assets/images/mainEvent.webp';
import dishes from '../assets/images/dishes.webp';
import cake from '../assets/images/cake.webp';
import songs from '../assets/images/songs.webp';
import photo from '../assets/images/photo.webp';
import festivity from '../assets/images/festivity.webp';

const activeIndex = ref(-1);
const isMobile = ref(false);
const isTablet = ref(false);

const checkMobile = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 768;
  isTablet.value = width > 768 && width <= 1024;
};

const handleScroll = () => {
  if (!isMobile.value && !isTablet.value) return;
  
  const items = document.querySelectorAll('.schedule-item');
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  
  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top + scrollTop;
    const itemCenter = itemTop + rect.height / 2;
    
    if (itemCenter >= scrollTop && itemCenter <= scrollTop + windowHeight * 0.6) {
      activeIndex.value = index;
    }
  });
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  window.removeEventListener('scroll', handleScroll);
});

const scheduleItems = [
  {
    time: '14:00',
    title: 'Cóctel',
    description: 'Bienvenida y aperitivos',
    image: dishes
  },
  {
    time: '14:30',
    title: 'Ceremonia',
    description: 'Intercambio de votos y anillos',
    image: mainEvent
  },
  {
    time: '15:00',
    title: 'Recepción',
    description: 'Felicitaciones y fotografías',
    image: photo
  },
  {
    time: '16:00',
    title: 'Almuerzo',
    description: 'Menú especial de celebración',
    image: cake
  },
  {
    time: '18:30',
    title: 'Fiesta',
    description: 'Música y baile',
    image: songs
  },
  {
    time: '22:00',
    title: 'Fin de fiesta',
    description: 'Despedida y agradecimientos',
    image: festivity
  }
];
</script>

<template>
  <Container variant="green" customClass="md:w-4/5 lg:w-3/4">
    <section class="flex flex-col justify-center items-center text-center mb-10">
    <div class="flex flex-col gap-10 justify-center items-center">
      <h2 class="text-4xl title-wedding title-section mb-10">Programa del día</h2>
      
      <div class="relative max-w-6xl w-full">
        <div 
          v-for="(item, index) in scheduleItems" 
          :key="index"
          :class="[
            'grid grid-cols-[1fr_60px_1fr] gap-8 mb-12 items-center schedule-item', 
            { 'schedule-item-reverse': index % 2 === 1 },
            { 'schedule-item-active': activeIndex === index }
          ]"
          @mouseenter="!isMobile && !isTablet && (activeIndex = index)"
          @mouseleave="!isMobile && !isTablet && (activeIndex = -1)"
        >
          <div class="flex justify-center items-center">
            <span class="text-2xl font-medium text-white transition-all duration-400" :class="[
              isMobile || isTablet ? 'opacity-70' : 'opacity-0 -translate-x-2',
              { 'time-visible': activeIndex === index }
            ]">{{ item.time }}</span>
          </div>
          
          <div class="flex flex-col items-center h-full relative">
            <div class="w-3 h-3 bg-white rounded-full relative z-[2]"></div>
            <div v-if="index < scheduleItems.length - 1" class="w-0.5 h-20 bg-white opacity-30 mt-2"></div>
          </div>
          
          <div 
            :class="['flex gap-4 items-center', {
              'text-left': ['Cóctel', 'Recepción', 'Fiesta'].includes(item.title),
              'text-right': ['Ceremonia', 'Almuerzo', 'Fin de fiesta'].includes(item.title)
            }]"
          >
            <div class="w-[94px] h-[94px] flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden schedule-image">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-contain object-center p-2 schedule-img" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-white mb-1 transition-colors duration-300 schedule-title">{{ item.title }}</h3>
              <p class="text-sm text-gray-200 leading-tight transition-colors duration-300 schedule-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  </Container>
</template>

<style scoped>
.schedule-item-reverse .flex:first-child {
  order: 3;
  text-align: left;
}

.schedule-item-reverse .flex:nth-child(2) {
  order: 2;
}

.schedule-item-reverse .flex:last-child {
  order: 1;
  flex-direction: row-reverse;
}

.time-visible {
  opacity: 1;
  transform: translateX(0);
}

.schedule-item-active .time-visible {
  color: var(--gold-color);
}

.schedule-item-active .schedule-title {
  color: var(--gold-color);
}

.schedule-item-active .schedule-description {
  color: white;
}

.schedule-img {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.schedule-item:hover .schedule-img,
.schedule-item-active .schedule-img {
  filter: none;
}

.schedule-item-active .schedule-image {
  transform: scale(1.05);
}

/* Tablet breakpoint - mantiene el diseño desktop pero con ajustes */
@media (max-width: 1024px) and (min-width: 769px) {
  .relative.max-w-6xl {
    max-width: 95% !important;
    margin: 0 auto;
  }
  
  .grid {
    gap: 1.25rem !important;
    margin-bottom: 2rem !important;
  }
  
  .text-2xl {
    font-size: 1.125rem !important;
  }
  
  .w-\[94px\].h-\[94px\] {
    width: 75px !important;
    height: 75px !important;
  }
  
  .text-xl {
    font-size: 1rem !important;
  }
  
  .text-sm {
    font-size: 0.85rem !important;
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 80px 40px 1fr !important;
    gap: 1rem !important;
    margin-bottom: 2rem !important;
  }
  
  .schedule-item-reverse .flex:first-child {
    order: 1 !important;
    text-align: center !important;
  }
  
  .schedule-item-reverse .flex:nth-child(2) {
    order: 2 !important;
  }
  
  .schedule-item-reverse .flex:last-child {
    order: 3 !important;
    text-align: left !important;
    flex-direction: row !important;
  }
  
  .flex.gap-4 {
    text-align: left !important;
  }
  
  .text-2xl {
    font-size: 1.125rem !important;
  }
  
  .w-3.h-3 {
    width: 10px !important;
    height: 10px !important;
  }
  
  .w-0\.5.h-20 {
    width: 1px !important;
    height: 60px !important;
  }
  
  .w-\[94px\].h-\[94px\] {
    width: 71px !important;
    height: 71px !important;
  }
  
  .text-xl {
    font-size: 1.125rem !important;
  }
  
  .text-sm {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 70px 30px 1fr !important;
    gap: 0.5rem !important;
  }
  
  .text-2xl {
    font-size: 1rem !important;
  }
  
  .w-3.h-3 {
    width: 8px !important;
    height: 8px !important;
  }
  
  .w-\[94px\].h-\[94px\] {
    width: 58px !important;
    height: 58px !important;
  }
}
</style>