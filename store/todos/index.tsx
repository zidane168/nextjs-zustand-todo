import { create } from 'zustand'
import { IItem } from './../../utils/interface'
import { STATUS } from './../../utils/contants'

interface ITodoState {
    no: number;
    job: string;
    type: string; 
    remark: string;
    dueDate: Date;
    status: string;
    created: Date;
}

interface IListTodoState {
    todos: Array<ITodoState>;
    types: Array<IItem>;
    addTodo: () => void;
    markCompleteTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}
 
const useStore = create<IListTodoState>((set, get) => ({
    todos: [],
    types: [
        {'name': 'Home', 'value': 'Home'},
        {'name': 'Research', 'value': 'Research'},
    ],

    addTodo: (item: ITodoState) => set(state => ({
        todos: [...state.todos, item]
    })),

    markCompleteTodo: (id: number) => {

        let item = get().todos[id]
        item.status = STATUS.COMPLETED

        set(state => ({
            todos: [...state.todos, item]
        })) 
    },

    removeTodo: (id: number) => {
        let items = get().todos
        items.splice(id, 1)

        set(state => ({
            todos: items
        }))
    }
}))

export default useStore