import useGameConnection from "./useGameConnection";

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

const useChat = {
  sendMessage,
};
export default useChat;
