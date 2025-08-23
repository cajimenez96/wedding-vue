<script lang="ts" setup>
defineProps<{
  customClass?: string;
}>();
</script>

<template>
  <div :class="['w-full h-0.5 bg-[#E5E7EB] my-10', customClass]" />
</template>

<style scoped>

</style>