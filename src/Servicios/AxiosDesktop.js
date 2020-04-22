import axios from 'axios';

export default class AxiosDesktop {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static listar_desktops = () => {
    return AxiosDesktop.instanceAxios.get(`/listar_desktops`);
  }

  static obtenerInfoDesktop = (id_ip) => {
    return AxiosDesktop.instanceAxios.get(`/obtenerInfoDesktop/${id_ip}`)
  }

  static crear_desktop = (desktop) => {
    return AxiosDesktop.instanceAxios.post(`/crear_desktop`, desktop);
  }

  static editar_desktop = (desktop) => {
    return AxiosDesktop.instanceAxios.post(`/editar_desktop`, desktop);
  }

}
