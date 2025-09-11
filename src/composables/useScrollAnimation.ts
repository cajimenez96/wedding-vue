import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { throttle } from '../utils/debounce';

export function useScrollAnimation(elementRef: Ref<HTMLElement | undefined>, threshold = 0.8, initiallyVisible = false) {
  const isVisible = ref(initiallyVisible);

  const handleScroll = () => {
    if (!elementRef.value) return;
    
    const rect = elementRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top <= windowHeight * threshold && rect.bottom >= windowHeight * 0.2) {
      isVisible.value = true;
    }
    else if (rect.bottom < 0 || rect.top > windowHeight) {
      isVisible.value = false;
    }
  };

  const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps

  onMounted(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Check initial state
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', throttledHandleScroll);
  });

  return {
    isVisible
  };
}