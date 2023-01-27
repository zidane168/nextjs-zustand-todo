import axios from "axios"
import { envConfig, sitePrefix } from "./config"

const headers = {
    "Content-Type": "application/json"
}

const request = axios.create({
    baseURL: envConfig.API_PATH,
    withCredentials: false,
    headers
})

request.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

request.interceptors.response.use(
    (response) => {
        const msg = response?.data?.message;
        const code = response?.data?.code;

        if (code === 401) {
            let key = sitePrefix + "token"
            window.localStorage.setItem(key, "")
            window.sessionStorage.setItem(key, "")
            window.location.href = window.location.origin;            
        }

        return response
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
        }

        return Promise.reject(error.message)
    },
)

export default request