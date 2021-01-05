import TransactionServer from '@/services/transaction-service';
import config from '@/core/config';
import { storeIsToUpdate } from '@/core/utils';

export default {
  async findTransactions(store, forceUpdate = true) {
    const isToUpdate = storeIsToUpdate(forceUpdate,
      store.state.lastUpdate, config.TRANSACTION_DATATABLE_EXPIRE_MINUTES,
      store.state.dataTable);

    console.log('transaction/findTransactions->isToUpdate:', isToUpdate);
    if (isToUpdate) {
      const { apiContent: transactions } = await TransactionServer.get({
        endpoint: '/',
        query: { page: 0, size: 100 },
      });
      store.commit('BOOTSTRAP_TRANSACTION', transactions);
    }
  },

  async insertTransaction(state, transaction) {
    const { apiContent: savedTransaction } = await TransactionServer.post({
      endpoint: '/',
      payload: transaction,
    });
    state.commit('INSERT_TRANSACTION', savedTransaction);
    return savedTransaction;
  },

  async deleteTransaction(state, { id }) {
    const { apiContent: deletedTransaction } = await TransactionServer.delete({
      endpoint: `/${id}`,
    });

    state.commit('DELETE_TRANSACTION', deletedTransaction);
  },
};
