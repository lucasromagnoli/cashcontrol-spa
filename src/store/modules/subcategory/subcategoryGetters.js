export default {
  getDataTable(state) {
    return state.dataTable;
  },
  getDataTableIncomes(state) {
    return state.dataTable.filter((subcategory) => subcategory.category.type === 'INCOME');
  },
  getDataTableExpenses(state) {
    return state.dataTable.filter((subcategory) => subcategory.category.type === 'EXPENSE');
  },
};
