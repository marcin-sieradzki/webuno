import { Game } from './../Types';
import { sharedRef } from '@/utils/shared/useSharedRef';
import { ref, Ref } from 'vue';
import axios from 'axios';

const apiUrl = 'https://webuno-api.azurewebsites.net/api';
export const useAllGames = () => {
  const loading: Ref<boolean> = sharedRef<boolean>('useAllGames-loading', false);
  const error: Ref<Error> = sharedRef('useAllGames-error', null);
  const allGames: Ref<Game[]> = sharedRef('useAllGames-games', []);

  async function fetchAllGames() {
    try {
      loading.value = true;
      const gamesData = await axios.get(`${apiUrl}/game`);
      allGames.value = gamesData.data;
      return allGames;
    } catch (e) {
      error.value = e;
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  }
  return {
    fetchAllGames,
    allGames,
    error,
    loading,
  };
};
