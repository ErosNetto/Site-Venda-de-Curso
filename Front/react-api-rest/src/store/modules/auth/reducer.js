import * as types from '../types';
import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  idDoInstrutor: '',
  isLoading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    // LOGIN
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_ID_INSTRUTOR: {
      const newState = { ...state };
      newState.idDoInstrutor = action.payload[0].id;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    // REGISTER
    case types.REGISTER_UPDATED_SUCCESS: {
      const newState = { ...state };
      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    // INSTRUTOR
    case types.VIRAR_UM_INSTRUTOR: {
      const newState = { ...state };
      newState.user.istrutor = action.payload.istrutor;
      newState.isLoading = false;
      return newState;
    }

    case types.CRIAR_ISNTRUTOR: {
      const newState = { ...state };
      newState.idDoInstrutor = action.payload.idInstrutor;
      newState.isLoading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}
