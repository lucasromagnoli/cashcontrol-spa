import qs from 'qs';
import HttpClient from './http-client';
import ResponseWrapper from './response-wrapper';

export default class BaseService {
  // TODO(08/12/2020): Implementar o serviço base
  constructor({ baseURL, suffix = '' }) {
    console.log(`Construindo base-service: baseURL: ${baseURL}`);
    this.httpClient = new HttpClient({ baseURL });
    this.suffix = suffix;
  }

  handleEndpoint(endpoint = '', query = '') {
    return `${this.suffix}${endpoint}?${qs.stringify(query)}`;
  }

  async get({ endpoint, query }) {
    try {
      const response = await this.httpClient.axiosIntance.get(this.handleEndpoint(endpoint, query));
      return new ResponseWrapper(response);
    } catch (error) {
      // TODO(16/12/2020): Criar o error-wrapper
      console.log(error);
      return error;
    }
  }

  async post({ endpoint, query, payload }) {
    return this.httpClient.axiosIntance.post(this.handleEndpoint(endpoint, query), payload);
  }

  async put({ endpoint, query, payload }) {
    return this.httpClient.axiosIntance.put(this.handleEndpoint(endpoint, query), payload);
  }

  async delete({ endpoint, query }) {
    return this.httpClient.axiosIntance.delete(this.handleEndpoint(endpoint, query));
  }
}
