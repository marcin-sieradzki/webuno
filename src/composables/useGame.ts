import { Game } from '@/Types';
import { ref, computed, Ref } from 'vue';

const $game = ref<Game | null>(null);
export const useGame = () => ({});
