import { createSelector } from "reselect";

export const getTodoList = createSelector(
  (state) => state.appStore.todoList,
  (todoList) => todoList
);
export const getVpcList = createSelector(
  (state) => state.appStore.vpcList,
  (vpcList) => vpcList
);
