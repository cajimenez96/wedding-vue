import { ref, computed } from 'vue';
import { MUSIC_TRACKS } from '../config/cloudinary';

export interface Song {
  title: string;
  url: string;
  id: string;
}

// Fisher-Yates shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useMusic = () => {
  const songs = ref<Song[]>(shuffleArray(MUSIC_TRACKS));
  const currentSongIndex = ref(0);

  const currentSong = computed(() => {
    return songs.value[currentSongIndex.value] || null;
  });

  const nextTrack = () => {
    if (songs.value.length === 0) return;
    currentSongIndex.value = (currentSongIndex.value + 1) % songs.value.length;
  };

  const previousTrack = () => {
    if (songs.value.length === 0) return;
    currentSongIndex.value = currentSongIndex.value === 0 
      ? songs.value.length - 1 
      : currentSongIndex.value - 1;
  };

  const selectTrack = (index: number) => {
    if (index >= 0 && index < songs.value.length) {
      currentSongIndex.value = index;
    }
  };

  return {
    songs,
    currentSong,
    currentSongIndex,
    nextTrack,
    previousTrack,
    selectTrack
  };
};