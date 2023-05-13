import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getTodos } from 'API'
import { Task, TaskStatusEnum } from 'type.dto'


type Filters = {
    status: string[];
    searchString: string;
}
type InitialState = {
    loading: boolean;
    todoList: Task[];
    filteredTodos: Task[];
    filters: Filters;
    error: string;
}
const initialState: InitialState = {
    loading: false,
    todoList: [],
    filteredTodos: [],
    filters: {
        status: [TaskStatusEnum.COMPLETED, TaskStatusEnum.TODO],
        searchString: '',
    },
    error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchTodoList = createAsyncThunk('todo/fetchTodoList', () => {
    return getTodos()
})
function getFilteredTodos(todoList: Task[], filters: Filters) {
    return todoList.filter(item => {
        return filters.status.includes(item.status)
            && item.name.toLowerCase().includes(filters.searchString.toLowerCase())
    });
}
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateFilters(state, action: PayloadAction<Filters>) {
            //Update Filtered Todo whenever a filter is updated
            if (action.payload.status) {
                state.filters.status = action.payload.status;
            }
            state.filters.searchString = action.payload.searchString || "";
            state.filteredTodos = getFilteredTodos(state.todoList, state.filters);
        }
    },
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
                state.filteredTodos = getFilteredTodos(state.todoList, state.filters);
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
export const { updateFilters } = todoSlice.actions;