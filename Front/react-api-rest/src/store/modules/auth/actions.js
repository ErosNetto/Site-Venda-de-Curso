import * as types from '../types';

// LOGIN
export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

// REGISTER
export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}

// INSTRUTOR
export function virarUmIntrutorSuccess(payload) {
  return {
    type: types.VIRAR_UM_INSTRUTOR,
    payload,
  };
}

export function criarUmInstrutor(payload) {
  return {
    type: types.CRIAR_ISNTRUTOR,
    payload,
  };
}

export function idIntrutorData(payload) {
  return {
    type: types.LOGIN_ID_INSTRUTOR,
    payload,
  };
}
