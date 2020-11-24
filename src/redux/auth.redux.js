import { createReducer, createActions } from "reduxsauce";
import Cookie from "js-cookie";
import { AppConstant } from "const";
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestLogin: ["data"],
  requestLoginBySocial: ["data"],
  requestRegister: ["data"],

  authSuccess: ["data"],
  authFailure: ["data"],
  authReset: [],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  isAuth: Boolean(Cookie.get(AppConstant.KEY_TOKEN)),
  isRegister: false,

  errors: null,
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
    errors: null,
    status: null,
    ...data,
  };
};

export const failure = (state = INITIAL_STATE, action) => {
  const data = action.data ? action.data : {};
  return { ...state, isFetching: false, isAuth: false, ...data };
};

export const reset = () => INITIAL_STATE;

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_LOGIN]: request,
  [Types.REQUEST_LOGIN_BY_SOCIAL]: request,
  [Types.REQUEST_REGISTER]: request,

  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.AUTH_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
