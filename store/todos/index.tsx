import { create } from 'zustand'

export enum TYPE {
    RESEARCH,
    HOME
}

interface todoState {
    no: Number;
    job: String;
    type: String; 
    remark: String;
    created: Date;
}

interface listTodoState {
    todos: Array<todoState>;
    addTodo: () => void;
}
 
const useStore = create<listTodoState>((set) => ({
    todos: [],

    addTodo: (item: todoState) => (state => ({
        todos: [...state.todos, item]
    })),
 
}))

export default useStore