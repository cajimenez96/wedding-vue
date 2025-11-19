<script lang="ts" setup>
import Button from './Button.vue';
import Container from './Container.vue';
import { ref } from 'vue';
import dressCodeImage from '../assets/images/back/diamond.png';

defineProps<{
  title?: string;
  description?: string;
}>();

const showModal = ref(false);

const handleClose = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="dress-code-section-container">
    <Container variant="gold">
      <div class="flex flex-col gap-6 justify-center items-center text-center">
        <img :src="dressCodeImage" alt="Decoración" class="dress-code-decoration-image" />
        <h2 class="text-4xl title-wedding title-section">{{ title }}</h2>
        <div class="flex flex-col px-5 w-3/4 md:w-lg">
          <div class="border-t border-b border-gray-300 py-5 my-4 flex flex-col gap-4 items-center">
            <p class="text-xl text-center" v-html="description"></p>
          </div>
        </div>

        <div class="dress-code-button-container">
          <Button variant="white" @click="showModal = true">Tips de vestimenta</Button>
        </div>
      </div>
    </Container>
  </div>

  <!-- DressCode Modal siguiendo el patrón de otros modales -->
  <div v-if="showModal" class="modal-overlay" @click.self="handleClose">
    <div class="modal-container">
      <div class="modal-content">
        <button class="modal-close" @click="handleClose">×</button>
        <div class="modal-icon">
          <i class="fas fa-user-tie" aria-hidden="true"></i>
        </div>
        
        <h3 class="modal-title">Código de vestimenta</h3>
        
        <p class="modal-description">
          Para que todos nos veamos elegantes y en armonía, te sugerimos el siguiente código de vestimenta:
        </p>
        
        <div class="dress-code-info">
          <div class="dress-code-section">
            <h4 class="dress-code-section-title">Para Mujeres</h4>
            <div class="dress-code-option">
              <h5 class="dress-code-option-title">Colores recomendados</h5>
              <p class="dress-code-option-details">
                Tonos pasteles, dorados, verdes suaves, azul marino, burgundy
              </p>
            </div>
            <div class="dress-code-option">
              <h5 class="dress-code-option-title">Evitar</h5>
              <p class="dress-code-option-details">
                Blanco, crema, beige y estampados muy llamativos
              </p>
            </div>
          </div>

          <div class="dress-code-section">
            <h4 class="dress-code-section-title">Para Hombres</h4>
            <div class="dress-code-option">
              <h5 class="dress-code-option-title">Recomendado</h5>
              <p class="dress-code-option-details">
                Traje oscuro o camisa con pantalón de vestir, corbata o moño opcional
              </p>
            </div>
            <div class="dress-code-option">
              <h5 class="dress-code-option-title">Colores</h5>
              <p class="dress-code-option-details">
                Azul marino, gris, negro, o tonos tierra
              </p>
            </div>
          </div>
        </div>
        
        <div class="modal-buttons">
          <button @click="handleClose" class="modal-button primary">
            <i class="fas fa-check me-2" aria-hidden="true"></i>
            ¡Perfecto!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

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
  max-width: 450px;
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
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.modal-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--green-color), var(--gold-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.2rem;
  box-shadow: 0 8px 20px rgba(74, 99, 96, 0.3);
}

.modal-title {
  font-family: 'Sail', cursive;
  font-size: 1.2rem;
  color: var(--text-dark);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.modal-description {
  font-size: 0.85rem;
  color: var(--text-medium);
  line-height: 1.4;
  margin: 0;
}

.dress-code-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0.2rem 0;
}

.dress-code-section {
  background: rgba(74, 99, 96, 0.03);
  border: 1px solid rgba(74, 99, 96, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: left;
}

.dress-code-section-title {
  font-weight: 600;
  color: var(--green-color);
  margin: 0 0 0.6rem 0;
  font-size: 0.95rem;
  text-align: center;
}

.dress-code-option {
  margin-bottom: 0.6rem;
}

.dress-code-option:last-child {
  margin-bottom: 0;
}

.dress-code-option-title {
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 0.3rem 0;
  font-size: 0.85rem;
}

.dress-code-option-details {
  color: var(--text-medium);
  margin: 0;
  line-height: 1.3;
  font-size: 0.8rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
}

.modal-button {
  flex: 1;
  min-width: 120px;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  letter-spacing: 0.3px;
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

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-medium);
  transition: color 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  color: var(--green-color);
}

.me-2 {
  margin-right: 0.5rem;
}

.dress-code-button-container {
  width: 268px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.dress-code-button-container :deep(.button) {
  width: 268px;
  position: relative;
  z-index: 1;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .dress-code-button-container {
    width: 268px;
  }
  
  .dress-code-button-container :deep(.button) {
    white-space: nowrap;
    width: 268px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    gap: 1.25rem;
  }
  
  .modal-title {
    font-size: 1.4rem;
  }
  
  .modal-description {
    font-size: 0.9rem;
  }
  
  .dress-code-section {
    padding: 1rem;
  }
  
  .dress-code-section-title {
    font-size: 1rem;
  }
  
  .dress-code-option-title {
    font-size: 0.9rem;
  }
  
  .dress-code-option-details {
    font-size: 0.85rem;
  }
  
  .modal-buttons {
    flex-direction: column;
  }
  
  .modal-button {
    min-width: auto;
    font-size: 0.9rem;
  }

  .dress-code-info {
    gap: 1rem;
  }
}

.dress-code-section-container {
  position: relative;
  width: 100%;
  overflow: visible;
}

.text-green-custom {
  color: var(--green-color) !important;
}

.border-green-custom {
  border-color: var(--green-color) !important;
}

.dress-code-button-container :deep(.button.white:hover) {
  background-color: var(--green-color) !important;
  border-color: var(--green-color) !important;
  transform: translateY(-2px);
}
.dress-code-decoration-image {
  width: 80px;
  height: auto;
}

@media (max-width: 1024px) {
  .dress-code-decoration-image {
      width: 90px;
  }
}

@media (max-width: 768px) {
  .dress-code-decoration-image {
    width: 100px;
  }
}

@media (max-width: 480px) {
  .dress-code-decoration-image {
    width: 80px;
  }
}
</style>