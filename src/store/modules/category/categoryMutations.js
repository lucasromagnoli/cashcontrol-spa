import { updateObjectInsideArray, nvl } from '@/core/utils';

export default {
  BOOTSTRAP_CATEGORY(state, categories) {
    state.category.dataTable = nvl(categories, []);
    state.category.lastUpdate = new Date();
  },
  BOOTSTRAP_SUBCATEGORY(state, subcategories) {
    state.subcategory.dataTable = nvl(subcategories, []);
    state.subcategory.lastUpdate = new Date();
  },
  INSERT_CATEGORY(state, target) {
    state.category.dataTable.push(target);
  },
  INSERT_SUBCATEGORY(state, target) {
    state.subcategory.dataTable.push(target);
  },
  UPDATE_CATEGORY(state, target) {
    state.category.dataTable = updateObjectInsideArray(state.category.dataTable, target);
  },
  UPDATE_SUBCATEGORY(state, target) {
    state.subcategory.dataTable = updateObjectInsideArray(state.subcategory.dataTable, target);
  },
  DELETE_CATEGORY(state, target) {
    state.category.dataTable = state.category.dataTable.filter(
      (category) => category.id !== target.id,
    );
  },
  DELETE_SUBCATEGORY(state, target) {
    state.subcategory.dataTable = state.subcategory.dataTable.filter(
      (subcategory) => subcategory.id !== target.id,
    );
  },
};
