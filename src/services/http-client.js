import axios from 'axios';

export default class HttpClient {
  // TODO(08/12/2020): Implementar a abstração do axios
  constructor({ baseURL, needAuth }) {
    console.log(`Construindo http-client: baseURL: ${baseURL}`);
    this.needAuth = needAuth;
    this.axiosIntance = axios.create({
      baseURL,
    });
  }
}
