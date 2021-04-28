import axios from 'axios';
import Utility from './UtilityService'; 
 

axios.defaults.withCredentials = true;

 
const BASE_URL = "/api";

const backend = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  timeout: 30000,
  withCredentials: true,
  headers: {
    common: {
      Authorization: `Bearer ${Utility.get("staff_token")}`,
    },
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});
 

backend.interceptors.request.use(function (config) {
  var token = Utility.get('staff_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default  backend