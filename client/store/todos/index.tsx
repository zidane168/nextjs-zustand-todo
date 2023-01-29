import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IItem, ITodoState } from './../../utils/interface'
import { ROUTES, STATUS } from './../../utils/contants'
import moment from 'moment';
import { apiAddTodo, apiGetTodos, apiMarkCompleteTodo, apiRemoveTodo } from '../../pages/api/api.todo';
import { useRouter } from 'next/router';


interface IListTodoState {
    todos: Array<ITodoState>; 
    fetchTodos: (accessToken: string) => number;        // return statusCode for unauthorization
    types: Array<IItem>;
    addTodo: (accessToken: string, item: ITodoState) => void;
    markCompleteTodo: (accessToken: string, id: number, index: number) => void;
    removeTodo: (accessToken: string, id: string) => void;
}

const store = (set:any, get:any) => ({
    todos: [],
    fetchTodos: async(accessToken: string) => {  
        const items = await apiGetTodos(accessToken)

        if (items?.statusCode == 200) {
            await set({ todos: items.params }) 
        }  
 
        return items 
    },
    types: [
        {'name': 'Home',        'value': 'Home'},
        {'name': 'Research',    'value': 'Research'},
    ],

    addTodo: async(accessToken: string, item: ITodoState) => {
         
        // call API create todo 
        const added = await apiAddTodo(accessToken, item);
        if (added?.statusCode === 200) {
            
            // fetch data
            return await get().fetchTodos(accessToken)      // fetch data
        }
    },

    markCompleteTodo: async(accessToken: string, id: string, index: number) => {

        let items = get().todos 
        let temp = { ...items[index] };

        if (temp.status === STATUS.COMPLETED) {
            temp.status = STATUS.DOING
        } else {
            temp.status = STATUS.COMPLETED
        }
        
        items[index] = temp;
        console.log(items)

        // call api update to server
        await apiMarkCompleteTodo(accessToken, id);

        set(() => ({
            todos: items
        }))  
    },

    removeTodo: async(accessToken: string, id: string) => {
 
        let items = get().todos
 
        items = items.filter( (item: ITodoState) => {
            return item._id != id
        }) 

        // call api remove
        await apiRemoveTodo(accessToken, id);

        set(() => ({
            todos: items
        }))
    }
})
// const useStore = create<IListTodoState>(devtools(store))
const useStore = create<IListTodoState>(store)

export default useStore