import subcategoryActions from '@/store/modules/subcategory/subcategoryActions';
import subcategoryState from '@/store/modules/subcategory/subcategoryState';
import subcategoryGetters from '@/store/modules/subcategory/subcategoryGetters';
import subcategoryMutations from '@/store/modules/subcategory/subcategoryMutations';

export default {
  namespaced: true,
  state: subcategoryState,
  mutations: subcategoryMutations,
  getters: subcategoryGetters,
  actions: subcategoryActions,
};
