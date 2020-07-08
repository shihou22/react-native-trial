import { takeEvery, all } from "redux-saga/effects";
import { initialVpcLoad, initialTodoLoad, signIn } from "./initialloadsaga";
import completeTodoSaga from "./completeTodoSaga";
import addTodoSaga from "./addTodoSaga";
import {
  INITIAL_TODO_REQUESTED,
  ADD_TODO_REQUESTED,
  COMPLETE_TODO_REQUESTED,
} from "../modules/todomodule";
import { INITIAL_VPC_REQUESTED } from "../modules/vpcmodule";
import { SIGNIN_REQUESTED } from "../modules/loginmodule";

export default function* rootSaga() {
  //completeの待受
  all(
    yield takeEvery(INITIAL_TODO_REQUESTED, initialTodoLoad),
    yield takeEvery(INITIAL_VPC_REQUESTED, initialVpcLoad),
    yield takeEvery(COMPLETE_TODO_REQUESTED, completeTodoSaga),
    yield takeEvery(ADD_TODO_REQUESTED, addTodoSaga),
    yield takeEvery(SIGNIN_REQUESTED, signIn)
  );
}
