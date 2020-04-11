import axios from 'axios';

export default class AxiosLaptop {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static listar_desktops = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_desktops`);
  }

  static obtenerInfoDesktop = (id_ip) => {
    return AxiosLaptop.instanceAxios.get(`/obtenerInfoDesktop/${id_ip}`)
  }

}
