import axios from 'axios';

export default class AxiosTipo {
    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api',
    });


    /* Sección Inventario Marcas */

    static crear_marca = (tipo) => {
        return AxiosTipo.instanceAxios.post(`/crear_marca`, tipo);
    }

    static editar_marca = (marca) => {
        return AxiosTipo.instanceAxios.put(`/editar_marca`, marca);
    }



    /* Componente AsignarSelect*/

    static mostrar_empleados = () => {
        return AxiosTipo.instanceAxios.get(`/mostrar_empleados`);
    }


    /* Componente Principal */
    static mostrar_codigos = () => {
        return AxiosTipo.instanceAxios.get(`/mostrar_codigos`);
    }

    /* Sección Marcas */
    static mostrar_marcas = () => {
        return AxiosTipo.instanceAxios.get(`/listado_marcas`);
    }


    /* Mostrar Departamentos*/
    static mostrar_departamentos = () => {
        return AxiosTipo.instanceAxios.get(`/departamentos`);
    }

    /*Mostrar Organizaciones*/
    static mostrar_organizaciones = () => {
        return AxiosTipo.instanceAxios.get(`/organizaciones`);
    }

    /******************************************************************************/

    /*---------- Inventario IP ----------*/
    static crear_ip = (ip) => {
        return AxiosTipo.instanceAxios.post(`/crear_ip`, ip);
    }

    static ver_ips = () => {
        return AxiosTipo.instanceAxios.get(`/listar_ips`);
    }

    static editar_ip = (ip) => {
        return AxiosTipo.instanceAxios.put(`/editar_ip`,ip);
    }

    static buscar_ip=(id_ip) =>{
        return AxiosTipo.instanceAxios.get(`/ip_id/${id_ip}`);
    }

    static eliminar_ip=(id_ip)=>{
        return AxiosTipo.instanceAxios.delete(`/eliminar_ip/${id_ip}`);
    }


    /*---------- Inventario Impresora ----------*/
    static crear_impresora = (impresora) => {
        return AxiosTipo.instanceAxios.post(`/impresora`, impresora);
    }

    static mostrar_impresoras = () => {
        return AxiosTipo.instanceAxios.get(`/impresora_equipo`);
    }

    static editar_impresora = (impresora) => {
        return AxiosTipo.instanceAxios.put(`/editar_impresora`,impresora);
    }

    static impresora_id = (id_equipo) => {
        return AxiosTipo.instanceAxios.get(`/impresora_id/${id_equipo}`);
    }


    /*---------- Inventario otros equipos ----------*/
    static crear_otro_equipo = (equipo) => {
        return AxiosTipo.instanceAxios.post(`/otro_equipo`, equipo);
    }

    static mostrar_tipo_equipo = () => {
        return AxiosTipo.instanceAxios.get(`/tipo_equipo`);
    }

    static mostrar_equipos = () => {
        return AxiosTipo.instanceAxios.get(`/mostrar_equipos`);
    }

    static editar_equipo = (equipo) => {
        return AxiosTipo.instanceAxios.put(`/editar_equipo`,equipo);
    }  

    static equipo_id = (id_equipo) => {
        return AxiosTipo.instanceAxios.get(`/equipo_id/${id_equipo}`);
    }

    static eliminar_equipo = (id_equipo) => {
        return AxiosTipo.instanceAxios.put(`/eliminar_equipo/${id_equipo}`);
    }  
}