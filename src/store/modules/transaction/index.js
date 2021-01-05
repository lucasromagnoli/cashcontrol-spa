import transactionActions from '@/store/modules/transaction/transactionActions';
import transactionState from '@/store/modules/transaction/transactionState';
import transactionGetters from '@/store/modules/transaction/transactionGetters';
import transactionMutations from '@/store/modules/transaction/transactionMutations';

export default {
  namespaced: true,
  state: transactionState,
  mutations: transactionMutations,
  getters: transactionGetters,
  actions: transactionActions,
};
