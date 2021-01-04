<template>
  <validation-observer ref="observer">
    <v-form>
      <v-container>
        <h2>Cadastrar Subcategoria</h2>
        <slot name="messages"></slot>
          <validation-provider
            name="name"
            rules="required|lengthBetween:3,50"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="subcategory.name"
              label="Nome"
              required
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            name="description"
            rules="lengthMax:200"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="subcategory.description"
              label="Descrição"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            name="category_id"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              v-model="subcategory.category"
              :loading="form.loading"
              :disabled="form.loading"
              :items="formCategories"
              :error-messages="errors"
              label="Categoria"
              item-text="name"
              return-object
            />
          </validation-provider>
          <v-btn color="primary" large @click.prevent="handleClickFormSubmit">{{
            this.submitLabel
          }}</v-btn>

          <v-btn class="ml-10" large @click.prevent="handleClickClear">{{
            this.clearLabel
          }}</v-btn>
      </v-container>
    </v-form>
  </validation-observer>
</template>

<script>
import {
  insertMessage, getErrorMessage, clearMessages, isErrorWrapper,
} from '@/core/utils';
import config from '@/core/config';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'SubcategoryForm',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
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
    async handleClickFormSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.handleClickInsertOrUpdate();
      }
    },
    async handleClickInsertOrUpdate() {
      try {
        const action = this.isUpdate ? 'updateSubcategory' : 'insertSubcategory';
        const payload = {
          id: this.subcategory.id,
          name: this.subcategory.name,
          description: this.subcategory.description,
          category_id: this.subcategory.category.id,
        };
        const subcategory = await this.$store.dispatch(`subcategory/${action}`, payload);
        insertMessage({
          type: config.messages.SUCCESS,
          text: `${subcategory.name} ${this.isUpdate ? 'atualizada' : 'cadastrada'} com sucesso!`,
          dismissible: true,
        });
        this.clearForm();
      } catch (error) {
        if (isErrorWrapper(error) && error.isValidationError()) {
          console.log('error.validation', error.validation);
          this.$refs.observer.setErrors(error.validation);
        }
        insertMessage({
          type: config.messages.ERROR,
          text: getErrorMessage(error),
          dismissible: true,
        });
      }
    },
    handleClickClear() {
      clearMessages();
      this.clearForm();
    },
    clearForm() {
      this.$refs.observer.reset();
      this.form.type = 'insert';
      this.subcategory = {
        id: null,
        name: '',
        description: '',
        category: null,
      };
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
      return this.$store.getters['category/getDataTable'];
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

    if (this.mode === 'update' && this.target !== undefined) {
      this.subcategory = this.target;
    }
    this.form.type = this.mode;
    this.form.loading = false;
  },
};
</script>

<style>

</style>
