import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getToken = () => {
    return sessionStorage.getItem("Token");
};

const headers = {
    'Authorization': 'Bearer ' + getToken()
};

export function fetchUserData() {

    return axios.get(`${BASE_URL}/userInfo`, { headers });
};