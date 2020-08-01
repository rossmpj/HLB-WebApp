import axios from 'axios';

export default class AxiosAuth{

    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api',
        //baseURL: 'https://backend-hlb.herokuapp.com/api',
      });
    
    static login(user){
        return AxiosAuth.instanceAxios.post('/login', user);
    }

    static registrar_user(newUser){
        return AxiosAuth.instanceAxios.post('/register', newUser);
    }

    static registrar_user_web(newUser){
        return AxiosAuth.instanceAxios.post('/registrar_user_web', newUser);
    }
    static obtener_datos_usuario = (username) => {
        return AxiosAuth.instanceAxios.get(`/obtener_datos_usurios/${username}`);
    }

    static mostrar_usuario_det = (username) => {
        return AxiosAuth.instanceAxios.get(`/mostrar_usuario_det/${username}`);
    }

    static getProfile = () =>{
        return AxiosAuth.instanceAxios.get('/user', 
        {
            headers: {Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.usertoken}` }
        })
    }

    static get_users(){
        return  AxiosAuth.instanceAxios.get('/get_users');
    }
}