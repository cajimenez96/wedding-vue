<script lang="ts" setup>
defineProps<{
  customClass?: string;
}>();

</script>

<template>
  <div :class="['container mx-auto p-4', customClass]">
    <slot/>
  </div>
</template>

<style scoped>
.container {
  background: var(--white);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}

</style>