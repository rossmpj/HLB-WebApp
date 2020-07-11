import axios from 'axios';

export default class AxiosDesktop {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });


  static crear_solicitud = (solicitud) => {
    return AxiosDesktop.instanceAxios.post(`/crear_solicitud`, solicitud);
  }

}