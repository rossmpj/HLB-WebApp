import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosLaptop {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static listar_laptops = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_laptops`);
  }

  static obtenerInfoLaptop = (id_ip) => {
    return AxiosLaptop.instanceAxios.get(`/obtenerInfoLaptop/${id_ip}`)
  }

  static listar_so = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_so`);
  }

  static listar_office = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_office`);
  }

  static darDeBajaEquipoID = (id_equipo, tipo) => {
    return AxiosLaptop.instanceAxios.put(`/darDeBajaEquipoID/${id_equipo}/${tipo}`);
  }  

  static crear_laptop = (laptop) => {
    return AxiosLaptop.instanceAxios.post(`/crear_laptop`, laptop);
  }

  static editar_laptop = (laptop) => {
    return AxiosLaptop.instanceAxios.post(`/editar_laptop`, laptop);
  }
}
