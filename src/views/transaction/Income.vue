<template>
  <v-form>
    <v-container>
      <h1>Cadastrar Receita</h1>
      <slot name="messages" />
      <v-currency-field label="Valor" v-model="income.value" prefix="R$" />
      <v-text-field v-model="income.description" label="Description" />
      <v-autocomplete
        v-model="income.origin"
        :loading="form.loading"
        :disabled="form.loading"
        :items="formOrigins"
        label="Origem"
        item-text="name"
        return-object
      />
      <v-autocomplete
        v-model="income.subcategory"
        :loading="form.loading"
        :disabled="form.loading"
        :items="formSubcategories"
        label="Subcategoria"
        item-text="name"
        return-object
      />
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Income',
  data() {
    return {
      form: {
        loading: false,
      },
      income: {
        id: null,
        value: 0.0,
        origin: null,
        description: '',
        date: new Date(),
        subcategory: null,
      },
    };
  },
  computed: {
    formOrigins() {
      return this.$store.getters['origin/getDataTable'];
    },
    formSubcategories() {
      return this.$store.getters['subcategory/getDataTable'];
    },
  },
};
</script>
<style>
</style>
