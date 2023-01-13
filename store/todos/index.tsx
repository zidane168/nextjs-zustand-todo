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
    markComplete: (id: number) => void
}
 
const useStore = create<IListTodoState>((set) => ({
    todos: [],
    types: [
        {'name': 'Home', 'value': 'Home'},
        {'name': 'Research', 'value': 'Research'},
    ],

    addTodo: (item: ITodoState) => set(state => ({
        todos: [...state.todos, item]
    })),
}))

export default useStore