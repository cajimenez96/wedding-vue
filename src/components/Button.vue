<script lang="ts" setup>
type Variant = 'primary' | 'outline' | 'link' | 'white';

defineProps<{
  variant?: Variant;
}>();

const emit = defineEmits(['click']);

</script>

<template>
  <button
    :class="[
      'w-full border-none cursor-pointer rounded-3xl text-lg button',
      variant === 'primary' && 'primary',
      variant === 'outline' && 'outline',
      variant === 'white' && 'white',
    ]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  height: 63.2px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
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

.white {
  background: var(--white);
  color: var(--green-color);
  border: 2px solid var(--white);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.white:hover {
  background: var(--gold-color);
  border-color: var(--gold-color);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(191, 168, 128, 0.3);
}
</style>