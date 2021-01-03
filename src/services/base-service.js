import qs from 'qs';
import ErrorWrapper from './error-wrapper';
import HttpClient from './http-client';
import ResponseWrapper from './response-wrapper';

function debugRequest({ type, uri, payload }) {
  console.log(`making a ${type} in ${uri} payload: ${payload === undefined ? 'without payload' : JSON.stringify(payload)}`);
}
export default class BaseService {
  constructor({ baseURL, suffix = '' }) {
    console.log(`Construindo base-service: baseURL: ${baseURL}`);
    this.httpClient = new HttpClient({ baseURL });
    this.suffix = suffix;
  }

  handleEndpoint(endpoint = '', query = '') {
    let parsedQuery = '';
    if (query !== '') {
      parsedQuery = `?${qs.stringify(query)}`;
    }

    return `${this.suffix}${endpoint}${parsedQuery}`;
  }

  async get({ endpoint, query }) {
    const uri = this.handleEndpoint(endpoint, query);
    debugRequest({
      type: 'get',
      uri,
    });
    try {
      const response = await this.httpClient.axiosIntance.get(uri);
      return new ResponseWrapper(response);
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  async post({ endpoint, query, payload }) {
    const uri = this.handleEndpoint(endpoint, query);
    debugRequest({
      type: 'post',
      uri,
      payload,
    });
    try {
      const response = await this.httpClient.axiosIntance.post(
        uri,
        payload,
      );
      return new ResponseWrapper(response);
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  async put({ endpoint, query, payload }) {
    const uri = this.handleEndpoint(endpoint, query);
    debugRequest({
      type: 'put',
      uri,
      payload,
    });
    try {
      const response = await this.httpClient.axiosIntance.put(
        uri,
        payload,
      );
      return new ResponseWrapper(response);
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  async delete({ endpoint }) {
    const uri = this.handleEndpoint(endpoint);
    debugRequest({
      type: 'delete',
      uri,
    });
    try {
      const response = await this.httpClient.axiosIntance.delete(uri);
      return new ResponseWrapper(response);
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }
}
