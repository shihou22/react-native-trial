import fetch from "cross-fetch";
import { put } from "redux-saga/effects";
import { initialTodoSuccess } from "../modules/todomodule";
import { signInSuccess } from "../modules/loginmodule";
import { initialVpcSuccess } from "../modules/vpcmodule";
import { API, Auth } from "aws-amplify";
import param from "../aws-exports";

require("amazon-cognito-js");

const f = async () => {
  const data = await Auth.currentUserInfo();
  // if (!data)
  //     return
  // const resp = await Auth.currentSession()
  // console.log(JSON.stringify(data.username))
  // const accessToken = resp.getAccessToken().getJwtToken()
  // console.log("トークン: ", accessToken)
  return data;
};

export function* signIn(acton) {
  try {
    const data = yield f();
    console.log(data);
    yield put(signInSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* initialTodoLoad(acton) {
  try {
    const data = yield f();
    const apiName = param.aws_cloud_logic_custom[0].name;
    const path = "/ryosampmobile/" + data.id;

    const myInit = {
      headers: {},
      response: true,
      queryStringParameters: {},
    };
    // データ取得
    const payload = yield API.get(apiName, path, myInit)
      .then((response) => {
        // console.log("response");
        // console.log(JSON.stringify(response));
        return response.data;
      })
      .catch((error) => {
        // console.log(JSON.stringify(error))
        // console.log(error)
        return error;
      });
    // //POST完了したらINITIAL_TODO_SUCCESSをdispatch
    yield put(initialTodoSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

export function* initialVpcLoad(acton) {
  try {
    const response = yield fetch(
      "https://XXXXXXX.execute-api.ap-northeast-1.amazonaws.com/production/vpc",
      {
        mode: "cors",
        type: "GET",
      }
    );
    const payload = yield response.json();
    // payload.forEach(item => console.log(item))
    for (const item of payload) {
      yield initialSubnetLoad(item.VpcId);
    }
  } catch (error) {
    console.log(error);
  }
}

// export function* initialSubnetLoad(acton) {
export function* initialSubnetLoad(vpcId) {
  try {
    // const vpcId = acton.payload.vpcId
    const URL =
      "https://XXXXXXX.execute-api.ap-northeast-1.amazonaws.com/production/vpc/" +
      vpcId +
      "/subnet";
    // console.log(URL)
    const response = yield fetch(URL, {
      mode: "cors",
      type: "GET",
    });
    const payload = yield response.json();
    // payload.forEach(item => console.log(item))
    const ret = payload.Subnets;
    yield put(initialVpcSuccess(vpcId, ret));
  } catch (error) {
    console.log(error);
  }
}
