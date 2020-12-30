import CategoryService from '@/services/category-service';
import SubcategoryService from '@/services/subcategory-service';

export default {
  async findCategories(state) {
    const { apiContent: categories } = await CategoryService.get({
      endpoint: '/',
      query: { page: 0, size: 100 },
    });
    state.commit('BOOTSTRAP_CATEGORY', categories);
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
};
