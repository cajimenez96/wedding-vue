<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-icon">
          <i class="fas fa-music" aria-hidden="true"></i>
        </div>
        
        <h3 class="modal-title">¡Bienvenidos a nuestra boda!</h3>
        
        <p class="modal-description">
          ¿Te gustaría escuchar música de fondo mientras navegas por nuestra página?
        </p>
        
        <div class="modal-buttons">
          <button @click="handleChoice(true)" class="modal-button primary">
            <i class="fas fa-volume-up me-2" aria-hidden="true"></i>
            Sí, con música
          </button>
          
          <button @click="handleChoice(false)" class="modal-button secondary">
            <i class="fas fa-volume-mute me-2" aria-hidden="true"></i>
            Sin música
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'music-preference', value: boolean): void;
}>();

const showModal = ref(false);

const handleChoice = (withMusic: boolean) => {
  showModal.value = false;
  emit('music-preference', withMusic);
};

onMounted(() => {
  // Mostrar modal después de un pequeño delay
  setTimeout(() => {
    showModal.value = true;
  }, 500);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 400px;
  width: calc(100vw - 2rem);
  margin: 1rem;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-content {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.modal-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--green-color), var(--gold-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(74, 99, 96, 0.3);
}

.modal-title {
  font-family: 'Sail', cursive;
  font-size: 1.8rem;
  color: var(--text-dark);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.modal-description {
  font-size: 1rem;
  color: var(--text-medium);
  line-height: 1.6;
  margin: 0;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
}

.modal-button {
  flex: 1;
  min-width: 160px;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.modal-button.primary {
  background: var(--green-color);
  color: var(--white);
  box-shadow: 0 4px 12px rgba(74, 99, 96, 0.3);
}

.modal-button.primary:hover {
  background: var(--gold-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(191, 168, 128, 0.4);
}

.modal-button.secondary {
  background: rgba(74, 99, 96, 0.1);
  color: var(--green-color);
  border: 1px solid rgba(74, 99, 96, 0.2);
}

.modal-button.secondary:hover {
  background: rgba(74, 99, 96, 0.15);
  border-color: var(--green-color);
  transform: translateY(-1px);
}

.me-2 {
  margin-right: 0.5rem;
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    gap: 1.25rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-description {
    font-size: 0.9rem;
  }
  
  .modal-buttons {
    flex-direction: column;
  }
  
  .modal-button {
    min-width: auto;
    font-size: 0.9rem;
  }
}
</style>