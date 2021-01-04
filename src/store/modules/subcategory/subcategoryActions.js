import SubcategoryService from '@/services/subcategory-service';
import config from '@/core/config';
import { storeIsToUpdate } from '@/core/utils';

export default {
  async findSubcategories(store, forceUpdate = true) {
    const isToUpdate = storeIsToUpdate(forceUpdate,
      store.state.lastUpdate, config.SUBCATEGORY_DATATABLE_EXPIRE_MINUTES,
      store.state.dataTable);

    console.log('subcategory/findSubcategories->isToUpdate:', isToUpdate);
    if (isToUpdate) {
      const { apiContent: subcategories } = await SubcategoryService.get({
        endpoint: '/',
        query: { page: 0, size: 100 },
      });
      store.commit('BOOTSTRAP_SUBCATEGORY', subcategories);
    }
  },

  async insertSubcategory(state, subcategory) {
    const { apiContent: savedSubcategory } = await SubcategoryService.post({
      endpoint: '/',
      payload: subcategory,
    });
    state.commit('INSERT_SUBCATEGORY', savedSubcategory);
    return savedSubcategory;
  },

  async deleteSubcategory(state, { id }) {
    const { apiContent: deletedSubcategory } = await SubcategoryService.delete({
      endpoint: `/${id}`,
    });

    state.commit('DELETE_SUBCATEGORY', deletedSubcategory);
  },

  async updateSubcategory(state, subcategory) {
    const { apiContent: updatedSubcategory } = await SubcategoryService.put({
      endpoint: '/',
      payload: subcategory,
    });

    state.commit('UPDATE_SUBCATEGORY', updatedSubcategory);
    return updatedSubcategory;
  },
};
