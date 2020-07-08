export const SIGNIN_REQUESTED = "SIGNIN_REQUESTED";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";

export const signInRequested = () => {
  return {
    type: SIGNIN_REQUESTED,
  };
};

export const signInSuccess = (auth) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: {
      auth: auth,
      userid: auth.email,
    },
  };
};

const initialState = {
  auth: null,
  userId: "",
};

export function reducerLogin(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      console.log("reducerUserId:" + action.payload.email);
      return { auth: action.payload.auth, userId: action.payload.email };
    default:
      return state;
  }
}

export default reducerLogin;
