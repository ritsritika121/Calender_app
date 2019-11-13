const initialState = {
    isUserRegistered: false
};

const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_SIGNED_UP": {
            return {
                ...state,
                isUserRegistered: action.payload
            };
        }
        default:
            return state;
    }
};
export default signUpReducer;
