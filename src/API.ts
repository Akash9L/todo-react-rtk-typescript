import axios from 'axios'
import { Task, TaskStatusEnum } from 'type.dto';

const baseUrl: string = process.env.SERVER_BASE_URL || '';

export async function getTodos(): Promise<Task[]> {
    try {
        const todos = await axios.get(
            baseUrl
        )
        return todos.data;
    } catch (error) {
        console.error(`[API_ERROR] GET ${baseUrl}`, error)
        throw error;
    }
}

export async function addTodo(formData: Omit<Task, 'id'>): Promise<Task> {
    try {
        const saveTodo = await axios.post(
            baseUrl,
            formData
        )
        return saveTodo.data;
    } catch (error) {
        console.error(`[API_ERROR] POST ${baseUrl}`, error)
        throw error;
    }
}

export async function updateTodo(
    todo: Task
): Promise<any> {
    try {
        const todoUpdate: Pick<Task, 'status'> = {
            status: TaskStatusEnum.COMPLETED,
        }
        const updatedTodo = await axios.patch(
            `${baseUrl}/${todo.id}`,
            todoUpdate
        )
        return updatedTodo.data;
    } catch (error) {
        console.error(`[API_ERROR] PATCH ${baseUrl}/${todo.id}`, error)
        throw error;
    }
}

export async function deleteTodo(
    id: string
): Promise<any> {
    try {
        const deletedTodo = await axios.delete(
            `${baseUrl}/${id}`
        )
        return deletedTodo.data;
    } catch (error) {
        console.error(`[API_ERROR] DELETE ${baseUrl}/${id}`, error)
        throw error;
    }
}