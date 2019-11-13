const initialState = {
    isUserLoggedIn: false,
    userJWTtoken: ""
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOGGED_IN": {
            return {
                ...state,
                isUserLoggedIn: true,
                userJWTtoken: action.payload
            };
        }
        case "RESET_USER": {
            return { ...initialState };
        }
        default:
            return state;
    }
};
export default loginReducer;
