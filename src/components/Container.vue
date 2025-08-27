<script lang="ts" setup>
type Variant = 'green' | 'light';
defineProps<{
  variant?: Variant;
  customClass?: string;
}>();

</script>

<template>
  <section :class="[
    'w-full min-h-[490px] flex items-center',
    variant === 'green' ? 'green-container' : 'light-container',
    ]">
    <div :class="['container px-5 py-10 mx-auto', customClass]">
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