import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosDesktop {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
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

  static listado_codigos = () => {
    return AxiosDesktop.instanceAxios.get(`/listado_codigos`);
  }

  static reg_masivo_desktops = (desktops) => {
    return AxiosDesktop.instanceAxios.post(`/masivo_desktops`, desktops);
  }
}
