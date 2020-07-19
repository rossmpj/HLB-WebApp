import axios from 'axios';

export default class AxiosSolicitud {
  static instanceAxios = axios.create({
    //  baseURL: 'http://localhost:8000/api',    
    baseURL: 'https://backend-hlb.herokuapp.com/api',
  });


  static crear_solicitud = (solicitud) => {
    return AxiosSolicitud.instanceAxios.post(`/crear_solicitud`, solicitud);
  }

  static mostrar_solicitudes = () =>{
    return AxiosSolicitud.instanceAxios.get(`/mostrar_solicitudes`);
  }

  static mostrar_solicitudes_user = (id_user) =>{
    return AxiosSolicitud.instanceAxios.get(`/mostrar_solicitudes/${id_user}`);
  }

}