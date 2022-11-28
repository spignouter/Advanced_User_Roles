import React, {FC, useContext, useState} from "react";
import { Context } from "../index";
import { observer } from 'mobx-react-lite';


//  Компонент функциональный 
// хук есть это функция, с помощью которой можно подцепиться к состонию и методам жизненного цикла React из функциональных компонентов. Хуки не работают внутри классов - они дают возможность использоать React без классов
// Есть всторенные хуки useState, userContext

const LoginForm: FC = () =>{
    const[email, setEmail] = useState<string>(' ');
    const[password, setPassword] = useState<string>(' ');
    const {store} = useContext(Context);

    return(
        <div>
            {/* В React HTML-элементы формы ведут себя немного 
            иначе по сравнению с DOM-элементами, так как у элементов 
            формы изначально есть внутреннее состояние. */}

            <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder='Почта'
            />

            <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Пароль'
            />

            <button onClick={()=>store.login(email, password)}>Логин</button>
            <button onClick={()=>store.registration(email, password)}>Регистрация</button>
        </div>
    );
};

export default observer(LoginForm);