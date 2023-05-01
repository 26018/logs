import axios from "@/config/AxiosConfig.js";

export function userLogin(account, password) {
    return axios.post('/user/login', {
        account: account,
        password: password
    })
}

export function userRegister(account, password, code) {
    return axios.post('/user/register', {
        account: account,
        password: password,
        code: code
    });
}