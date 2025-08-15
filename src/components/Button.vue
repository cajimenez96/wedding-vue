<script lang="ts" setup>
type Variant = 'primary' | 'outline' | 'link';

defineProps<{
  variant?: Variant;
}>();

const emit = defineEmits(['click']);

</script>

<template>
  <button
    class="w-full border-none cursor-pointer"
    :class="[
      'w-full h-full py-4 cursor-pointer rounded-3xl text-lg button',
      variant === 'primary' && 'primary',
      variant === 'outline' && 'outline'
    ]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  letter-spacing: 1px;
}
.primary {
  background: var(--primary-green);
  color: var(--white);
  transition: all 0.3s ease;
}

.primary:hover {
  background: var(--secondary-gold);
  color: var(--white);
  transform: translateY(-3px);
}
</style>