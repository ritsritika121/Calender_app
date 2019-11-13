const intialState = {
    user: "",
    isUserDataReceived: false,
};

const myProfileReducer = (state = intialState, action) => {
    switch (action.type) {
        case "USER_DETAILS_RECEIVED": {
            return {
                ...state,
                user: action.payload,
                isUserDataReceived: true
            };
        }
        case "UPDATE_PROFILE":{
            return{
                ...state,
                user:action.payload,
                isUserDataReceived: true
            }
        }
        default:
            return state;
    }
};

export default myProfileReducer;


