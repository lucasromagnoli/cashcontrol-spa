<template>
  <v-data-table
    :headers="dataTable.headers"
    :items="isDetails ? dataTable.details : subcategoryDataTable"
    :items-per-page="5"
    :loading="dataTable.loading"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
import config from '@/core/config';

export default {
  name: 'SubcategoryTable',
  props: {
    details: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      dataTable: {
        loading: true,
        details: [],
        headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          // { text: 'Tipo', value: 'type' },
          { text: 'Nome', value: 'name' },
          { text: 'Descrição', value: 'description' },
        ],
      },
    };
  },
  methods: {
    setDetails(category) {
      this.dataTable.details = this.subcategoryDataTable.filter(
        (sub) => sub.category.id === category.id,
      );
    },
  },
  computed: {
    subcategoryDataTable() {
      return this.$store.getters['category/getSubcategoryDataTable'];
    },
    isDetails() {
      return this.details;
    },
  },
  async mounted() {
    await this.$store.dispatch('category/findSubcategories');
    if (!this.isDetails) {
      this.$store.dispatch('category/findSubcategories');
    } else {
      window.bus.$on(config.events.DETAILS_SUBCATEGORY, this.setDetails);
      console.log('listening', config.events.DETAILS_SUBCATEGORY);
    }

    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
