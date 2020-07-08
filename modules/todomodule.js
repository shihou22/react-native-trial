/*
action types
 */
export const ADD_TODO_REQUESTED = "ADD_TODO_REQUESTED";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";

export const COMPLETE_TODO_REQUESTED = "COMPLETE_TODO_REQUESTED";
export const COMPLETE_TODO_SUCCESS = "COMPLETE_TODO_SUCCESS";

export const INITIAL_TODO_REQUESTED = "INITIAL_TODO_REQUESTED";
export const INITIAL_TODO_SUCCESS = "INITIAL_TODO_SUCCESS";

/*
action creators
 */

export const addTodoRequested = (description) => {
  return {
    type: ADD_TODO_REQUESTED,
    payload: {
      description: description,
      index: 0,
      completed: false,
      isStorage: false,
    },
  };
};
export const addTodoSuccess = (todo) => {
  // console.log(JSON.stringify(todo))
  const actionItem = {
    type: ADD_TODO_SUCCESS,
    payload: Object.assign({}, todo, { isStorage: true }),
  };
  return actionItem;
};

export const initialTodoRequested = () => {
  return {
    type: INITIAL_TODO_REQUESTED,
  };
};

export const initialTodoSuccess = (initialTodoList) => {
  return {
    type: INITIAL_TODO_SUCCESS,
    payload: {
      todoList: initialTodoList.map((todo) => {
        return {
          id: todo.data.id,
          index: todo.data.index,
          completed: todo.data.completed,
          description: todo.data.description,
          isStorage: true,
        };
      }),
    },
  };
};

export const completeTodoRequest = (todo) => {
  return {
    type: COMPLETE_TODO_REQUESTED,
    payload: Object.assign({}, todo, { completed: !todo.completed }),
  };
};

export const completeTodoSuccess = (todo) => {
  return {
    type: COMPLETE_TODO_SUCCESS,
    payload: Object.assign({}, todo, { isStorage: true }),
  };
};

export const reducerTodoList = (state = [], action) => {
  const actionType = action.type;
  const payload = action.payload;
  switch (actionType) {
    case ADD_TODO_SUCCESS:
      // console.log(JSON.stringify(payload));
      return [...state, payload];
    case INITIAL_TODO_SUCCESS:
      return !payload.todoList
        ? state
        : Object.assign([], ...state, payload.todoList);
    case COMPLETE_TODO_REQUESTED:
      return state.map((todo) =>
        todo.id === payload.id
          ? {
              ...todo,
              completed: payload.completed,
              isStorage: payload.isStorage,
            }
          : todo
      );
    case COMPLETE_TODO_SUCCESS:
      return state.map((todo) =>
        todo.id === payload.id
          ? {
              ...todo,
              isStorage: payload.isStorage,
            }
          : todo
      );
    default:
      return state;
  }
};
