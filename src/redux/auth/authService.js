// import axios from 'axios'
import { axiosInstance } from "../../config"

const API_URL = '/api/auth/'

//Signup User (axios)
const signup = async (userData) => {
    const response = await axiosInstance.post(API_URL + "signup", userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login User (axios)
const login = async (userData) => {
    const response = await axiosInstance.post(API_URL + "signin", userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout User (axios)
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    login, logout, signup
}

export default authService