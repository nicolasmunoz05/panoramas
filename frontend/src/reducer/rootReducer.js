import { combineReducers } from "redux";
import { eventosReducer} from "./eventosReducer"

export const rootReducer = combineReducers({
  eventos: eventosReducer
});
