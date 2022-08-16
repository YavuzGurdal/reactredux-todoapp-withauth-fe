import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create user Todo
export const createTodo = createAsyncThunk('todos/create',
    async (todo, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await todoService.createTodo(todo, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user todo
export const deleteTodo = createAsyncThunk('todos/delete',
    async (todId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await todoService.deleteTodo(todId, token) // goalService'den gelen deleteGoal() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user todos
export const getTodos = createAsyncThunk('todos/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await todoService.getTodos(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Complete user todo
export const completeTodo = createAsyncThunk('todos/complete',
    async (todoId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await todoService.completeTodo(todoId, token) // goalService'den gelen deleteGoal() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Update user todo
export const updateTodo = createAsyncThunk('todos/update',
    async (todoData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await todoService.updateTodo(todoData, token) // goalService'den gelen deleteGoal() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => initialState, // state'i resetlemek icin
        // reset: (state) => {
        //     state.isError = false
        //     state.isSuccess = false
        //     state.isLoading = false
        //     state.message = ''
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = action.payload
            })

            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos.push(action.payload)
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos.filter((todo) => todo._id !== action.payload.id)
                // action.payload.id'deki id'yi todoController.js icindeki deleteTodo'dan res.status(200).json({ id: req.params.id }) seklinde gonderdim
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(completeTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(completeTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos.map((todo) =>
                    todo._id === action.payload.id ? { ...todo, complete: action.payload.complete } : todo
                )
                // action.payload.id'deki id'yi ve complete'i todoController.js icindeki completeTodo'den 
                // res.status(200).json({ id: req.params.id, complete: completedTodo.complete }) seklinde gonderdim
            })
            .addCase(completeTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos.map((todo) =>
                    todo._id === action.payload._id ? { ...todo, todo: action.payload.todo } : todo
                )
                // action.payload._id'deki id'yi ve todo'yu todoController.js icindeki updateTodo'dan 
                // res.status(200).json(updatedTodo) seklinde gonderdim
                // todoService icinde response.data yazdigim icin direk icindekiler {} seklinde gelmis oldu
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = todoSlice.actions
export default todoSlice.reducer