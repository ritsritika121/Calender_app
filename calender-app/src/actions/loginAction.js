import { api } from "./api";
import axios from "axios";

export const loginUser = (payload) => dispatch => {
    axios
        .post("http://localhost:3000/users/login", payload)
        .then(response => {
            const { token } = response.data;
            localStorage.setItem("JWTcalenderToken", token);
            dispatch({ type: "USER_LOGGED_IN", payload: token });
        })
        .catch(err => {
            console.log(err)
            alert(err)
        });
};

export function resetUser() {
    return {
        type: 'RESET_USER',

    }
}

export function logoutUser() {
    return { type: 'CLEAR_STORE' };
}
