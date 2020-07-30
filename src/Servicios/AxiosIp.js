import axios from 'axios';
import VariableGlobal from './VariableGlobal'
export default class AxiosIp {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static ips_libres = () => {
    return AxiosIp.instanceAxios.get(`/ips_libres`);
  }
}