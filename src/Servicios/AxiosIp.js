import axios from 'axios';

export default class AxiosIp {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static ips_libres = () => {
    return AxiosIp.instanceAxios.get(`/ips_libres`);
  }
}