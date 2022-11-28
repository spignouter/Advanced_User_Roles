import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService{
    // будут статик функции которые мы будем слать на сервер
    // с помощью дженериков <> мы знаем что возвращает нам функция Login
    static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void>{
        return $api.post('/logout')
    }
}