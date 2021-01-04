<template>
  <v-form>
    <v-container>
      <h2>Cadastrar Subcategoria</h2>
      <slot name="messages"></slot>
        <v-text-field
          v-model="subcategory.name"
          label="Nome"
          required
        />
        <v-text-field
          v-model="subcategory.description"
          label="Descrição"
        />
        <v-autocomplete
          v-model="subcategory.category"
          :loading="form.loading"
          :disabled="form.loading"
          :items="formCategories"
          label="Categoria"
          item-text="name"
          return-object
        />

        <v-btn color="primary" large @click.prevent="handleClickFormSubmit">{{
          this.submitLabel
        }}</v-btn>

        <v-btn class="ml-10" large @click.prevent="handleClickClear">{{
          this.clearLabel
        }}</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import {
  insertMessage, getErrorMessage,
} from '@/core/utils';
import config from '@/core/config';

export default {
  name: 'SubcategoryForm',
  props: {
    mode: {
      default: 'insert',
      type: String,
    },
    target: {
      type: Object,
    },
  },
  methods: {
    handleClickFormSubmit() {
      console.log('handleClickFormSubmit');
    },
    handleClickClear() {
      console.log('handleClickClear');
    },
  },
  data() {
    return {
      subcategory: {
        id: null,
        name: '',
        description: '',
        category: null,
      },
      form: {
        type: 'insert',
        loading: true,
      },
    };
  },
  computed: {
    formCategories() {
      return this.$store.getters['category/getCategoryDataTable'];
    },
    submitLabel() {
      return this.isUpdate ? 'Atualizar' : 'Cadastrar';
    },
    clearLabel() {
      return this.isUpdate ? 'Cancelar' : 'Limpar';
    },
    isUpdate() {
      return this.form.type === 'update';
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('category/findCategories', false);
    } catch (error) {
      insertMessage({
        type: config.messages.ERROR,
        text: getErrorMessage(error),
        dismissible: true,
      });
    }

    this.form.loading = false;
  },
};
</script>

<style>

</style>
