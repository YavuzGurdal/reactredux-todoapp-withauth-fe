// import axios from 'axios'
import { axiosInstance } from "../../config"

const API_URL = '/api/todos/'

//Create User todo (axios)
const createTodo = async (todo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post(API_URL, todo, config)

    return response.data
}

// Get user todos
const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axiosInstance.get(API_URL, config)

    return response.data
}

// Delete user todo
const deleteTodo = async (todoId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axiosInstance.delete(API_URL + todoId, config)

    return response.data
}

// Delete user todo
const completeTodo = async (todoId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axiosInstance.get(API_URL + 'complete/' + todoId, config)

    return response.data
}

// Update user todo
const updateTodo = async (todoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axiosInstance.put(API_URL + todoData._id, todoData, config)

    return response.data
}

const todoService = {
    createTodo, deleteTodo, getTodos, completeTodo, updateTodo
}

export default todoService