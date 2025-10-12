<script setup lang="ts">
import Container from './Container.vue';
import Button from './Button.vue';

defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <Container variant="light">
    <div class="confirm-assistance-content">
      <div v-if="title" class="text-center mb-10">
        <h2 class="text-4xl title-wedding title-section text-green-color">{{ title }}</h2>
      </div>

      <div v-if="description" class="flex flex-col px-5 md:w-lg">
        <div class="border-t border-b border-gray-300 py-5 my-4 flex flex-col gap-4 items-center">
          <p class="text-xl text-center" v-html="description"></p>
        </div>
      </div>

      <div class="confirm-button-container">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScOpkVBWVGbN88ihi--89fNh3-eStIgA6tzTdP037o93OFh1w/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary">
            <i class="fas fa-heart me-2" aria-hidden="true"></i>
            Confirma tu Asistencia
          </Button>
        </a>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.confirm-assistance-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.confirm-button-container {
  width: 268px;
  margin: 2rem auto 0;
  display: flex;
  justify-content: center;
}

.confirm-button-container :deep(.button) {
  width: 268px;
  position: relative;
  z-index: 1;
}

@media (max-width: 767px) {
  .confirm-button-container {
    width: 268px;
    margin: 1.5rem auto 0;
  }

  .confirm-button-container :deep(.button) {
    white-space: nowrap;
    width: 268px;
  }
}

@media (max-width: 480px) {
  .confirm-button-container {
    width: 268px;
    margin: 1.5rem auto 0;
  }

  .confirm-button-container :deep(.button) {
    width: 268px;
  }
}
</style>