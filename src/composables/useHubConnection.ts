import { ref, computed } from 'vue';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

const hubUrl = 'https://webuno-api.azurewebsites.net/gamehub';
const connection = ref<HubConnection>(null);
const loading = ref(false);
const error = ref(null);

export const useHubConnection = () => {
  const isConnected = computed(() => (connection.value?.connectionId?.length ? true : false));

  const buildHubConnection = () => {
    const newConnection = new HubConnectionBuilder().withUrl(hubUrl).configureLogging(LogLevel.Information).build();
    connection.value = newConnection;
  };

  const connectToHub = async () => {
    try {
      loading.value = true;
      buildHubConnection();
      await connection.value.start();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const disconnectFromHub = async () => {
    await connection.value.stop();
  };

  const registerListener = (eventName: string, callback: Function) => {
    connection.value.on(eventName, (data) => {
      callback(data);
    });
  };

  return {
    buildHubConnection,
    isConnected,
    connectToHub,
    disconnectFromHub,
    registerListener,
    connection,
    loading,
    error,
  };
};
