import axios from 'axios';

export default class AxiosRouter {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static listar_routers = () => {
    return AxiosRouter.instanceAxios.get(`/listar_routers`);
  }

  static buscar_ip_por_codigo = (id_ip) => {
    return AxiosRouter.instanceAxios.get(`/buscar_ip_por_codigo/${id_ip}`)
  }
}