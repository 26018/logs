// 添加请求拦截器
import axios from "axios";
import {navTo} from "@/api/utils.js";
import Message from "@/components/Message/index.js";

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem("user.token");
    if (token === null) {
        navTo("/user");
    }
    config.headers = {
        token: token,
    };
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message({
        type: 'danger',
        message: error.message
    })
    return Promise.reject(error);
});

// axios.defaults.baseURL = 'http://fixyou.top:2548'
axios.defaults.baseURL = 'http://localhost:2548'

export default axios;