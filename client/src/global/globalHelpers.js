import uuid from "react-uuid";

export const errorAlert = (msg, needId = false) => {
  return {
    alertMessageId: needId ? uuid() : "success",
    alertMessage: msg,
    alertSuccess: false,
  };
};
export const successAlert = (msg, needId = false) => {
  return {
    alertMessageId: needId ? uuid() : "error",
    alertMessage: msg,
    alertSuccess: true,
  };
};
