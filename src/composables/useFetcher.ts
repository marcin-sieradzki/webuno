import { reactive, ref, toRefs } from 'vue';
import { useHubConnection } from './useHubConnection';
const { connection } = useHubConnection();
export function useFetcher(fetcher) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getData = async (...params) => {
    loading.value = true;
    data.value = null;
    error.value = null;
    try {
      data.value = await fetcher(...params);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    getData,
    data,
  };
}
// export function useInvoker(name, params) {
//   const state = reactive({
//     response: null,
//     error: null,
//     loading: false,
//   });
//   const fetchData = async () => {
//     state.loading = true;
//     try {
//       const res = await connection.value.invoke(name, ...params);
//       state.response = res;
//     } catch (errors) {
//       state.error = errors;
//     } finally {
//       state.loading = false;
//     }
//   };
//   return { ...toRefs(state), fetchData };
// }
