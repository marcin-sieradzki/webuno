import { ref, computed } from "vue";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";

const connection = ref<HubConnection | null>(null);
// const hubUrl = "https://localhost:44384/gamehub";
const hubUrl = "https://webuno-api.azurewebsites.net/gamehub";

export const useHubConnection = () => {
  const isConnected = computed(() =>
    connection?.value?.connectionId?.length ? true : false
  );

  const buildHubConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Information)
      .build();

    connection.value = newConnection;
  };

  const connectToHub = async () => {
    buildHubConnection();
    await connection.value.start();
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
  };
};
