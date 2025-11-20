<script lang="ts" setup>
import Button from "./Button.vue";
import Container from "./Container.vue";
import { ref } from "vue";

defineProps<{
  title?: string;
  description?: string;
}>();

const showModal = ref(false);
const copiedField = ref<string | null>(null);

const handleClose = () => {
  showModal.value = false;
};

const copyToClipboard = async (text: string, fieldName: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copiedField.value = fieldName;
    setTimeout(() => {
      copiedField.value = null;
    }, 2000);
  } catch (err) {
    console.error("Error al copiar:", err);
  }
};
</script>

<template>
  <Container variant="green">
    <div class="flex flex-col gap-6 justify-center items-center text-center">
      <h2 class="text-4xl title-wedding title-section">{{ title }}</h2>
      <div class="flex flex-col px-5 md:w-lg">
        <div
          class="border-t border-b border-gray-300 py-5 my-4 flex flex-col gap-4 items-center"
        >
          <p class="text-xl text-center" v-html="description"></p>
        </div>
      </div>

      <div class="gifts-button-container">
        <Button variant="white" @click="showModal = true"
          >Más información</Button
        >
      </div>
    </div>
  </Container>

  <!-- Gifts Modal siguiendo el patrón de MusicModal -->
  <div v-if="showModal" class="modal-overlay" @click.self="handleClose">
    <div class="modal-container">
      <div class="modal-content">
        <button class="modal-close" @click="handleClose">×</button>
        <div class="modal-icon">
          <i class="fas fa-gift" aria-hidden="true"></i>
        </div>

        <h3 class="modal-title">¡Gracias por ayudarnos!</h3>

        <p class="modal-description">
          Tu presencia es nuestro mejor regalo. Si querés hacernos un obsequio,
          aquí están nuestros datos:
        </p>

        <div class="gift-info">
          <div class="gift-info">
            <div class="gift-option">
              <h4 class="gift-option-title">Transferencia Bancaria</h4>
              <div class="gift-option-details">
                <div class="copy-row">
                  <span><strong>CVU:</strong> 0000003100056920810313</span>
                  <button
                    @click="copyToClipboard('0000003100056920810313', 'cvu')"
                    class="copy-button"
                    :class="{ copied: copiedField === 'cvu' }"
                    :title="copiedField === 'cvu' ? '¡Copiado!' : 'Copiar CVU'"
                  >
                    <i
                      :class="
                        copiedField === 'cvu' ? 'fas fa-check' : 'fas fa-copy'
                      "
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
                <div class="copy-row">
                  <span><strong>Alias:</strong> ale.cande.2026</span>
                  <button
                    @click="copyToClipboard('ale.cande.2026', 'alias')"
                    class="copy-button"
                    :class="{ copied: copiedField === 'alias' }"
                    :title="
                      copiedField === 'alias' ? '¡Copiado!' : 'Copiar Alias'
                    "
                  >
                    <i
                      :class="
                        copiedField === 'alias' ? 'fas fa-check' : 'fas fa-copy'
                      "
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
                <div class="copy-row">
                  <span><strong>Titular:</strong> Alejandro Adrian Vexler</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-buttons">
          <button @click="handleClose" class="modal-button primary">
            <i class="fas fa-heart me-2" aria-hidden="true"></i>
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  max-height: 90vh;
  overflow-y: auto;
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
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
  font-family: "Sail", cursive;
  font-size: 1.5rem;
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

.gift-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem 0;
}

.gift-option {
  background: rgba(74, 99, 96, 0.05);
  border: 1px solid rgba(74, 99, 96, 0.1);
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
}

.gift-option-title {
  font-weight: 600;
  color: var(--green-color);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.gift-option-details {
  color: var(--text-medium);
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
}

.copy-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.copy-row:last-child {
  margin-bottom: 0;
}

.copy-button {
  background: rgba(74, 99, 96, 0.1);
  border: 1px solid rgba(74, 99, 96, 0.2);
  border-radius: 6px;
  padding: 0.375rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--green-color);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
}

.copy-button:hover {
  background: rgba(74, 99, 96, 0.15);
  border-color: var(--green-color);
  transform: scale(1.05);
}

.copy-button.copied {
  background: var(--green-color);
  border-color: var(--green-color);
  color: white;
  animation: pulse 0.3s ease-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
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

.gifts-button-container {
  width: calc(100% - 2rem);
  max-width: 300px;
  padding: 0 1rem;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .gifts-button-container {
    width: calc(100vw - 2rem);
    padding: 0 1rem;
  }

  .gifts-button-container :deep(.button) {
    white-space: nowrap;
    min-width: 280px;
  }
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

  .gift-option {
    padding: 1.25rem;
  }

  .gift-option-title {
    font-size: 1rem;
  }

  .gift-option-details {
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
