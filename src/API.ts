import axios from 'axios'
import { Task, TaskStatusEnum } from 'type.dto';

const baseUrl: string = process.env.SERVER_BASE_URL || '';
console.log(`Setting SERVER_BASE_URL: `, baseUrl);

export async function getTodos(): Promise<Task[]> {
    try {
        const todos = await axios.get(
            baseUrl
        )
        console.log(`[API_SUCCESS] GET ${baseUrl}: `, todos.data);
        if (Array.isArray(todos.data)) {
            return todos.data;
        } else {
            return []
        }
    } catch (error) {
        console.error(`[API_ERROR] GET ${baseUrl}: `, error)
        throw error;
    }
}

export async function addTodo(formData: Omit<Task, 'id'>): Promise<Task> {
    try {
        const saveTodo = await axios.post(
            baseUrl,
            formData
        )
        console.log(`[API_SUCCESS] GET ${baseUrl}: `, saveTodo.data);
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
        console.log(`[API_SUCCESS] GET ${baseUrl}: `, updatedTodo.data);
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
        console.log(`[API_SUCCESS] GET ${baseUrl}: `, deletedTodo.data);
        return deletedTodo.data;
    } catch (error) {
        console.error(`[API_ERROR] DELETE ${baseUrl}/${id}`, error)
        throw error;
    }
}