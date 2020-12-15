<template>
  <v-form>
    <v-container>
      <h2>Cadastrar Origem</h2>
      <v-text-field v-model="insert.name" label="Nome" required></v-text-field>
      <v-btn color="primary" large @click.prevent="handleClickInsert"
        >Cadastrar</v-btn
      >
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'OriginForm',
  methods: {
    handleClickInsert() {
      // TODO(14/12/2020): Realmente inserir a Origem. Consumindo o back-end e tratando retorno.
      console.log('handleClickInsert');
    },
  },
  data() {
    return {
      insert: {
        name: '',
      },
    };
  },
};
</script>

<style>
</style>
