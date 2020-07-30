import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosReporte {
    static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
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