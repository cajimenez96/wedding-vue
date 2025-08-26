<script lang="ts" setup>
type Variant = 'primary' | 'outline' | 'link';

defineProps<{
  variant?: Variant;
}>();

const emit = defineEmits(['click']);

</script>

<template>
  <button
    :class="[
      'h-full w-full border-none py-4 cursor-pointer rounded-3xl text-lg button',
      variant === 'primary' && 'primary',
      variant === 'outline' && 'outline',
    ]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.primary {
  background: var(--green-color);
  color: var(--white);
}

.primary:hover {
  background: var(--gold-color);
  color: var(--white);
  transform: translateY(-3px);
}

.outline {
  background: transparent;
  border: 2px solid var(--green-color);
  color: var(--green-color);
}

.outline:hover {
  background: var(--green-color);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 99, 96, 0.3);
}
</style>