import BaseService from './base-service';

class SubcategoryService extends BaseService {
  constructor() {
    super({
      baseURL: 'http://www.localhost:8080',
      suffix: '/subcategory',
    });
  }
}

export default new SubcategoryService();
