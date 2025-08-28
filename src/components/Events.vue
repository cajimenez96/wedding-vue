<script lang="ts" setup>
import Separator from './Separator.vue';
import Button from './Button.vue';
import Container from './Container.vue';

defineProps<{
  title: string;
  description?: string;
  location: string;
  startDate: string;
}>();
</script>

<template>
  <Container variant="light">
    <p class="text-4xl title-wedding title-section text-green-color text-center mb-10">
      {{ title }}
    </p>
    <div class="flex justify-center">
      <div class="flex flex-col items-center gap-2">
        <p class="text-3xl font-medium time-style">09</p>
        <p class="text-xl font-normal text-center">mayo</p>
      </div>
      <Separator :class="['max-w-[100px] rotate-90']" />
      <div class="flex flex-col items-center gap-2">
        <p class="text-3xl font-medium time-style">14:00</p>
        <p class="text-xl font-normal text-center">hs</p>
      </div>
    </div>
    <div class="border-t border-b border-gray-300 py-5 mt-10 flex flex-col gap-4">
      <p class="text-2xl text-center font-medium">{{ location }}</p>
      <p class="text-xl text-center" v-html="description"></p>
    </div>
    <div class="events-buttons-container">
      <Button variant="outline">Confirmar asistencia</Button>
      <Button variant="primary">Como llegar</Button>
    </div>
  </Container>
</template>

<style scoped>
.text-style {
  color: var(--text-medium);
}

.events-buttons-container {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1.25rem;
}

@media (max-width: 768px) {
  .events-buttons-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .events-buttons-container :deep(button) {
    width: 100%;
  }
}
</style>