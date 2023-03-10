import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IItem, ITodoState } from './../../utils/interface'
import { ROUTES, STATUS } from './../../utils/contants'
import moment from 'moment';
import { apiAddTodo, apiGetTodos, apiMarkCompleteTodo, apiRemoveTodo, apiSearchTodos } from '../../pages/api/api.todo';
import { useRouter } from 'next/router';


interface IListTodoState {
    total: number;
    todos: Array<ITodoState>;
    fetchTodos:  (accessToken: string, limit: number, page: number, job: string, type: number, status: string) => any;        // return statusCode for unauthorization
    types: Array<IItem>;
    addTodo: (accessToken: string, item: ITodoState, limit: number) => void;
    markCompleteTodo: (accessToken: string, id: string, index: number) => void;
    removeTodo: (accessToken: string, id: string) => void;
}

const store = (set:any, get:any) => ({
    total: 0,
    todos: [],
    fetchTodos: async(accessToken: string, limit: number, page: number, job: string, type: number, status: string) => {  
        // const items = await apiGetTodos(accessToken)
        const items:any = await apiSearchTodos(accessToken, limit, page, job, type, status) 
   
        if (items?.statusCode == 200) {
            await set({ 
                total: items.params.total,
                todos: items.params.todos  
            }) 
        }  
 
        return items 
    },
    types: [
        {'name': 'Home',        'value': 'Home'},
        {'name': 'Research',    'value': 'Research'},
    ],

    addTodo: async(accessToken: string, item: ITodoState, limit: number) => {
         
        // call API create todo 
        const added = await apiAddTodo(accessToken, item);
        if (added?.statusCode === 200) {
            
            // fetch data
            const result = await get().fetchTodos(accessToken, limit, 1, "", 0, "")      // fetch data
            result.message = added.message  // get back message from add, not search message
            return result;
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