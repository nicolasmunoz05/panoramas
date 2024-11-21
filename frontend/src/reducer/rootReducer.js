import { combineReducers } from "redux";
import { eventosReducer } from "./eventosReducer";
import { panoramasReducer } from "./panoramasReducer";

export const rootReducer = combineReducers({
  eventos: eventosReducer,
  panoramas: panoramasReducer,
});
