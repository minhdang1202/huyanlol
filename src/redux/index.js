import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import * as AuthRedux from "./auth.redux";
import * as EditionRedux from "./edition.redux";
import * as ArticleRedux from "./article.redux";
import * as UserRedux from "./user.redux";
import * as ChallengeRedux from "./challenge.redux";
import * as ArticleCreate from "./articleCreate.redux";

/* ------------- Assemble The Reducers ------------- */
export const appReducer = combineReducers({
  authRedux: AuthRedux.reducer,
  editionRedux: EditionRedux.reducer,
  articleRedux: ArticleRedux.reducer,
  userRedux: UserRedux.reducer,
  challengeRedux: ChallengeRedux.reducer,
  articleCreateRedux: ArticleCreate.reducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

/* ------------- Redux Configuration ------------- */

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();

// Create store
const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, applyMiddleware(sagaMiddleware))
    : createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// kick off root saga
sagaMiddleware.run(rootSaga);

export default store;
