<template>
  <footer class="footer-section">
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
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  groom?: string;
  bride?: string;
}>();

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-section {
  background: var(--green-color);
  color: var(--white);
  padding: 3rem 2rem 2rem;
  text-align: center;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-family: 'Sail', cursive;
  font-size: 2.5rem;
  color: var(--white);
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

@media (max-width: 768px) {
  .footer-section {
    padding: 2rem 1rem 1.5rem;
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
}
</style>