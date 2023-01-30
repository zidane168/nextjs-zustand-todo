import { AxiosError } from 'axios';
import axiosClient from '../../utils/axiosClient';
import { envConfig } from './../../utils/config'; 

export const loginMember = async(
    username: string,
    password: string
) => {
    let url = `${envConfig.API_PATH}/users/login`

    try {
        const response = await axiosClient({
            method: "POST",
            url, 
            data: {
                username, password
            }
        })

        const data = response.data;
        return data;

    } catch (error) {
        console.log( error )      // { statusCode: 404, message: 'User not fou
        
        console.log(error)
        return error?.message; 
    }

}

export const getProfile = async(
    accessToken: string
) => { 
    let url = `${envConfig.API_PATH}/users/getProfile` 
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