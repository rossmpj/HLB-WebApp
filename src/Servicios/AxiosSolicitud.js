import axios from 'axios';

export default class AxiosSolicitud {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });


  static crear_solicitud = (solicitud) => {
    return AxiosSolicitud.instanceAxios.post(`/crear_solicitud`, solicitud);
  }

  static mostrar_solicitudes = ()=>{
    return AxiosSolicitud.instanceAxios.get(`/mostrar_solicitudes`);
  }

}