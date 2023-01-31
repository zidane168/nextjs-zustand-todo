export interface IItem {
    name: string;
    value: string;
}

export interface ITodoState {
    _id?: string; 
    job: string;
    type: number; 
    remark: string;
    dueDate: string;
    status?: string;
    createDate?: string;
}