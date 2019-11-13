import {api} from "./api";
import axios from "axios";

export const signUpUser = (payload) => dispatch => {
    axios
        .post("http://localhost:3000/users", payload)
        .then(response => {
            console.log("SignUp", response)
            const { token } = response.data;
            
                localStorage.setItem("calenderToken", token);
                alert("Registration successful. Please continue to login.");
                dispatch({ type: "USER_SIGNED_UP", payload: true });
            
        })
        .catch(err => {
            console.log(err);
            alert(err)
            
        });
};
