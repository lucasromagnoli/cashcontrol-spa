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
            v-model="origin.name"
            :error-messages="errors"
            label="Nome"
            required
          ></v-text-field>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {
  insertMessage, clearMessages, isErrorWrapper, getErrorMessage,
} from '@/core/utils';
import config from '@/core/config';

export default {
  name: 'OriginForm',
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
        const action = this.isUpdate ? 'updateOrigin' : 'insertOrigin';
        const origin = await this.$store.dispatch(`origin/${action}`, this.origin);
        insertMessage({
          type: config.messages.SUCCESS,
          text: `${origin.name} ${this.isUpdate ? 'atualizada' : 'cadastrada'} com sucesso!`,
          dismissible: true,
        });
        this.clearForm();
      } catch (error) {
        if (isErrorWrapper(error) && error.isValidationError()) {
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
      this.origin = {
        id: null,
        name: '',
      };
    },
  },
  data() {
    return {
      form: {
        type: '',
      },
      origin: {
        id: null,
        name: '',
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
  mounted() {
    if (this.mode === 'update' && this.target !== undefined) {
      this.origin = this.target;
    }
    this.form.type = this.mode;
  },
};
</script>

<style>
</style>
