import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import { reducerLogin } from "./loginmodule";
import { reducerTodoList } from "./todomodule";
import { reducerVpcList } from "./vpcmodule";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  inputApp: [],
  user: {},
  todoList: [],
  vpcList: [],
};

/**
 * reducers
 */
function reducerApp(state = initialState, action) {
  return {
    inputApp: state.inputApp,
    user: reducerLogin(state.user, action),
    todoList: reducerTodoList(state.todoList, action),
    vpcList: reducerVpcList(state.vpcList, action),
  };
}

const rootReducer = combineReducers({
  appStore: reducerApp,
});

export const configureStore = () => {
  const middlewares = [];
  // Logger
  // const logger = createLogger({ collapsed: true, diff: true, duration: true });
  // middlewares.push(logger);
  // Saga
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);
  // const store = createStore(rootReducer, applyMiddleware(...middlewares));
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  // Saga を起動する
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
