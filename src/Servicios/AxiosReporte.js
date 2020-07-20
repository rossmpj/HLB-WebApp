import axios from 'axios';

export default class AxiosReporte {
    static instanceAxios = axios.create({
    //baseURL: 'http://localhost:8000/api',
    baseURL: 'https://backend-hlb.herokuapp.com/api',
    });

    static reporte_general = () => {
        return AxiosReporte.instanceAxios.get(`/reporte-general`);
    }

    static reporte_bajas = () => {
        return AxiosReporte.instanceAxios.get(`/reporte-bajas`);
    }

    static resumen_bajas = () => {
        return AxiosReporte.instanceAxios.get(`/resumen-bajas`);
    }

}