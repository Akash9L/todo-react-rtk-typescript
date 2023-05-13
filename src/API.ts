import axios from 'axios'
import { Task, TaskStatusEnum } from 'type.dto';

const baseUrl: string = (process.env.REACT_APP_SERVER_BASE_URL || '').concat('/api/task');
console.log(`Setting REACT_APP_SERVER_BASE_URL: `, baseUrl);

export async function getTodos(): Promise<Task[]> {
    try {
        console.log(`[API_CALL] GET ${baseUrl}: `);
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
        console.log(`[API_CALL] GET ${baseUrl}: `, {
            body: formData
        });
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
        console.log(`[API_CALL] GET ${baseUrl}/${todo.id}: `, {
            body: todoUpdate
        });
        const updatedTodo = await axios.patch(
            `${baseUrl}/${todo.id}`,
            todoUpdate
        )
        console.log(`[API_SUCCESS] GET ${baseUrl}/${todo.id}: `, updatedTodo.data);
        return updatedTodo.data;
    } catch (error) {
        console.error(`[API_ERROR] PATCH ${baseUrl}/${todo.id}: `, error)
        throw error;
    }
}

export async function deleteTodo(
    id: string
): Promise<any> {
    try {
        console.log(`[API_CALL] GET ${baseUrl}/${id}: `);
        const deletedTodo = await axios.delete(
            `${baseUrl}/${id}`
        )
        console.log(`[API_SUCCESS] GET ${baseUrl}/${id}: `, deletedTodo.data);
        return deletedTodo.data;
    } catch (error) {
        console.error(`[API_ERROR] DELETE ${baseUrl}/${id}`, error)
        throw error;
    }
}