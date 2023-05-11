export enum TaskStatusEnum {
    TODO = 'INCOMPLETE',
    COMPLETED = 'COMPLETED',
}
export type Task = {
    id: number;
    name: string;
    description: string;
    status: TaskStatusEnum;
}