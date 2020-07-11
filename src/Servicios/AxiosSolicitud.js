import axios from 'axios';

export default class AxiosDesktop {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });


  static crear_solicitud = (solicitud) => {
    return AxiosDesktop.instanceAxios.post(`/crear_solicitud`, solicitud);
  }

  static mostrar_solicitudes = ()=>{
    return AxiosDesktop.instanceAxios.get(`/mostrar_solicitudes`);
  }

}