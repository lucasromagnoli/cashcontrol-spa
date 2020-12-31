import CategoryService from '@/services/category-service';
import SubcategoryService from '@/services/subcategory-service';
import config from '@/core/config';
import { dateDifferenceInMinutes, isEmptyArray } from '@/core/utils';

export default {
  async findCategories(store, forceUpdate = true) {
    const diffInMinus = dateDifferenceInMinutes(new Date(), store.state.category.lastUpdate);
    const dataTableIsEmpty = isEmptyArray(store.state.category.dataTable);
    const updateExpires = Number.isNaN(diffInMinus)
                          || diffInMinus >= config.CATEGORY_DATATABLE_EXPIRE_MINUTES;
    const isToUpdate = forceUpdate || dataTableIsEmpty || updateExpires;
    console.log(`dataTableIsEmpty: ${dataTableIsEmpty} - updateExpires: ${updateExpires}`);
    console.log('category/findCategories->isToUpdate:', isToUpdate);

    if (isToUpdate) {
      const { apiContent: categories } = await CategoryService.get({
        endpoint: '/',
        query: { page: 0, size: 100 },
      });
      store.commit('BOOTSTRAP_CATEGORY', categories);
    }
  },

  async findSubcategories(state) {
    const { apiContent: subcategories } = await SubcategoryService.get({
      endpoint: '/',
      query: { page: 0, size: 100 },
    });
    state.commit('BOOTSTRAP_SUBCATEGORY', subcategories);
  },

  async insertCategory(state, category) {
    const { apiContent: savedCategory } = await CategoryService.post({
      endpoint: '/',
      payload: category,
    });
    state.commit('INSERT_CATEGORY', savedCategory);
    return savedCategory;
  },

  async deleteCategory(state, { id }) {
    const { apiContent: deletedCategory } = await CategoryService.delete({
      endpoint: `/${id}`,
    });

    state.commit('DELETE_CATEGORY', deletedCategory);
  },

  async updateCategory(state, category) {
    const { apiContent: updatedCategory } = await CategoryService.put({
      endpoint: '/',
      payload: category,
    });

    state.commit('UPDATE_CATEGORY', updatedCategory);
    return updatedCategory;
  },
};
