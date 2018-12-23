import { NOTIFY_USER } from "./types";

// ACTION CREATOR [func]
export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message,
    messageType
  };
};
