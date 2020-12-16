import BaseService from './base-service';

class OriginService extends BaseService {
  constructor() {
    super({
      baseURL: 'http://www.localhost:8080',
      suffix: '/origin',
    });
  }
}

export default new OriginService();
