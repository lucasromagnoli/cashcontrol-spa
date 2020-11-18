<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Categorias</h1>
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
        >
          New Category
        </v-btn>
      </v-card-title>
      <v-data-table
          dense
          :headers="headers"
          :items="categories"
          :loading="loading"
          :search="search"
          item-key="name"
          class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {api} from '@/service/api';

export default {
  name: 'Category',
  data: () => ({
    loading: true,
    search: '',
    lastLoad: null,
    categories: [
      {
        id: 159,
        name: 'Categória Aleatória',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'EXPENSE'
      }
    ],
    headers: [
      {text: 'Código', value: 'id', align: 'start', sortable: false,},
      {text: 'Nome', value: 'name'},
      {text: 'Descricão', value: 'description'},
      {text: 'Tipo', value: 'type'},
    ],
  }),
  methods: {
    async handleCategories() {
      const response = await api.get('/category/?page=0&size=1000');
      this.categories = response.data.payload.content.map(c => {
        return {
          description: '-',
          ...c,
        }
      });
      this.lastLoad = new Date();
      this.loading = false;
    }
  },
  created() {
    this.handleCategories();
  },
}
</script>

<style scoped>

</style>