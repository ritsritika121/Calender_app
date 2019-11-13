import { api } from "./api";
import axios from "axios";
import GetUserToken from "../Util/GetUserToken";

//getting user details from server
export const getUserProfileDetails = () => dispatch => {

    const token = GetUserToken();
    axios
        .get(api + "/users", { headers: { Authorization: `${token}` } })
        .then(response => {
            const { user } = response.data;
            dispatch({ type: "USER_DETAILS_RECEIVED", payload: user });
        })
        .catch(err => {
            console.log('Error ', err)
        });
};

//updating user details
export const updateUserProfileDetails = (UpdateProfileDetails) => ({
    type: "UPDATE_PROFILE",
    payload: UpdateProfileDetails
});