import axios from 'axios';

const HttpService = axios.create({
  baseURL: "http://10.0.2.2:7000",
  timeout: 10000, // optional, 10s timeout
  headers: {
    'Authorization' : `Bearer QlVfQUxWSU5BX05PXzE=`,
    'Content-Type': 'application/json',
  },
});



export default HttpService;