import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from '../http';
import { IUser } from "../models/IUser";
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from "../services/AuthService";

// мобх это стате манегер
// здесь будут храниться состояния (данные) о пользователе
export default class Store{
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    constructor(){
        makeAutoObservable(this);
    }
    // мутации изменяющие поля стора

    setAuth(bool:boolean){
        this.isAuth = bool;
    }

    setUser(user: IUser){
        this.user = user;
    }

    // 
    setLoading(bool:boolean){
        this.isLoading = bool;

    }

    async login(email: string, password: string){
        try{
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            console.log(e.response?.data?.massage);
        }
    }

    async registration(email: string, password: string){
        try{
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            console.log(e.response?.data?.massage);
        }
    }

    async logout(){
        try{
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch(e){
            console.log(e.response?.data?.massage);
        }
    }

    // каждый раз когда открываеться приложение нужно получать информацию о пользователи и убедиться в том что пользователь авторизован
    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e){
            console.log(e.response?.data?.massage);
        } finally {
            this.setLoading(false);
        }
    }    
}