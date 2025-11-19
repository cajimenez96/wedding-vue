<template>
  <footer ref="footerRef" :class="['footer-section', { 'animate-in': isVisible }]">
    <div class="footer-content">
      <div class="footer-message">
        <h3 class="footer-title">¡Gracias por acompañarnos!</h3>
        <p class="footer-text">
          Esperamos verte en nuestro día especial.<br>
          Tu presencia hará que este momento sea aún más memorable.
        </p>
      </div>
      <div class="footer-divider"></div>
      <p class="footer-copyright">
        Con amor, {{ groom }} & {{ bride }} • {{ currentYear }}
      </p>
    </div>
    <div class="footer-decoration">
      <img :src="bakDecImage" alt="" class="footer-decoration-image" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import bakDecImage from '../assets/images/back/bak_dec-1.webp';
import { useScrollAnimation } from '../composables/useScrollAnimation';

defineProps<{
  groom?: string;
  bride?: string;
}>();

const currentYear = new Date().getFullYear();
const footerRef = ref<HTMLElement>();
const { isVisible } = useScrollAnimation(footerRef, 0.9);
</script>

<style scoped>
.footer-section {
  background: var(--alabaster-color);
  color: var(--green-color);
  padding: 3rem 2rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-top: 80px solid transparent;
}

@media (min-width: 769px) and (max-width: 1024px) {
  .footer-section {
    padding-top: 25px;
  }
}

@media (min-width: 1025px) {
  .footer-section {
    padding-top: calc(6rem + 10px);
  }
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.footer-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-family: 'Sail', cursive;
  font-size: 2.5rem;
  color: var(--green-color);
  margin: 0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.footer-text {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
  margin: 0;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold-color), transparent);
  margin: 1rem 0;
}

.footer-copyright {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
  letter-spacing: 1px;
}

.footer-decoration {
  position: absolute;
  bottom: -70%;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  transform: translateY(20px);
}

.footer-decoration-image {
  width: 68%;
  height: auto;
  object-fit: cover;
  transform: translateY(15%);
  margin: 0 auto;
  display: block;
}

@media (max-width: 1024px) and (min-width: 769px) {
  .footer-decoration {
    bottom: -65%;
  }

  .footer-decoration-image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 2rem 1rem 1.5rem;
    border-top: none;
  }

  .footer-title {
    font-size: 2rem;
  }

  .footer-text {
    font-size: 1rem;
  }

  .footer-copyright {
    font-size: 0.8rem;
  }

  .footer-decoration {
    bottom: -35%;
  }

  .footer-decoration-image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

@media (max-width: 480px) {
  .footer-decoration {
    bottom: -5%;
  }

  .footer-decoration-image {
    width: 120%;
  }
}

.footer-section.animate-in .footer-decoration {
  opacity: 0.15;
  transform: translateY(0);
}

@media (min-width: 769px) {
  .footer-section.animate-in .footer-decoration {
    opacity: 0.1;
  }
}
</style>