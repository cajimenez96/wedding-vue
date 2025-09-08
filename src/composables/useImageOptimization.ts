import { ref, onMounted } from 'vue';

export function useImageOptimization() {
  const isWebPSupported = ref(false);
  const isAVIFSupported = ref(false);

  const checkImageFormat = (format: 'webp' | 'avif') => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      
      const data = format === 'webp' 
        ? 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw' 
        : 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQ==';
      
      img.src = data;
    });
  };

  const getOptimalImageSrc = (baseSrc: string, isMobile = false): string => {
    const [path, extension] = baseSrc.split('.');
    const size = isMobile ? '_mobile' : '';
    
    if (isAVIFSupported.value) {
      return `${path}${size}.avif`;
    } else if (isWebPSupported.value) {
      return `${path}${size}.webp`;
    }
    return `${path}${size}.${extension}`;
  };

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadCriticalImages = async (images: string[]) => {
    const promises = images.map(src => preloadImage(src));
    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  };

  onMounted(async () => {
    [isWebPSupported.value, isAVIFSupported.value] = await Promise.all([
      checkImageFormat('webp'),
      checkImageFormat('avif')
    ]);
  });

  return {
    isWebPSupported,
    isAVIFSupported,
    getOptimalImageSrc,
    preloadImage,
    preloadCriticalImages
  };
}