import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080"
});

export const api = {
    get(url) {
        return instance.get(url);
    },
    post(url, body) {
        return instance.post(url, body);
    }
}