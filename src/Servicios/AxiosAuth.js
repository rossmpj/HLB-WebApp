import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosAuth {

    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,

    });

    static login(user) {
        return AxiosAuth.instanceAxios.post('/login', user);
    }

    static registrar_user(newUser) {
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

    static editar_user_web = (user) => {
        return AxiosAuth.instanceAxios.put(`/editar_user_web`,user);
    }

    static getProfile = () => {
        return AxiosAuth.instanceAxios.get('/user',
            {
                headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.usertoken}` }
            })
    }

    static get_users(){
        return  AxiosAuth.instanceAxios.get('/get_users');
    }
}