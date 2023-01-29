import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { envConfig, sitePrefix } from "./config"

const headers = {
    "Content-Type": "application/json"
}

const axiosClient = axios.create({
    baseURL: envConfig.API_PATH,
    withCredentials: false,
    headers
})

// before send to server
axiosClient.interceptors.request.use(
    function (config: AxiosRequestConfig) { 
        return config; 
    },
    function (err) {
        return Promise.reject(err)
    }
)

// add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
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
    function (error) {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
        }

        return Promise.reject(error.message)
    },
)

export default axiosClient