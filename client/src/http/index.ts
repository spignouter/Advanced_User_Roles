import axios from 'axios';
import { config } from "process";

// базовый URL по которому axios будет слать запросы
// константа для того что бы каждый раз не указывать куда слать запросы
export const API_URL = `http://localhost:5000/api`

// создаем инстанц (обьект) 
const $api = axios.create({
    // что бы к каждому запросу куки цеплялись автматитечски
    withCredentials: true,
    baseURL:API_URL
})

//  интерцепторы, метод который перехватывает запросы и ответы 
//  интерцептор на запрос будет вешать Headers:{Authorization: "Bearer ${ACCES_TOKEN}"}
//  то есть наш токен 

$api.interceptors.request.use((config)=>{
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;

// интерцептор на получния ответа от сервера.
// Если статус код 200 то все в порядке
// если получаем ответ от сервера 401 (не авторизован)
// то отправляем запрос на обновление токена доступа (acces token)
// повторяем запрос на получения токена


