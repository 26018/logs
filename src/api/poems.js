import axios from "@/config/AxiosConfig.js";

export function poems(currentPage, size) {
    return axios.get('/poems/?currentPage=' + currentPage + "&size=" + size);
}