import { api } from "../actions/api";
import axios from "axios";
import GetUserToken from "../Util/GetUserToken";

export function getUserProfileDetails() {

    const token = GetUserToken();
    return axios
        .get("http://localhost:3000/users/me", { headers: { Authorization: `${token}` } })

};

export function addEventDetails(data) {
    const token = GetUserToken();
    return axios
        .post(api + "/tasks", data, {
            headers: {
                Authorization: `${token}`
            }
        })
}

export function getEventDetails() {

    const token = GetUserToken();
    return axios
        .get(api + "/tasks", { headers: { Authorization: `${token}` } })

};

