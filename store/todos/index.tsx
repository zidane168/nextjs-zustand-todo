import { create } from 'zustand'
import { IItem } from './../../utils/interface'

export enum TYPE {
    RESEARCH,
    HOME
}

interface ITodoState {
    no: Number;
    job: String;
    type: String; 
    remark: String;
    created: Date;
}

interface listTodoState {
    todos: Array<ITodoState>;
    types: Array<IItem>;
    addTodo: () => void;
}
 
const useStore = create<listTodoState>((set) => ({
    todos: [],
    types: [
        {'name': 'Home', 'value': 'Home'},
        {'name': 'Research', 'value': 'Research'},
    ],

    addTodo: (item: todoState) => (state => ({
        todos: [...state.todos, item]
    })),
 
 
}))

export default useStore