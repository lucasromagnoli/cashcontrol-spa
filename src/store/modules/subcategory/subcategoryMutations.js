import { updateObjectInsideArray, nvl } from '@/core/utils';

export default {
  BOOTSTRAP_SUBCATEGORY(state, subcategories) {
    state.dataTable = nvl(subcategories, []);
    state.lastUpdate = new Date();
  },
  INSERT_SUBCATEGORY(state, target) {
    state.dataTable.push(target);
  },
  UPDATE_SUBCATEGORY(state, target) {
    state.dataTable = updateObjectInsideArray(state.dataTable, target);
  },
  DELETE_SUBCATEGORY(state, target) {
    state.dataTable = state.dataTable.filter(
      (subcategory) => subcategory.id !== target.id,
    );
  },
};
