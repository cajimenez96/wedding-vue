<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import Gift from '../assets/lottie/gift.json';
import Button from './Button.vue';
import CustomModal from './CustomModal.vue';
import { ref } from 'vue';

defineProps<{
  title?: string;
  description?: string;
}>();

const showModal = ref(false);
</script>

<template>
  <section class="flex gap-8 justify-center items-center text-center min-h-[690px] mx-auto">
    <div class="flex flex-col gap-10 justify-center items-center px-8">
      <Vue3Lottie :animationData="Gift" :height="80" :width="80" />
      <h2 class="text-4xl title-wedding title-section mb-10">{{ title }}</h2>
      <div class="flex flex-col px-5 md:w-lg">
        <div class="border-t border-b border-gray-300 py-5 mt-10 flex flex-col gap-4">
          <p class="text-xl" v-html="description"></p>
        </div>
      </div>

      <div class="w-4/5">
        <Button variant="primary" @click="showModal = true">Más información</Button>
      </div>
    </div>
  </section>
  <CustomModal v-model="showModal">
    <div class="p-8">
      <h2 class="text-3xl title-wedding title-section mb-10">¡Gracias por ayudarnos en este momento!</h2>
      <p class="font-light">Descripción o contenido personalizado aquí.</p>
    </div>
</CustomModal>
</template>

<style scoped>

</style>