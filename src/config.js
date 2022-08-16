import axios from 'axios'

export const axiosInstance = axios.create({ // bunu surekli ayni seyi yazmamak icin yazdim
    baseURL: 'http://localhost:8080',
    // baseURL: 'https://dashboard.heroku.com/apps/mern-todoapp-withauth-be',
    // withCredentials: true, // cookie icin
})