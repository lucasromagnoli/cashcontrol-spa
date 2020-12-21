<template>
  <validation-observer ref="observer">
    <v-form>
      <v-container>
        <h2>Cadastrar Origem</h2>
        <slot name="messages"></slot>
        <validation-provider
          name="name"
          rules="required|lengthBetween:3,50"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="category.name"
            label="Nome"
            required
            :error-messages="errors"
          />
        </validation-provider>
        <validation-provider
          name="description"
          rules="required|lengthMax:200"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="category.description"
            label="Descrição"
            :error-messages="errors"
          />
        </validation-provider>
        <validation-provider name="type" rules="required" v-slot="{ errors }">
          <v-select
            v-model="category.type"
            :items="form.selectTypeItems"
            item-value="type"
            item-text="text"
            :error-messages="errors"
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
import { insertMessage, clearMessages } from '@/core/utils';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'CategoryForm',
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
  data() {
    return {
      category: {
        id: null,
        name: '',
        description: '',
        type: 'Expense',
      },
      form: {
        type: '',
        selectTypeItems: [
          {
            type: 'Expense',
            text: 'Despesa',
          },
          {
            type: 'Income',
            text: 'Receita',
          },
        ],
      },
    };
  },
  computed: {
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
  methods: {
    async handleClickFormSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        if (this.isUpdate) {
          this.handleClickUpdate();
        } else {
          this.handleClickInsert();
        }
      }
    },
    async handleClickInsert() {
      try {
        const category = await this.$store.dispatch('category/insertCategory', this.category);
        console.log('category', category);
        insertMessage({
          type: 'success',
          text: `${category.name} cadastrada com sucesso!`,
          dismissible: true,
        });
        this.clearForm();
      } catch (error) {
        if (error.isValidationError()) {
          this.$refs.observer.setErrors(error.validation);
        }
        insertMessage({
          type: 'error',
          text: error.getDisplayMessage(),
          dismissible: true,
        });
      }
    },
    async handleClickUpdate() {
      console.log('update');
    },
    clearForm() {
      this.$refs.observer.reset();
      this.form.type = 'insert';
      this.category = {
        id: null,
        name: '',
        description: '',
        type: 'Expense',
      };
    },
    handleClickClear() {
      clearMessages();
      this.clearForm();
    },
  },
  mounted() {
    if (this.mode === 'update' && this.target !== undefined) {
      this.category = this.target;
    }
    this.form.type = this.mode;
  },
};
</script>

<style>
</style>
