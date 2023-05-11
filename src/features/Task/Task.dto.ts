export enum TodoListStatusEnum {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETED = 'COMPLETED',
}
export type TodoTask = {
    id?: number;
    name: string;
    description: string;
    status: TodoListStatusEnum;
}