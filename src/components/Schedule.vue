<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import mainEvent from '../assets/images/mainEvent.webp';
import dishes from '../assets/images/dishes.webp';
import cake from '../assets/images/cake.webp';
import songs from '../assets/images/songs.webp';
import photo from '../assets/images/photo.webp';
import festivity from '../assets/images/festivity.webp';

const activeIndex = ref(-1);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleScroll = () => {
  if (!isMobile.value) return;
  
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
  <section class="flex flex-col justify-center items-center text-center min-h-[690px] mx-auto mb-10 px-8">
    <div class="flex flex-col gap-10 justify-center items-center">
      <h2 class="text-4xl title-wedding title-section mb-10">Programa del día</h2>
      
      <div class="schedule-timeline max-w-6xl w-full">
        <div 
          v-for="(item, index) in scheduleItems" 
          :key="index"
          :class="[
            'schedule-item', 
            { 'schedule-item-reverse': index % 2 === 1 },
            { 'schedule-item-active': activeIndex === index }
          ]"
          @mouseenter="!isMobile && (activeIndex = index)"
          @mouseleave="!isMobile && (activeIndex = -1)"
        >
          <div class="schedule-time">
            <span class="time-text" :class="{ 'time-visible': activeIndex === index }">{{ item.time }}</span>
          </div>
          
          <div class="schedule-connector">
            <div class="schedule-dot"></div>
            <div v-if="index < scheduleItems.length - 1" class="schedule-line"></div>
          </div>
          
          <div 
            :class="['schedule-content', {
              'align-left': ['Cóctel', 'Recepción', 'Fiesta'].includes(item.title),
              'align-right': ['Ceremonia', 'Almuerzo', 'Fin de fiesta'].includes(item.title)
            }]"
          >
            <div class="schedule-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="schedule-text">
              <h3 class="schedule-title">{{ item.title }}</h3>
              <p class="schedule-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.schedule-timeline {
  position: relative;
}

.schedule-item {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center;
}

.schedule-item-reverse {
  grid-template-columns: 1fr 60px 1fr;
}

.schedule-item-reverse .schedule-time {
  order: 3;
  text-align: left;
}

.schedule-item-reverse .schedule-connector {
  order: 2;
}

.schedule-content {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.schedule-item-reverse .schedule-content {
  order: 1;
}

.schedule-time {
  display: flex;
  justify-content: center;
  align-items: center;
}


.schedule-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
}

.schedule-dot {
  width: 12px;
  height: 12px;
  background: var(--primary-color, #8B5A3C);
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

.schedule-line {
  width: 2px;
  height: 80px;
  background: var(--primary-color, #8B5A3C);
  opacity: 0.2;
  margin-top: 8px;
}


.schedule-item-reverse .schedule-content {
  flex-direction: row-reverse;
}

.schedule-image {
  width: 94px;
  height: 94px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}



.schedule-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 8px;
}

.schedule-text {
  flex: 1;
}

.schedule-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #697368;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.schedule-description {
  font-size: 0.875rem;
  color: var(--text-medium, #6B7280);
  line-height: 1.4;
  transition: color 0.3s ease;
}

.time-text {
  font-size: 1.5rem;
  font-weight: 500;
  color: #697368;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateX(-20px);
}

.time-visible {
  opacity: 1;
  transform: translateX(0);
}

.schedule-item-active .time-text.time-visible {
  color: #736D4F;
}

.schedule-item-active .schedule-title {
  color: #D97706;
}

.schedule-item-active .schedule-description {
  color: #374151;
}

.schedule-item-active .schedule-image {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .schedule-item {
    grid-template-columns: 80px 40px 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .schedule-item-reverse {
    grid-template-columns: 80px 40px 1fr;
  }
  
  .schedule-item-reverse .schedule-time {
    order: 1;
    text-align: center;
  }
  
  .schedule-item-reverse .schedule-connector {
    order: 2;
  }
  
  .schedule-item-reverse .schedule-content {
    order: 3;
    text-align: left;
    flex-direction: row;
  }
  
  .schedule-content {
    text-align: left !important;
  }
  
  .time-text {
    font-size: 1.125rem;
  }
  
  .schedule-dot {
    width: 10px;
    height: 10px;
  }
  
  .schedule-line {
    width: 1px;
    height: 60px;
  }
  
  .schedule-image {
    width: 71px;
    height: 71px;
  }
  
  .schedule-title {
    font-size: 1.125rem;
  }
  
  .schedule-description {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .schedule-item {
    grid-template-columns: 70px 30px 1fr;
    gap: 0.5rem;
  }
  
  .time-text {
    font-size: 1rem;
  }
  
  .schedule-dot {
    width: 8px;
    height: 8px;
  }
  
  .schedule-image {
    width: 58px;
    height: 58px;
  }
}
</style>