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
import OriginService from '@/services/origin-service';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { insertMessage, clearMessages } from '@/core/utils';

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
        if (this.isUpdate) {
          this.handleClickUpdate();
        } else {
          this.handleClickInsert();
        }
      }
    },
    async handleClickInsert() {
      try {
        const { apiContent: origin } = await OriginService.post({
          endpoint: '/',
          payload: this.origin,
        });
        this.$store.commit('origin/INSERT_ORIGIN', origin);
        insertMessage({
          type: 'success',
          text: `${origin.name} cadastrada com sucesso!`,
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
      try {
        const { apiContent: origin } = await OriginService.put({
          endpoint: '/',
          payload: this.origin,
        });
        this.$store.commit('origin/UPDATE_ORIGIN', origin);
        insertMessage({
          type: 'success',
          text: `${origin.name} atualizada com sucesso!`,
          dismissible: true,
        });
        this.clearForm();
      } catch (error) {
        // TODO(19/12/2020): Pensar maneira de não ter código duplicato com o método de insert
        this.$refs.observer.setErrors(error.validation);
        insertMessage({
          type: 'error',
          text: error.getDisplayMessage(),
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
