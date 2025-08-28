<script lang="ts" setup>
type Variant = 'green' | 'light';
defineProps<{
  variant?: Variant;
  customClass?: string;
}>();

</script>

<template>
  <section :class="[
    'w-full flex items-center',
    variant === 'green' ? 'green-container' : 'light-container',
    ]">
    <div :class="['w-full md:w-1/2 px-5 py-8 mx-auto', customClass]">
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.green-container {
  background: var(--green-color);
  color: var(--alabaster-color);
}

.light-container {
  background: var(--alabaster-color);
  color: var(--green-color);
}
</style>