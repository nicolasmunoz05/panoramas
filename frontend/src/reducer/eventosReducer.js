import { types } from "./../types/types";

const initialState = {
  eventos: [],
  error: null,
  loading: false,
  eventosEdit: null,
  eventosDelete: null,
};

export const eventosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventoNew:
      return {
        ...state,
        eventos: [...state.eventos, action.payload],
      };

    case types.getEvents:
      return {
        ...state,
        eventos: [...action.payload],
      };

    case types.eventoUpdate:
      return {
        ...state,
        eventosEdit: action.payload,
      };

    case types.eventosDelete:
      return {
        ...state,
        eventosDelete: action.payload,
      };

    case types.eventosDeleted:
      return {
        ...state,
        eventos: state.eventos.filter(
          (evento) => evento._id !== state.eventosDelete
        ),
        eventosDelete: null,
      };

    default:
      return state;
  }
};
