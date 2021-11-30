import { History } from "history";
import { applyMiddleware, compose as simpleCompose, createStore } from "redux";
import { composeWithDevTools, EnhancerOptions } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducer"; 
import apiMiddleware from "./apiMiddleware";
import rootSaga from "./sagas";

export default function configureStore(api: any, history: History) {
  const compose =
    process.env.NODE_ENV === "production" ? simpleCompose : composeWithDevTools;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    /* preloadedState, */
    compose(
      applyMiddleware(apiMiddleware(api), sagaMiddleware) as EnhancerOptions
    )
  );

  sagaMiddleware.run(() => rootSaga(history, api));

  return store;
}
