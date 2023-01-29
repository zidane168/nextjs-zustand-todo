export interface IItem {
    name: string;
    value: string;
}

export interface ITodoState {
    _id: string; 
    job: string;
    type: string; 
    remark: string;
    dueDate: string;
    status?: string;
    created?: string;
}