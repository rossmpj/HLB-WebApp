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

    /* Inventario IP */
    static crear_ip = (ip) => {
        return AxiosTipo.instanceAxios.post(`/crear_ip`, ip);
    }

    static ver_ips = () => {
        return AxiosTipo.instanceAxios.get(`/listar_ips`);
    }

    static editar_ip = (ip) => {
        return AxiosTipo.instanceAxios.put(`/editar_ip`,ip);
    }


    /* Inventario Impresora */
    static crear_impresora = (impresora) => {
        return AxiosTipo.instanceAxios.post(`/impresora`, impresora);
    }

    static mostrar_impresoras = () => {
        return AxiosTipo.instanceAxios.get(`/impresoraxequipo`);
    }

    static editar_impresora = (impresora) => {
        return AxiosTipo.instanceAxios.put(`/editar_impresora`,impresora);
    }


    /* Inventario otros equipos */
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

    static impresora_id = (id_equipo) => {
        return AxiosTipo.instanceAxios.get(`/impresora_id/${id_equipo}`);
    }
}