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

    static obtener_datos_usuario = (username) => {
        return AxiosAuth.instanceAxios.get(`/obtener_datos_usurios/${username}`);
    }

    static mostrar_usuario_det = (username) => {
        return AxiosAuth.instanceAxios.get(`/mostrar_usuario_det/${username}`);
    }

    static getProfile = () => {
        return AxiosAuth.instanceAxios.get('/user',
            {
                headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.usertoken}` }
            })
    }
}