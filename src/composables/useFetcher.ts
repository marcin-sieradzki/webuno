import { ref } from 'vue';

export function useFetcher(fetcher) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getData = async (...params) => {
    loading.value = true;
    data.value = null;
    error.value = null;
    try {
      return await fetcher(...params);
    } catch (err) {
      error.value = err;
    }
    loading.value = false;
  };

  return {
    loading,
    error,
    getData,
  };
}
