<script lang="ts" setup>
import Button from './Button.vue';
import Container from './Container.vue';

const props = defineProps<{
  title: string;
  description?: string;
  location: string;
  startDate?: string;
}>();
</script>

<template>
  <Container variant="light">
    <p class="text-4xl title-wedding title-section text-green-color text-center mb-10">
      {{ props.title }}
    </p>

    <div class="date-time-info">
      <div class="date-time-grid">
        <div></div>
        <div class="flex flex-col items-center gap-2 date-time-item">
          <p class="text-3xl font-medium time-style">09</p>
          <p class="text-xl font-normal text-center">mayo</p>
        </div>
        <div class="flex items-center justify-center date-time-separator">
          <div class="w-0.5 h-16 bg-[#E5E7EB]"></div>
        </div>
        <div class="flex flex-col items-center gap-2 date-time-item">
          <p class="text-3xl font-medium time-style">14:00</p>
          <p class="text-xl font-normal text-center">hs</p>
        </div>
        <div></div>
      </div>
    </div>

    <div class="border-t border-b border-gray-300 py-5 mt-10 flex flex-col gap-4">
      <p class="text-2xl text-center font-medium">{{ props.location }}</p>
      <p class="text-xl text-center" v-html="props.description"></p>
    </div>
    <div class="events-buttons-container">
      <Button variant="outline">Confirmar asistencia</Button>
      <Button variant="primary">Como llegar</Button>
    </div>
  </Container>
</template>

<style scoped>
.date-time-info {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.date-time-grid {
  display: grid;
  grid-template-columns: 1fr auto auto auto 1fr;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.date-time-grid > div:nth-child(3) {
  margin-left: 0.5rem;
}

.date-time-grid > div:nth-child(2),
.date-time-grid > div:nth-child(4) {
  width: 80px;
}

.events-buttons-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1.25rem;
  justify-content: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.events-buttons-container :deep(button) {
  flex: 1;
}

@media (max-width: 1024px) {
  .events-buttons-container {
    flex-direction: column;
    max-width: none;
  }

  .events-buttons-container :deep(button) {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .date-time-grid {
    gap: 2rem;
  }

  .date-time-grid > div:nth-child(2),
  .date-time-grid > div:nth-child(4) {
    width: 70px;
  }
}
</style>