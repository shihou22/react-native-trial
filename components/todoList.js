import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View, StyleSheet, Switch, Forms } from "react-native";
import { List, Text, Button } from "react-native-paper";
import { initialTodoRequested } from "../modules/todomodule";
import { initialVpcRequested } from "../modules/vpcmodule";
import { getTodoList, getVpcList } from "../selectors/todolistselectors";
import TodoItem from "./todoItem";

const TodoList = (props) => {
  const todoList = useSelector(getTodoList);
  const vpcList = useSelector(getVpcList);
  const dispatch = useDispatch();

  const [isTodoFlg, setTodoFlg] = useState(true);
  const handleToggleChange = () => {
    setTodoFlg(!isTodoFlg);
  };

  useEffect(() => {
    dispatch(initialTodoRequested());
    dispatch(initialVpcRequested());
  }, []);

  const rederTodoList = (todoList) => {
    return (
      <View>
        <Text style={styles.times}>タスク一覧</Text>
        <FlatList
          style={styles.todoList}
          data={todoList}
          renderItem={({ item }) => <TodoItem {...item} />}
        />
      </View>
    );
  };

  const renderVpcList = (vpcList) => {
    return (
      <View>
        <Text style={styles.times}>VPC一覧</Text>
        <FlatList
          style={styles.todoList}
          data={vpcList}
          renderItem={({ item }) => <TodoItem {...item} />}
        />
      </View>
    );
  };

  const today = new Date();
  const dayStr =
    today.getHours() +
    "時" +
    today.getMinutes() +
    "分" +
    ("0" + today.getSeconds()).slice(-2) +
    "秒";
  console.log(dayStr);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.times}>{dayStr}</Text>
        <View>
          <Switch onValueChange={handleToggleChange} value={isTodoFlg}></Switch>
        </View>
        <View style={styles.todoListContainer}>
          {isTodoFlg ? rederTodoList(todoList) : renderVpcList(vpcList)}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: 40,
    alignItems: "center",
  },
  main: {
    flex: 1,
    maxWidth: 400,
    alignItems: "center",
  },
  todoListContainer: {
    flexDirection: "row",
    flex: 1,
  },
  todoList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  times: {
    maxWidth: 400,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
export default TodoList;
