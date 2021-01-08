import incomeActions from '@/store/modules/income/incomeActions';
import incomeState from '@/store/modules/income/incomeState';
import incomeGetters from '@/store/modules/income/incomeGetters';
import incomeMutations from '@/store/modules/income/incomeMutations';

export default {
  namespaced: true,
  state: incomeState,
  mutations: incomeMutations,
  getters: incomeGetters,
  actions: incomeActions,
};
