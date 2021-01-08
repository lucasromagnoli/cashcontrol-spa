import IncomeServer from '@/services/income-service';
import config from '@/core/config';
import { storeIsToUpdate } from '@/core/utils';

export default {
  async findIncomes(store, forceUpdate = true) {
    const isToUpdate = storeIsToUpdate(
      forceUpdate,
      store.state.lastUpdate,
      config.INCOME_DATATABLE_EXPIRE_MINUTES,
      store.state.dataTable,
    );

    console.log('income/findIncomes->isToUpdate:', isToUpdate);
    if (isToUpdate) {
      const { apiContent: incomes } = await IncomeServer.get({
        endpoint: '/',
        query: { page: 0, size: 100 },
      });
      store.commit('BOOTSTRAP_INCOME', incomes);
    }
  },

  async insertIncome(state, income) {
    const { apiContent: savedIncome } = await IncomeServer.post({
      endpoint: '/',
      payload: income,
    });
    state.commit('INSERT_INCOME', savedIncome);
    state.commit('transaction/INSERT_TRANSACTION', savedIncome.transaction, { root: true });
    return savedIncome;
  },

  async deleteIncome(state, { id }) {
    const { apiContent: deletedIncome } = await IncomeServer.delete({
      endpoint: `/${id}`,
    });

    state.commit('DELETE_INCOME', deletedIncome);
  },
};
