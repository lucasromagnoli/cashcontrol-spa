import BaseService from './base-service';

class TransactionService extends BaseService {
  constructor() {
    super({
      baseURL: 'http://www.localhost:8080',
      suffix: '/transaction',
    });
  }
}

export default new TransactionService();
