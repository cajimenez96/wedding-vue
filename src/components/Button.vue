<script lang="ts" setup>

const emit = defineEmits(['click']);

</script>

<template>
  <button class="btn button" @click="emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  cursor: pointer;
}

.button {
  background: var(--primary-green);
  color: var(--white);
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.button:hover {
  background: var(--secondary-brown);
  color: var(--white);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 111, 71, 0.4);
}
</style>