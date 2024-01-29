import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://test.gefara.xyz/api/v1'
});

export default myAxios;