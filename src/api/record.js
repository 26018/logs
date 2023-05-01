import axios from "@/config/AxiosConfig.js";

export function recordPush(record) {
    let strings = record.split('\n');
    let title = strings.shift()
    return axios.post("/records/", {
        title: title,
        content: strings.join('\n')
    });
}

export function recordDelete(recordId) {
    return axios.delete("/records/" + recordId);
}

export function recordList() {
    return axios.get("/records/");
}

export function recordPull(recordId) {
    return axios.get("/records/" + recordId)
}