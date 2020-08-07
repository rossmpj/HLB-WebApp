import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosPrograma {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static listado_programas = () => {
        return AxiosPrograma.instanceAxios.get(`/programas`);
    }

    static editores = () => {
        return AxiosPrograma.instanceAxios.get(`/editores_programa`);
    }

    static buscar_programa = (nombre) => {
        return AxiosPrograma.instanceAxios.get(`/buscar_programa/${nombre}`);
    }   

    static filtrar_programas = (filtros) => {
        return AxiosPrograma.instanceAxios.post(`/filtrar_programas`, filtros);
    }

    static crear_programa = (programa) => {
        return AxiosPrograma.instanceAxios.post(`/crear_programa`, programa);
    }
    
    static eliminar_programa = (id_programa) => {
        return AxiosPrograma.instanceAxios.put(`/eliminar_programa/${id_programa}`);
    }

    static editar_programa = (programa) => {
        return AxiosPrograma.instanceAxios.post(`/editar_programa`, programa);
    }

    static datos_programa = (id_programa) => {
        return AxiosPrograma.instanceAxios.get(`/buscar_programa_id/${id_programa}`);
    }

}
