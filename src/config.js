import axios from 'axios'

export const axiosInstance = axios.create({ // bunu surekli ayni seyi yazmamak icin yazdim
    //baseURL: 'http://localhost:8080',
    baseURL: 'https://reactredux-todoapp-withauth-be.herokuapp.com/',
    // withCredentials: true, // cookie icin
})