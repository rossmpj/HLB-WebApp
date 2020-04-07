import axios from 'axios';

export default class AxiosLaptop {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static codigos_laptops = () => {
    return AxiosLaptop.instanceAxios.get(`/codigos_laptops`);
  }

  static obtenerInfoLaptop = (id_ip) => {
    return AxiosLaptop.instanceAxios.get(`/obtenerInfoLaptop/${id_ip}`)
  }

}
