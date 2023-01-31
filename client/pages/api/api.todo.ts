import { ITodoState } from './../../utils/interface';
import { AxiosError } from 'axios';
import axiosClient from '../../utils/axiosClient';
import { envConfig } from './../../utils/config'; 
 
export const apiGetTodos = async(
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


export const apiSearchTodos = async(
    accessToken: string,
    limit: number,
    page: number, 
    job: string, 
    type: number,
    status: string,
) => { 
    let url = `${envConfig.API_PATH}/todos/search?page=${page}&limit=${limit}` 
    try {  
        axiosClient.defaults.headers.common = {'Authorization': `bearer ${accessToken}`}
 
        if (type !== 0) {
            url = `${url}&type=${type}`
        }  

        if (job) {
            url = `${url}&job=${job}`
        }  

        if (status) {
            status = status.toUpperCase()
            url = `${url}&status=${status}`
        }  
         
 
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


export const apiMarkCompleteTodo = async(
    accessToken: string, 
    id: string
) => {
    let url = `${envConfig.API_PATH}/todos/${id}`

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

export const apiRemoveTodo = async(
    accessToken: string,
    id: string
) => {
    let url = `${envConfig.API_PATH}/todos/${id}`

    try {
        axiosClient.defaults.headers.common = {'Authorization': `bearer ${accessToken}` }
        const response = await axiosClient({
            method: "DELETE",
            url
        })

        const data = response.data;
        return data;
    } catch (error) {
        const err = error as AxiosError
        return err?.response?.data
    }
}

export const apiAddTodo = async(
    accessToken: string, 
    todo: ITodoState
) => {
    let url = `${envConfig.API_PATH}/todos/`

    try {
        axiosClient.defaults.headers.common = {'Authorization': `bearer ${accessToken}` }
        const response = await axiosClient({
            method: "POST",
            url,
            data: {
                job: todo.job,
                type: todo.type,
                dueDate: todo.dueDate,
                remark: todo.remark,
            }
        })

        const data = response.data
        return data;
    } catch(error) {
        const err = error as AxiosError
        return err?.response?.data
    }
} 