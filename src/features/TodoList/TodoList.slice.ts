import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getTodos } from 'API'
import { Task } from 'type.dto'

type InitialState = {
    loading: boolean;
    todoList: Task[];
    filteredSet: {
        filter: string;
        searchString: string;
        filteredTodos: Task[];
    }
    error: string;
}
const initialState: InitialState = {
    loading: false,
    todoList: [],
    filteredSet: {
        filter: '',
        filteredTodos: [],
        searchString: '',
    },
    error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchTodoList = createAsyncThunk('todo/fetchTodoList', () => {
    return getTodos()
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
            (state, action: PayloadAction<Task[]>) => {
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