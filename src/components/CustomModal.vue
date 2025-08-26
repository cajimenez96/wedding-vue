<template>
  <div v-if="modelValue" class="modal-overlay px-4" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">×</button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

function close() {
  emit('update:modelValue', false);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  padding: 2rem;
  min-width: 320px;
  max-width: 90vw;
  position: relative;
}
.modal-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.modal-body {
  margin-bottom: 1.5rem;
}
.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
