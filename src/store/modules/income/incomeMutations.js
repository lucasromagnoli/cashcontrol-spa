import { nvl } from '@/core/utils';

export default {
  BOOTSTRAP_INCOME(state, incomes) {
    state.dataTable = nvl(incomes, []);
    state.lastUpdate = new Date();
  },
  INSERT_INCOME(state, target) {
    state.dataTable.push(target);
  },
  DELETE_INCOME(state, target) {
    state.dataTable = state.dataTable.filter((income) => income.id !== target.id);
  },
};
