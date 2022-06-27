import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
    baseURL: 'http://worldtimeapi.org/api/timezone'
}

export const api = axios.create(config);