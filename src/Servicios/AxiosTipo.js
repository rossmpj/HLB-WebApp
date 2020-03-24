import axios from 'axios';

export default class AxiosTipo {
    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api',
    });

    static almacenar_datos = (tipo) => {
        return AxiosTipo.instanceAxios.post(`/crear_tipo`,tipo);
    }

}