<template>
  <v-container>
    <h1>Categoria Listar</h1>

    <v-dialog v-model="showSubcategories" max-width="960px" eager>
      <subcategory-table :details="true" />
    </v-dialog>

    <v-data-table
      :headers="dataTable.headers"
      :items="categoryDataTable"
      :items-per-page="5"
      :loading="dataTable.loading"
      class="elevation-1"
    >
      <template v-slot:item.subcategories="{ item }">
        <v-btn
          block
          text
          tile
          @click="handleClickDetailsSubcategories(item)"
          class="elevation-2 accent"
        >
          consultar
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import SubcategoryTable from '@/components/SubcategoryTable.vue';
import { emitEvent } from '@/core/utils';
import config from '@/core/config';

export default {
  components: { SubcategoryTable },
  name: 'CategoryList',
  data() {
    return {
      showSubcategories: false,
      dataTable: {
        loading: true,
        headers: [
          {
            text: 'Código',
            align: 'center',
            sortable: false,
            value: 'id',
          },
          { text: 'Tipo', value: 'type', align: 'center' },
          { text: 'Nome', value: 'name', align: 'center' },
          { text: 'Descrição', value: 'description', align: 'center' },
          {
            text: 'Subcategorias',
            value: 'subcategories',
            width: '200px',
            align: 'center',
            sortable: false,
          },
          // { text: 'Ações', value: 'actions', sortable: false },
        ],
      },
    };
  },
  methods: {
    handleClickDetailsSubcategories(category) {
      this.showSubcategories = true;
      emitEvent(config.events.DETAILS_SUBCATEGORY, category);
    },
  },
  computed: {
    categoryDataTable() {
      return this.$store.getters['category/getCategoryDataTable'];
    },
  },
  mounted() {
    // TODO(20/12/2020): Implementar lógica de só atualizar a cada 5 minutos.
    this.$store.dispatch('category/findCategories');
    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
