import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://app-appetito.herokuapp.com/'
});

export default clienteAxios;