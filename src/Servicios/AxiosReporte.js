import axios from 'axios';

export default class AxiosReporte {
    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api',
    });

    static reporte_general = () => {
        return AxiosReporte.instanceAxios.get(`/reporte-general`);
    }

    static reporte_bajas = () => {
        return AxiosReporte.instanceAxios.get(`/reporte-bajas`);
    }

}