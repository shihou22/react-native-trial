import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";

const Header = () => {
  const user = useSelector((state) => state.appStore.user);
  //   console.log(JSON.stringify(user.auth));
  if (user.auth) {
    return (
      <View>
        <Text>{user.auth.attributes.email}'s Todo List</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading... Todo List</Text>
      </View>
    );
  }
};

export default Header;
