<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Receitas</h1>
      </v-card-title>

      <v-card-title
          class="align-end">
        <v-text-field
            append-icon="mdi-magnify"
            label="Pesquisar"
            v-model="search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn
            color="primary"
            :to="{name: 'incomeForm'}"
        >
          Cadastrar
        </v-btn>
      </v-card-title>
      <v-data-table
          dense
          :headers="headers"
          :items="incomes"
          :loading="loading"
          :search="search"
          item-key="name"
          class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {api, endpoint, map} from '@/service/api';

export default {
  name: 'IncomeList',
  data: () => ({
    search: '',
    loading: true,
    lastLoad: null,
    incomes: [],
    headers: [
      {text: 'Código', value: 'id', align: 'start'},
      {text: 'Data', value: 'date'},
      {text: 'Valor', value: 'value'},
      {text: 'Subcategoria', value: 'subcategory.name'},
      {text: 'Origem', value: 'origin.name'},
    ],
  }),
  async created() {
    const request = await api.get(map(endpoint.INCOME, endpoint.SEARCH));
    this.incomes = request.data.payload.content;
    this.loading = false;
  }
}
</script>

<style scoped>

</style>