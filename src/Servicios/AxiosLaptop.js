import axios from 'axios';

export default class AxiosLaptop {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static listar_laptops = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_laptops`);
  }

  static obtenerInfoLaptop = (id_ip) => {
    return AxiosLaptop.instanceAxios.get(`/obtenerInfoLaptop/${id_ip}`)
  }

}
