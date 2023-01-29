import { AxiosError } from 'axios';
import axiosClient from '../../utils/axiosClient';
import { envConfig } from './../../utils/config'; 
 
export const getTodos = async(
    accessToken: string
) => { 
    let url = `${envConfig.API_PATH}/todos` 
    try {  
        axiosClient.defaults.headers.common = {'Authorization': `bearer ${accessToken}`}
        const response = await axiosClient({
            method: "GET",
            url,   
        })

        const data = response.data; 
        return data;
    } catch (error) {
        const err = error as AxiosError
        return err?.response?.data
    }
}

export const markCompleteTodo = async(
    accessToken: string, 
    id: string
) => {
    let url = `${envConfig.API_PATH}/todo/${id}`

    try {
        axiosClient.defaults.headers.common = {'Authorization': `bearer ${accessToken}` }
        const response = await axiosClient({
            method: "PATCH",
            url
        })

        const data = response.data;
        return data;
    } catch (error) {
        const err = error as AxiosError
        return err?.response?.data
    }
}