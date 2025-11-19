<script lang="ts" setup>
import Container from './Container.vue';


defineProps<{
  title: string;
  subtitle?: string;
  description: string;
}>();
</script>

<template>
  <Container variant="green" customClass="relative presentation-container">
      <p class="text-4xl title-wedding title-section text-center mx-auto max-w-4xl px-5">
      {{ title }}
      <br>
      {{ subtitle}}
    </p>
    <div class="flex flex-col px-5 max-w-3xl mx-auto mt-6">
      <div class="border-t border-b border-gray-300 py-6 my-6 flex flex-col gap-4 items-center">
        <p class="text-xl text-center leading-relaxed" v-html="description"></p>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.presentation-container {
  position: relative;
  z-index: 10;
}

</style>