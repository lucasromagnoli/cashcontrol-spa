import templateActions from '@/store/modules/_template/templateActions';
import templateState from '@/store/modules/_template/templateState';
import templateGetters from '@/store/modules/_template/templateGetters';
import templateMutations from '@/store/modules/_template/templateMutations';

export default {
  namespaced: true,
  state: templateState,
  mutations: templateMutations,
  getters: templateGetters,
  actions: templateActions,
};
