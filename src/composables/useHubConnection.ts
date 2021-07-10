import { ref, computed } from 'vue';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

const hubUrl = 'https://webuno-api.azurewebsites.net/gamehub';
const connection = ref<HubConnection>(null);
const loading = ref(false);
const error = ref(null);

export const registerListener = (eventName: string, callback: Function) => {
  connection.value.on(eventName, (data) => {
    callback(data);
  });
};

export const buildConnection = (url: string, logLevel: LogLevel) => {
  return new HubConnectionBuilder().withUrl(url).configureLogging(logLevel).build();
};

export const getConnectionId = (connection: HubConnection) => (connection?.connectionId?.length ? true : false);

export const useHubConnection = () => {
  const isConnected = computed(() => getConnectionId(connection.value as HubConnection));

  const connectToHub = async () => {
    try {
      loading.value = true;
      const newConnection = buildConnection(hubUrl, LogLevel.Information);
      connection.value = newConnection;
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

  return {
    isConnected,
    connectToHub,
    disconnectFromHub,
    registerListener,
    connection,
    loading,
    error,
  };
};
