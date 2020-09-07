import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosDashboard {
  static instanceAxios = axios.create({   
    baseURL: VariableGlobal.baseURL,
  });


  static obtener_numero_total_equipos = () => {
    return AxiosDashboard.instanceAxios.get(`/obtener_numero_total_equipos/`);
  }

  static obtener_numero_total_ips = () =>{
    return AxiosDashboard.instanceAxios.get(`/obtener_numero_total_ips/`);
  }

  static obtener_numero_total_marcas = () =>{
    return AxiosDashboard.instanceAxios.get(`/obtener_numero_total_marcas/`);
  }

  static obtener_numero_total_programas = () =>{
    return AxiosDashboard.instanceAxios.get(`/obtener_numero_total_programas/`);
  }

  static mostrar_solicitudes = () =>{
    return AxiosDashboard.instanceAxios.get(`/mostrar_solicitudes_dashboard/`);
  }

}