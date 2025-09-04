<script lang="ts" setup>
import Button from './Button.vue';
import Container from './Container.vue';
import { ref } from 'vue';
import dec2Image from '../assets/images/back/dec-2.webp';

defineProps<{
  giftsTitle?: string;
  giftsDescription?: string;
  dressCodeTitle?: string;
  dressCodeDescription?: string;
}>();

const showGiftsModal = ref(false);
const showDressCodeModal = ref(false);

const handleGiftsClose = () => {
  showGiftsModal.value = false;
};

const handleDressCodeClose = () => {
  showDressCodeModal.value = false;
};
</script>

<template>
  <Container variant="green">
    <div class="relative grid md:grid-cols-2 gap-8 md:gap-16">
      <!-- Separator line for desktop -->
      <div class="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      <!-- Gifts Section -->
      <div class="flex flex-col gap-6 justify-center items-center text-center">
        <h2 class="text-4xl title-wedding title-section">{{ giftsTitle }}</h2>
        <div class="flex flex-col px-5 md:w-lg">
          <div class="border-t border-b border-gray-300 py-5 my-4 flex flex-col gap-4 items-center">
            <p class="text-xl text-center" v-html="giftsDescription"></p>
          </div>
        </div>

        <div class="gifts-button-container">
          <Button variant="white" @click="showGiftsModal = true">Más información</Button>
        </div>
      </div>

      <!-- DressCode Section -->
      <div class="flex flex-col gap-6 justify-center items-center text-center dress-code-section">
        <h2 class="text-4xl title-wedding title-section">{{ dressCodeTitle }}</h2>
        <div class="flex flex-col px-5 md:w-lg">
          <div class="border-t border-b border-gray-300 py-5 my-4 flex flex-col gap-4 items-center">
            <p class="text-xl text-center" v-html="dressCodeDescription"></p>
          </div>
        </div>

        <div class="dress-code-button-container">
          <div class="button-with-decoration">
            <img :src="dec2Image" alt="" class="decoration-image" />
            <Button variant="white" @click="showDressCodeModal = true">Ver código de vestimenta</Button>
          </div>
        </div>
      </div>
    </div>
  </Container>

  <!-- Gifts Modal -->
  <div v-if="showGiftsModal" class="modal-overlay" @click.self="handleGiftsClose">
    <div class="modal-container">
      <div class="modal-content">
        <button class="modal-close" @click="handleGiftsClose">×</button>
        <div class="modal-icon">
          <i class="fas fa-gift" aria-hidden="true"></i>
        </div>
        
        <h3 class="modal-title">¡Gracias por ayudarnos!</h3>
        
        <p class="modal-description">
          Tu presencia es nuestro mejor regalo. Si querés hacernos un obsequio, aquí están nuestros datos:
        </p>
        
        <div class="gift-info">
          <div class="gift-option">
            <h4 class="gift-option-title">Transferencia Bancaria</h4>
            <p class="gift-option-details">
              CBU: 0000003100000000000000<br>
              Alias: BODA.CANDELARIA.ALEJANDRO<br>
              Titular: Candelaria & Alejandro
            </p>
          </div>
          
          <div class="gift-option">
            <h4 class="gift-option-title">Lista de Regalos</h4>
            <p class="gift-option-details">
              También tenemos una lista de regalos en Falabella<br>
              Código: CANDEALEJ2026
            </p>
          </div>
        </div>
        
        <div class="modal-buttons">
          <button @click="handleGiftsClose" class="modal-button primary">
            <i class="fas fa-heart me-2" aria-hidden="true"></i>
            ¡Perfecto!
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- DressCode Modal -->
  <div v-if="showDressCodeModal" class="modal-overlay" @click.self="handleDressCodeClose">
    <div class="modal-container">
      <div class="modal-content">
        <button class="modal-close" @click="handleDressCodeClose">×</button>
        <div class="modal-icon">
          <i class="fas fa-user-tie" aria-hidden="true"></i>
        </div>
        
        <h3 class="modal-title">Código de vestimenta</h3>
        
        <p class="modal-description">
          Para que todos nos veamos elegantes y en armonía, te sugerimos el siguiente código de vestimenta:
        </p>
        
        <div class="dress-code-info">
          <div class="dress-code-section-modal">
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

          <div class="dress-code-section-modal">
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
          <button @click="handleDressCodeClose" class="modal-button primary">
            <i class="fas fa-check me-2" aria-hidden="true"></i>
            ¡Perfecto!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dress-code-section {
  position: relative;
}

.button-with-decoration {
  position: relative;
  display: inline-block;
}

.decoration-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: 200px;
  height: auto;
  opacity: 0.15;
  pointer-events: none;
}

.gifts-button-container,
.dress-code-button-container {
  width: calc(100% - 2rem);
  max-width: 300px;
  padding: 0 1rem;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .gifts-button-container,
  .dress-code-button-container {
    width: calc(100vw - 2rem);
    padding: 0 1rem;
  }
  
  .gifts-button-container :deep(.button),
  .dress-code-button-container :deep(.button) {
    white-space: nowrap;
    min-width: 300px;
  }

  .decoration-image {
    width: 150px;
  }
}

@media (max-width: 768px) {
  .decoration-image {
    width: 180px;
  }
}

@media (min-width: 769px) {
  .decoration-image {
    width: 220px;
  }
}

/* Modal Styles */
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
  max-width: 500px;
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
  padding: 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.modal-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, var(--green-color), var(--gold-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(74, 99, 96, 0.3);
}

.modal-title {
  font-family: 'Sail', cursive;
  font-size: 1.3rem;
  color: var(--text-dark);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.modal-description {
  font-size: 0.9rem;
  color: var(--text-medium);
  line-height: 1.5;
  margin: 0;
}

.gift-info,
.dress-code-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0.3rem 0;
}

.gift-option {
  background: rgba(74, 99, 96, 0.05);
  border: 1px solid rgba(74, 99, 96, 0.1);
  border-radius: 10px;
  padding: 0.8rem;
  text-align: left;
}

.dress-code-section-modal {
  background: rgba(74, 99, 96, 0.03);
  border: 1px solid rgba(74, 99, 96, 0.1);
  border-radius: 10px;
  padding: 1rem;
  text-align: left;
}

.gift-option-title,
.dress-code-section-title {
  font-weight: 600;
  color: var(--green-color);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.dress-code-section-title {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 0.8rem;
}

.dress-code-option {
  margin-bottom: 0.8rem;
}

.dress-code-option:last-child {
  margin-bottom: 0;
}

.dress-code-option-title {
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
}

.gift-option-details,
.dress-code-option-details {
  color: var(--text-medium);
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
}

.dress-code-option-details {
  font-size: 0.9rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
}

.modal-button {
  flex: 1;
  min-width: 140px;
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
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
  
  .gift-option,
  .dress-code-section-modal {
    padding: 1rem;
  }
  
  .dress-code-section-modal {
    padding: 1rem;
  }
  
  .gift-option-title,
  .dress-code-section-title {
    font-size: 1rem;
  }
  
  .dress-code-option-title {
    font-size: 0.9rem;
  }
  
  .gift-option-details,
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
</style>