import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { TextInput, Text, Button } from "react-native-paper";
import { addTodoRequested } from "../modules/todomodule";

const Description = (props) => {
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    if (!inputVal.trim()) {
      return;
    }
    //ADD_TODO actionã¸dispatch
    dispatch(addTodoRequested(inputVal));
  };

  const handleValueChange = (text) => {
    setInputVal(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputVal}
        onChangeText={(text) => handleValueChange(text)}
        style={styles.textInput}
      />
      <Button mode="contained" onPress={handleOnSubmit} style={styles.button}>
        <Text> Add Todo</Text>{" "}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
  },
  textInput: {
    flex: 3,
    backgroundColor: "#FFF",
    marginRight: 5,
  },
  button: {
    flex: 1,
    backgroundColor: "#008080",
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    paddingBottom: 6,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "500",
  },
});

export default Description;
