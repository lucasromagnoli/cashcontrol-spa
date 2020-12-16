export default {
  BOOTSTRAP_ORIGIN(state, origins) {
    state.dataTable = origins;
    state.lastUpdate = new Date();
  },
  INSERT_ORIGIN(state, target) {
    state.dataTable.push(target);
  },
  DELETE_ORIGIN(state, target) {
    state.dataTable = state.dataTable.filter((origin) => origin.id !== target.id);
  },
};
