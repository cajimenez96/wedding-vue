<script lang="ts" setup>
type Variant = 'green' | 'light' | 'gold' | 'white';
type Size = 'default' | 'wide';
defineProps<{
  variant?: Variant;
  size?: Size;
  customClass?: string;
}>();

</script>

<template>
  <section :class="[
    'w-full min-h-[580px] flex items-center',
    variant === 'green' ? 'green-container' :
    variant === 'gold' ? 'gold-container' :
    variant === 'white' ? 'white-container' : 'light-container',
    ]">
    <div :class="[
      'w-full px-5 py-8 mx-auto',
      size === 'wide' ? 'md:w-3/4 lg:w-1/2' : 'md:w-1/2',
      customClass
    ]">
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

.gold-container {
  background: var(--gold-color);
  color: var(--alabaster-color);
}

.white-container {
  background: var(--white);
  color: var(--text-dark);
}
</style>