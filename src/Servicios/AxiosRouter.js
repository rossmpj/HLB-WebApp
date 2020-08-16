import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosRouter {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static listar_routers = () => {
    return AxiosRouter.instanceAxios.get(`/listar_routers`);
  }

  static buscar_ip_por_codigo = (id_ip) => {
    return AxiosRouter.instanceAxios.get(`/buscar_ip_por_codigo/${id_ip}`)
  }

  static crear_equipo_router = (router) => {
    return AxiosRouter.instanceAxios.post(`/crear_equipo_router`,router);
  }

  static eliminar_router = (id) => {
    return AxiosRouter.instanceAxios.put(`/eliminar_router/${id}`);
  }

  static editar_equipo_router = (router) => {
    return AxiosRouter.instanceAxios.post(`/editar_router`, router);
  }

  static buscar_router_por_id = (id_router) => {
    return AxiosRouter.instanceAxios.get(`/buscar_router_por_id/${id_router}`)
  }

  static router_id = (id_equipo) => {
    return AxiosRouter.instanceAxios.get(`/router_id/${id_equipo}`)
  }

  static reg_masivo_routers = (routers) => {
    return AxiosRouter.instanceAxios.post(`/masivo_routers`,routers);
  }

}
