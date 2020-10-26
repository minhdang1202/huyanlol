import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestLogin: ["data"],

  authSuccess: ["data"],
  authFailure: ["data"],
  authReset: [],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  isLogin: false,

  error: null,
  status: null,
};

/* ------------- Reducers ------------- */
export const request = () => ({
  ...INITIAL_STATE,
  isFetching: true,
});

export const success = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    status: null,
    ...data,
  };
};

export const failure = (state = INITIAL_STATE, action) => {
  const data = action.data ? action.data : {};
  return { ...state, isFetching: false, ...data };
};

export const reset = () => INITIAL_STATE;

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_LOGIN]: request,

  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.AUTH_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
