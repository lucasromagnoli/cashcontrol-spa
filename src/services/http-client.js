import axios from 'axios';

export default class HttpClient {
  constructor({ baseURL, needAuth }) {
    console.log(`Construindo http-client: baseURL: ${baseURL}`);
    this.needAuth = needAuth;
    this.axiosIntance = axios.create({
      baseURL,
    });
  }
}
