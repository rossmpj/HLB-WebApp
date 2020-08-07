import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosSolicitud {
  static instanceAxios = axios.create({   
    baseURL: VariableGlobal.baseURL,
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

  static contar_solicitudes = () =>{
    return AxiosSolicitud.instanceAxios.get(`/contar_solicitudes`);
  }

}