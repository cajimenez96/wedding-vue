<script lang="ts" setup>
import Separator from './Separator.vue';
import Button from './Button.vue';
import Event from '../assets/lottie/event.json';
import { Vue3Lottie } from 'vue3-lottie'

defineProps<{
  title: string;
  location: string;
  startDate: string;
}>();
</script>

<template>
  <section class="flex gap-8 justify-center items-center text-center min-h-[690px] mx-auto mb-10">
    <div class="flex flex-col gap-10 justify-center items-center px-8">
      <Vue3Lottie :animationData="Event" :height="80" :width="80" />
      <h2 class="text-4xl title-wedding title-section mb-10">{{ title }}</h2>
      <div class="flex flex-col px-5 md:w-lg">
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
          <p class="text-2xl font-medium">{{ location }}</p>
          <p class="text-lg text-center">La Casona de Campo es un salón de eventos al aire libre que tiene todo lo que necesita para crear una ocasión especial e inolvidable para usted y sus invitados. </p>
        </div>
      </div>
      <div class="flex gap-2 w-full mt-5">
        <Button variant="outline">Confirmar asistencia</Button>
        <Button variant="primary">Como llegar</Button>
      </div>
    </div> 
  </section>
</template>

<style scoped>
.text-style {
  color: var(--text-medium);
}
</style>