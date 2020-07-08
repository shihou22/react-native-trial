/*
action types
 */

export const INITIAL_VPC_REQUESTED = "INITIAL_VPC_REQUESTED";
export const INITIAL_VPC_SUCCESS = "INITIAL_VPC_SUCCESS";

/*
action creators
 */

export const initialVpcRequested = () => {
    return {
        type: INITIAL_VPC_REQUESTED
    };
};

export const initialVpcSuccess = (VpcId, subnet) => {
    return {
        type: INITIAL_VPC_SUCCESS,
        payload: {
            id: VpcId,
            index: VpcId,
            description: VpcId,
            subnet: subnet.map(item => ({subnet: item.SubnetId, subnetArn: item.SubnetArn})),
        }
    };
};
// const initialState = {
//     id: "",
//     index: "",
//     description: "",
//     subnet: [],
// };
export const reducerVpcList = (state = [], action) => {
    const actionType = action.type;
    const payload = action.payload;

    switch (actionType) {
        case INITIAL_VPC_SUCCESS:
            // console.log(JSON.stringify(payload))
            return !payload ? state : [...state, payload]
        default:
            return state;
    }
};
