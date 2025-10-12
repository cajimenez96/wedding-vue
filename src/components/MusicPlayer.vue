<template>
  <div class="music-player">
    <div class="player-wrapper">
      <div class="player-container" :class="{ 'minimized': isMinimized }">
        <div v-if="isMinimized" class="minimized-player">
          <button 
            @click="togglePlay" 
            class="play-button-mini"
            :class="{ 'playing': isPlaying }"
          >
            <i 
              :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'" 
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <div v-else class="full-player">
          <button 
            @click="togglePlay" 
            class="play-button"
            :class="{ 'playing': isPlaying }"
          >
            <i 
              :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'" 
              aria-hidden="true"
            ></i>
          </button>
          
          <div class="music-info">
            <p class="song-title">{{ currentSong?.title || 'Música de boda' }}</p>
            <div class="progress-container">
              <div 
                class="progress-bar" 
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
          </div>
          
          <button @click="toggleMute" class="mute-button">
            <i 
              :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'" 
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
      <div class="control-container">
        <button @click="toggleMinimize" class="toggle-button">
          <i 
            :class="isMinimized ? 'fas fa-expand' : 'fas fa-minus'" 
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>
    
    <audio 
      ref="audioPlayer"
      @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata"
      @ended="onSongEnded"
      preload="metadata"
    >
      <source :src="currentSong?.url" type="audio/mpeg">
      Tu navegador no soporta el elemento de audio.
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useMusic } from '../composables/useMusic';


const props = defineProps<{
  initialMuted?: boolean;
  canAutoPlay?: boolean;
}>();

const { songs, currentSong, nextTrack } = useMusic();

const audioPlayer = ref<HTMLAudioElement>();
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(70);
const isMinimized = ref(true);
const isMuted = ref(false);
const previousVolume = ref(70);

watch(() => props.initialMuted, (newValue) => {
  if (newValue !== undefined) {
    isMuted.value = newValue;
    if (newValue) {
      previousVolume.value = volume.value > 0 ? volume.value : 70;
      volume.value = 0;
      if (audioPlayer.value) {
        audioPlayer.value.volume = 0;
        if (isPlaying.value) {
          audioPlayer.value.pause();
          isPlaying.value = false;
        }
      }
    } else {
      volume.value = previousVolume.value > 0 ? previousVolume.value : 70;
      if (audioPlayer.value) {
        audioPlayer.value.volume = volume.value / 100;
        setTimeout(() => {
          if (audioPlayer.value && currentSong.value && !isPlaying.value) {
            audioPlayer.value.play().catch(() => {});
            isPlaying.value = true;
          }
        }, 1500);
      }
    }
  }
}, { immediate: true });

const progress = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0;
});



const validateCloudinaryMusic = () => {
  if (songs.value.length > 0 && audioPlayer.value) {
    audioPlayer.value.addEventListener('error', handleAudioError);
  } else {
    isMinimized.value = true;
  }
};

const handleAudioError = () => {
  if (songs.value.length > 1) {
    handleNextTrack();
  }
};

const togglePlay = () => {
  if (!audioPlayer.value || !currentSong.value) return;
  
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const updateProgress = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
  }
};

const updateVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value / 100;
  }
};

const onLoadedMetadata = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration;
  }
};

const onSongEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0;
};


const handleTrackChange = () => {
  currentTime.value = 0;
  
  if (audioPlayer.value && currentSong.value) {
    const wasPlaying = isPlaying.value;
    audioPlayer.value.src = currentSong.value.url;
    audioPlayer.value.load();
    
    if (wasPlaying) {
      setTimeout(() => {
        audioPlayer.value?.play();
        isPlaying.value = true;
      }, 100);
    }
  }
};

const handleNextTrack = () => {
  nextTrack();
  handleTrackChange();
};


const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

const toggleMute = () => {
  if (!audioPlayer.value) return;
  
  if (isMuted.value) {
    volume.value = previousVolume.value;
    audioPlayer.value.volume = volume.value / 100;
    isMuted.value = false;
  } else {
    previousVolume.value = volume.value;
    volume.value = 0;
    audioPlayer.value.volume = 0;
    isMuted.value = true;
  }
};

onMounted(() => {
  validateCloudinaryMusic();
  
  if (props.initialMuted !== undefined) {
    isMuted.value = props.initialMuted;
    if (props.initialMuted) {
      volume.value = 0;
    } else {
      volume.value = 70;
    }
  }
  
  setTimeout(() => {
    if (!isMuted.value && currentSong.value && audioPlayer.value) {
      audioPlayer.value.volume = volume.value / 100;
      audioPlayer.value.play().catch(() => {});
      isPlaying.value = true;
    }
  }, 2000);
  
  updateVolume();
});

onUnmounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.removeEventListener('error', handleAudioError);
  }
});
</script>

<style scoped>
.music-player {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 1000;
}

.player-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.player-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.player-container.minimized {
  background: rgba(255, 255, 255, 0.9);
}

.minimized-player {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.full-player {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 220px;
}

.control-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.25rem;
}

.play-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--green-color);
  color: var(--white);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.play-button:hover {
  background: var(--gold-color);
  transform: scale(1.1);
}

.play-button.playing {
  animation: pulse 2s infinite;
}

.play-button-mini {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--green-color);
  color: var(--white);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.75rem;
}

.play-button-mini:hover {
  background: var(--gold-color);
  transform: scale(1.1);
}

.play-button-mini.playing {
  animation: pulse-mini 2s infinite;
}

.toggle-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(74, 99, 96, 0.1);
  color: var(--green-color);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.toggle-button:hover {
  background: var(--green-color);
  color: var(--white);
  transform: scale(1.1);
}

.mute-button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(74, 99, 96, 0.1);
  color: var(--green-color);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.mute-button:hover {
  background: var(--green-color);
  color: var(--white);
  transform: scale(1.1);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(74, 99, 96, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(74, 99, 96, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 99, 96, 0); }
}

@keyframes pulse-mini {
  0% { box-shadow: 0 0 0 0 rgba(74, 99, 96, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(74, 99, 96, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 99, 96, 0); }
}

.music-info {
  flex: 1;
  min-width: 0;
}

.song-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-dark);
  margin: 0 0 0.4rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-container {
  width: 100%;
  height: 3px;
  background: rgba(74, 99, 96, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--green-color);
  border-radius: 2px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .music-player {
    top: 1rem;
    left: 1rem;
  }
  
  .full-player {
    min-width: 180px;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .play-button {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
  
  .toggle-button {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
  
  .mute-button {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }
  
  .play-button-mini {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }
  
  .song-title {
    font-size: 0.7rem;
  }
  
  .progress-container {
    height: 2px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .full-player {
    min-width: 200px;
    padding: 0.6rem;
    gap: 0.6rem;
  }
  
  .play-button {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
  
  .toggle-button {
    width: 30px;
    height: 30px;
    font-size: 0.85rem;
  }
}
</style>