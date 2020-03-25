import axios from 'axios';

export default class AxiosTipo {
    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api',
    });

    /* Sección tipo de equipos */

    static almacenar_datos = (tipo) => {
        return AxiosTipo.instanceAxios.post(`/crear_tipo`, tipo);
    }

    static mostrar_datos = () => {
        return AxiosTipo.instanceAxios.get(`/ver_tipos`);
    }


    /* Inventario IP */
    static crear_ip = (ip) => {
        return AxiosTipo.instanceAxios.post(`/crear_ip`,ip);
    }

    static ver_ips = () => {
        return AxiosTipo.instanceAxios.get(`/listar_ips`);
    }
}