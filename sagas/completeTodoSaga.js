import { put } from "redux-saga/effects";
import { completeTodoSuccess } from "../modules/todomodule";
import { API } from "aws-amplify";
import param from "../aws-exports";

export default function* completeTodoSaga(action) {
  try {
    const apiName = param.aws_cloud_logic_custom[0].name;
    const path = "/ryosampmobile";

    // データ登録
    const myInit = {
      headers: {},
      response: true,
      body: {
        author: String(action.payload.author),
        uuid: String(action.payload.id),
        data: Object(action.payload),
      },
    };
    yield API.put(apiName, path, myInit)
      .then((response) => {
        console.log("response");
        console.log(JSON.stringify(response));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        // console.log(error)
      });
    //storageにPOST！
    yield put(completeTodoSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}
