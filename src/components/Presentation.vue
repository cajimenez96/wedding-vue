<script lang="ts" setup>
import Container from './Container.vue';

defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <Container variant="green">
    <p class="text-4xl title-wedding title-section text-center">
      {{ title }}
    </p>  
    <p class="my-10 text-xl text-center" v-html="description"></p>
  </Container>
</template>

<style>

</style>