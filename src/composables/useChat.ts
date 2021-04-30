import useGameConnection from "./useGameConnection";

export const useChat = () => {
  const sendMessage = async (message) => {
    try {
      await useGameConnection.connection.value.invoke(
        "SendMessage",
        message,
        useGameConnection.getPlayerName().value,
        useGameConnection.getGameKey().value
      );
    } catch (e) {
      throw new Error(e);
    }
  };
  return {
    sendMessage,
  };
};
