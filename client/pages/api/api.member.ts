import { AxiosError } from 'axios';
import request from '../../utils/request';
import { envConfig } from './../../utils/config'; 

export const loginMember = async(
    username: string,
    password: string
) => {
    let url = `${envConfig.API_PATH}/users/login`

    try {
        const response = await request({
            method: "POST",
            url, 
            data: {
                username, password
            }
        })

        const data = response.data;
        return data;
    } catch (error) {
        const err = error as AxiosError
        return err?.response?.data
    }

}