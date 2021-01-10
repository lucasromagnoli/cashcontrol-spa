<template>
  <h1>Income List</h1>
</template>

<script>
export default {
  name: 'IncomeList',
  data() {
    return {
      dataTable: {
        loading: true,
        headers: [
          {
            text: 'Código',
            align: 'center',
            sortable: false,
            value: 'id',
          },
          { text: 'Data', value: 'date', align: 'center' },
          { text: 'Value', value: 'value', align: 'center' },
          { text: 'Origem', value: 'origin.name', align: 'center' },
          {
            text: 'Movimentação',
            value: 'transaction',
            align: 'center',
            sortable: false,
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>
