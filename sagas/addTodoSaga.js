import { put } from "redux-saga/effects";
import { addTodoSuccess } from "../modules/todomodule";
import { API, Auth } from "aws-amplify";
import ShortId from "shortid";
import param from "../aws-exports";

const f = async () => {
  // console.log(Auth);
  const data = await Auth.currentUserInfo();
  // if (!data)
  //     return
  // const resp = await Auth.currentSession()
  console.log("username:" + JSON.stringify(data.username));
  console.log("userId:" + JSON.stringify(data));
  // const accessToken = resp.getAccessToken().getJwtToken()
  // console.log("トークン: ", accessToken)
  return data.id;
};

//https://docs.amplify.aws/lib/restapi/update/q/platform/js
export default function* addTodoSaga(action) {
  try {
    console.log("addTodoSaga");
    const apiName = param.aws_cloud_logic_custom[0].name;
    const path = "/ryosampmobile";
    if (!action.payload.author) {
      console.log("get Author");
      action.payload.author = yield f();
    }
    if (!action.payload.id) {
      action.payload.id = ShortId.generate();
      action.payload.index = action.payload.id;
    }
    console.log(action.payload);
    const myInit = {
      headers: {},
      response: true,
      body: {
        author: String(action.payload.author),
        uuid: String(action.payload.id),
        data: Object(action.payload),
      },
    };
    // データ登録
    yield API.put(apiName, path, myInit)
      .then((response) => {
        console.log("response");
        // console.log(response);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
    yield put(addTodoSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}
