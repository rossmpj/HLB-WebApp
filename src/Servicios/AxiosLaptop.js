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

  static listar_so = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_so`);
  }

  static listar_office = () => {
    return AxiosLaptop.instanceAxios.get(`/listar_office`);
  }

  static darDeBajaEquipoID = (id_equipo, tipo) => {
    return AxiosLaptop.instanceAxios.put(`/darDeBajaEquipoID/${id_equipo}/${tipo}`);
  }  

}
