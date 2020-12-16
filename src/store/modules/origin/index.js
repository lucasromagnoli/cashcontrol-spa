import originActions from '@/store/modules/origin/originActions';
import originState from '@/store/modules/origin/originState';
import originGetters from '@/store/modules/origin/originGetters';
import originMutations from '@/store/modules/origin/originMutations';

export default {
  namespaced: true,
  state: originState,
  mutations: originMutations,
  getters: originGetters,
  actions: originActions,
};
