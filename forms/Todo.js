import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/header";
import Description from "../components/description";
import MapTodolist from "../components/todoList";
import { signInRequested } from "../modules/loginmodule";
import { withAuthenticator } from "aws-amplify-react-native";
// import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

const Todo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInRequested());
  }, []);
  // const [modalState, setModalState] = useState(false);
  return (
    <>
      <Header />
      <Description />
      <MapTodolist />
    </>
  );
};
//   <Description />
//   <MapTodolist />
// <AmplifySignOut />
export default withAuthenticator(Todo, { includeGreetings: true });
// export default Todo;
