import router from "./router.js";
import axios from "axios";

export default () => {
    const useApi = axios.create();

    useApi.interceptors.request.use(config => {
        if (localStorage.getItem('access_token')) {
            // config.headers={
            //     'authorization' : `Bearer ${localStorage.getItem('access_token')}`
            // }
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            // config.headers.set('Authorization' ,`Bearer ${localStorage.getItem('access_token')}`);
            // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

        }
        return config;
    }, error => {
        console.log('error request');
    });

    useApi.interceptors.response.use(config => {
        if (localStorage.getItem('access_token')) {
            config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;

            // config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

        }
        return config;
    }, error => {
        if (error.response.data.message === 'Token has expired') {
            return axios.post('api/auth/refresh', {}, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                error.config.headers.authorization = `Bearer ${res.data.access_token}`;
                return useApi.request(error.config);
            })
        }
        if (error.response.status === 401) {
            router.push({name: 'user.login'})
        }

    });
    return useApi;
}
