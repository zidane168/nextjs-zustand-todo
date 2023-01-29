import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IItem, ITodoState } from './../../utils/interface'
import { STATUS } from './../../utils/contants'
import moment from 'moment';
import { getTodos, markCompleteTodo } from '../../pages/api/api.todo';
import { getSession } from 'next-auth/react';



interface IListTodoState {
    todos: Array<ITodoState>;
    types: Array<IItem>;
    addTodo: (item: ITodoState) => void;
    markCompleteTodo: (accessToken: string, id: number, index: number) => void;
    removeTodo: (id: string) => void;
    fetchTodos: (accessToken: string) => void;
}
  
const store = (set:any, get:any) => ({
    todos: [],
    fetchTodos: async(accessToken: string) => {  
        const items = await getTodos(accessToken)
        await set({ todos: items })
    },
    types: [
        {'name': 'Home',        'value': 'Home'},
        {'name': 'Research',    'value': 'Research'},
    ],

    addTodo: (item: ITodoState) => {
        
        item.status = STATUS.DOING
        item.created = moment().format('YYYY-MM-DD')
        set((state: { todos: Array<ITodoState> }) => ({
            todos: [...state.todos, item]
        }))        
    },

    markCompleteTodo: async(accessToken: string, id: string, index: number) => {

        const result = await getTodos(accessToken)

        if (result?.statusCode == 200) {
            const items = result.params;
            let temp = { ...items[index] };

            if (temp.status === STATUS.COMPLETED) {
                temp.status = STATUS.DOING
            } else {
                temp.status = STATUS.COMPLETED
            }
            
            items[index] = temp;
            console.log(items)

            // call api
            // await markCompleteTodo(accessToken, id);

            set(() => ({
                todos: items
            })) 
        } 
    },

    removeTodo: (id: string) => {
        let items = get().todos

        items = items.filter( (item: ITodoState) => {
            return item._id != id
        }) 

        set(() => ({
            todos: items
        }))
    }
})
// const useStore = create<IListTodoState>(devtools(store))
const useStore = create<IListTodoState>(store)

export default useStore