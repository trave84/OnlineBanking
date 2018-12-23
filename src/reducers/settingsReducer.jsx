import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "../actions/types.jsx";
import { actionTypes } from "react-redux-firebase";

export default function(state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        // 3) Will Toggle the State by action.type
        disableBalanceOnAdd: action.payload
      };

    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };

    default:
      return state;
  }
}
