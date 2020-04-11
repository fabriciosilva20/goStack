import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333', //
  //baseURL: 'http://localhost:3333', //para usar precisa executar o adb reverse tcp:3333 tcp:3333 no cmd
});

export default api;