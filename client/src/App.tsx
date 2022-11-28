import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from './components/LoginForm';
import {Context} from "./index";
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';


// const App: FC = () =>{
//   const {store} = useContext(Context)
//   useEffect(()=>{
//     if(localStorage.getItem('token')){
//       store.checkAuth()
//     }
//   },[])
// }

const App: FC = () =>{
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect( ()=>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }

  },[])

  async function getUsers(){
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    }catch(e){
      console.log(e);
    }
  }

  if(store.isLoading){
    return <div>загрузка...</div>
  }

  // если пользователь не авторизован вернем другой шаблон
  if(!store.isAuth){
    return(
      <div>
      <LoginForm/>
      <button onClick={getUsers}>Получить пользователей</button>
      </div>
    )
  }

  return(
    <div>
      <h1>{store.isAuth ? `пользователь авторизован ${store.user.email}`: `Авторизуйтесь`}</h1>
      <button onClick={()=> store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user =>
        <div key={user.email}> {user.email}</div>)}
    </div>
  );

};



// function App() {
//   return (
//     <div>
// <LoginForm/>
//     </div>
//   );
// }

export default observer(App);
