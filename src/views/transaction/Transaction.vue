<template>
<v-container>
  <slot name="messages"></slot>
  <h1>Movimentações</h1>
  <v-data-table
    :headers="dataTable.headers"
    :items="transactionDataTable"
    :items-per-page="20"
    :loading="dataTable.loading"
    dense
    class="elevation-1"
  >
      <template v-slot:item.value="{ item }">
        {{ formatCurrency(item.value) }}
      </template>

      <template v-slot:item.date="{ item }">
        {{ formatDate(new Date(item.date), {onlyDate: true}) }}
      </template>

      <template v-slot:item.type="{ item }">
        <v-chip
            :color="item.type === 'INCOME' ? 'green' : 'red'"
            dark
            class="mb-1 mt-1"
          >
          {{ item.type }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { formatCurrency, formatDate } from '@/core/utils';

export default {
  name: 'Transaction',
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
          { text: 'Tipo', value: 'type', align: 'center' },
        ],
      },
    };
  },
  computed: {
    transactionDataTable() {
      return this.$store.getters['transaction/getDataTable'];
    },
  },
  methods: {
    formatCurrency,
    formatDate,
  },
  async mounted() {
    try {
      await this.$store.dispatch('transaction/findTransactions', false);
    } catch (error) {
      // insertMessage({
      //   type: config.messages.ERROR,
      //   text: getErrorMessage(error),
      //   dismissible: true,
      // });
    }
    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
