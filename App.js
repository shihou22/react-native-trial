import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./modules";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import Todo from "./forms/Todo";
Amplify.configure(awsconfig);

const store = configureStore();

export default function App() {
  console.log("hoge");
  // <Todo />
  return (
    <Provider store={store}>
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text>It's Todo List</Text>
            <Todo />
            <StatusBar style="auto" />
          </View>
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  main: {
    flex: 1,
    maxWidth: 230,
    alignItems: "center",
  },
});
