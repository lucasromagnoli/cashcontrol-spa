<template>
  <v-container>
    <slot name="messages"></slot>
    <h1>Subcategoria Listar</h1>
    <subcategory-table/>
  </v-container>
</template>

<script>
import SubcategoryTable from '@/components/SubcategoryTable.vue';

export default {
  name: 'SubcategoryList',
  components: { SubcategoryTable },
};
</script>

<style>

</style>
