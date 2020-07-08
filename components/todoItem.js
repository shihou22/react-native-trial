import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    minHeight: 50,
  },
  text: {
    color: "#333",
  },
});

const TodoItem = (item) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.description}</Text>
    </View>
  );
};

export default TodoItem;
