import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TodoTask } from 'features/Task/Task.dto'

type InitialState = {
    loading: boolean
    todoList: TodoTask[]
    error: string
}
const initialState: InitialState = {
    loading: false,
    todoList: [],
    error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchTodoList = createAsyncThunk('todo/fetchTodoList', () => {
    return axios
        .get('http://localhost:3001/api')
        .then(response => response.data)
})

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTodoList.pending, state => {
            state.loading = true
        })
        builder.addCase(
            fetchTodoList.fulfilled,
            (state, action: PayloadAction<TodoTask[]>) => {
                state.loading = false
                state.todoList = action.payload
                state.error = ''
            }
        )
        builder.addCase(fetchTodoList.rejected, (state, action) => {
            state.loading = false
            state.todoList = []
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default todoSlice.reducer