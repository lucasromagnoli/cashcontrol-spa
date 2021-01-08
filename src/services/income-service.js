import BaseService from './base-service';

class IncomeService extends BaseService {
  constructor() {
    super({
      baseURL: 'http://www.localhost:8080',
      suffix: '/income',
    });
  }
}

export default new IncomeService();
