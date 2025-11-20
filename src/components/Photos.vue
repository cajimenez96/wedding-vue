<script lang="ts" setup>
import Button from './Button.vue';
import Container from './Container.vue';

defineProps<{
  title?: string;
  description?: string;
}>();

const handleUploadClick = () => {
  window.open('https://pupaeventos.com/77538113-55af-474a-a8c2-ec0bc3b82610', '_blank');
};
</script>

<template>
  <Container variant="white">
    <div class="flex flex-col gap-6 justify-center items-center text-center">
      <h2 class="text-4xl title-wedding title-section text-green-color">{{ title }}</h2>
      <div class="flex flex-col px-5 md:w-lg">
        <div class="border-t border-b border-gray-300 py-5 my-4 flex flex-col gap-4 items-center">
          <p class="text-xl text-center text-green-color" v-html="description"></p>
        </div>
      </div>

      <div class="photos-button-container">
        <Button variant="primary" @click="handleUploadClick">
          <i class="fas fa-camera me-2" aria-hidden="true"></i>
          Subir fotos
        </Button>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.me-2 {
  margin-right: 0.5rem;
}

.photos-button-container {
  width: 268px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.photos-button-container :deep(.button) {
  width: 268px;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 767px) {
  .photos-button-container {
    width: 268px;
  }
  
  .photos-button-container :deep(.button) {
    white-space: nowrap;
    width: 268px;
  }
}

.photos-button-container :deep(.button.gold:hover) {
  background-color: var(--green-color) !important;
  border-color: var(--green-color) !important;
  transform: translateY(-2px);
}
</style>