import BaseService from './base-service';

class CategoryService extends BaseService {
  constructor() {
    super({
      baseURL: 'http://www.localhost:8080',
      suffix: '/category',
    });
  }
}

export default new CategoryService();
