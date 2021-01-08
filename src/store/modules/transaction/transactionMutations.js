import { nvl } from '@/core/utils';

export default {
  BOOTSTRAP_TRANSACTION(state, transactions) {
    state.dataTable = nvl(transactions, []);
    state.lastUpdate = new Date();
  },
  INSERT_TRANSACTION(state, target) {
    state.dataTable.push(target);
  },
  DELETE_TRANSACTION(state, target) {
    state.dataTable = state.dataTable.filter((transaction) => transaction.id !== target.id);
  },
};
