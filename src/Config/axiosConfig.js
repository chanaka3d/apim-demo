import axios from 'axios';
import { getAllSessionParameters } from "../actions/session";
import {CONFIG} from "../config";

const instance = axios.create({
    baseURL: CONFIG.GATEWAY_URL
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Accept'] = '*/*';
instance.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate, br';


instance.interceptors.request.use(function (config) {
    const session = getAllSessionParameters();
    const token = session.ACCESS_TOKEN;
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default instance;
