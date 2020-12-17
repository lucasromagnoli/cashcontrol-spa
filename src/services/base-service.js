import qs from 'qs';
import ErrorWrapper from './error-wrapper';
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
      throw new ErrorWrapper(error);
    }
  }

  async post({ endpoint, query, payload }) {
    try {
      const response = await this.httpClient.axiosIntance.post(
        this.handleEndpoint(endpoint, query),
        payload,
      );
      return new ResponseWrapper(response);
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  async put({ endpoint, query, payload }) {
    return this.httpClient.axiosIntance.put(this.handleEndpoint(endpoint, query), payload);
  }

  async delete({ endpoint, query }) {
    return this.httpClient.axiosIntance.delete(this.handleEndpoint(endpoint, query));
  }
}
