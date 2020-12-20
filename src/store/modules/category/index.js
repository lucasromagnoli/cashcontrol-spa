import categoryActions from '@/store/modules/category/categoryActions';
import categoryState from '@/store/modules/category/categoryState';
import categoryGetters from '@/store/modules/category/categoryGetters';
import categoryMutations from '@/store/modules/category/categoryMutations';

export default {
  namespaced: true,
  state: categoryState,
  mutations: categoryMutations,
  getters: categoryGetters,
  actions: categoryActions,
};
