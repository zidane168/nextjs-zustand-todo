import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IItem, ITodoState } from './../../utils/interface'
import { STATUS } from './../../utils/contants'
import moment from 'moment';



interface IListTodoState {
    todos: Array<ITodoState>;
    types: Array<IItem>;
    addTodo: (item: ITodoState) => void;
    markCompleteTodo: (id: string) => void;
    removeTodo: (id: string) => void;
}
  
const store = (set, get) => ({
    todos: [],
    types: [
        {'name': 'Home', 'value': 'Home'},
        {'name': 'Research', 'value': 'Research'},
    ],

    addTodo: (item: ITodoState) => {
        
        item.status = STATUS.DOING
        item.created = moment().format('YYYY-MM-DD')
        set(state => ({
            todos: [...state.todos, item]
        }))        
    },

    markCompleteTodo: (index: number) => {

        let items = get().todos;

        let temp = { ...items[index] };

        if (temp.status === STATUS.COMPLETED) {
            temp.status = STATUS.DOING
        } else {
            temp.status = STATUS.COMPLETED
        }
        
        items[index] = temp;

        set(state => ({
            todos: items
        })) 
    },

    removeTodo: (id: string) => {
        let items = get().todos

        items = items.filter( (item, _) => {
            return item.id != id
        }) 

        set(state => ({
            todos: items
        }))
    }
})
const useStore = create<IListTodoState>(devtools(store))

export default useStore