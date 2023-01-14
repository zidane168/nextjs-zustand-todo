import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IItem } from './../../utils/interface'
import { STATUS } from './../../utils/contants'

interface ITodoState {
    id: number;
    job: string;
    type: string; 
    remark: string;
    dueDate: Date;
    status: STATUS.DOING;
    created: Date;
}

interface IListTodoState {
    todos: Array<ITodoState>;
    types: Array<IItem>;
    addTodo: () => void;
    markCompleteTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}
  
const store = (set, get) => ({
    todos: [],
    types: [
        {'name': 'Home', 'value': 'Home'},
        {'name': 'Research', 'value': 'Research'},
    ],

    addTodo: (item: ITodoState) => set(state => ({
        todos: [...state.todos, item]
    })),

    markCompleteTodo: (id: number) => {

        let items = get().todos;

        // items.filter((item, index) => index != )
 
        item.status = STATUS.COMPLETED

        set(state => ({
            todos: [...state.todos, item]
        })) 
    },

    removeTodo: (id: number) => {
        let items = get().todos[id]
        items.splice(id, 1)

        set(state => ({
            todos: items
        }))
    }
})
const useStore = create<IListTodoState>(devtools(store))

export default useStore