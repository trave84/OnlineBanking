import { NOTIFY_USER } from "../actions/types.jsx";

const initialState = {
  message: null,
  messageType: null
};

//EVALUATE what types we are dealing with
export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,

        // ASSIGN: from notifyAction.jsx / Action Creator[func]
        message: action.message,
        messageType: action.messageType
      };

    // OTHERWISE: just State
    default:
      return state;
  }
}
