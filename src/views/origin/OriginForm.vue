<template>
  <v-form>
    <v-container>
      <h2>Cadastrar Origem</h2>
      <slot name="messages"></slot>
      <v-text-field v-model="origin.name" label="Nome" required></v-text-field>
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
import OriginService from '@/services/origin-service';
import { insertMessage } from '@/core/utils';

export default {
  name: 'OriginForm',
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
      if (this.isUpdate) {
        this.handleClickUpdate();
      } else {
        this.handleClickInsert();
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
        this.handleClickClear();
      } catch (error) {
        // TODO(16/12/2020): Tratar erros da api.
        // Só vai ser possível concluir após implementar a validação de formulários
        insertMessage({
          type: 'error',
          text: error.apiData,
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
        this.handleClickClear();
      } catch (error) {
        // TODO(16/12/2020): Tratar erros da api.
        // Só vai ser possível concluir após implementar a validação de formulários
        insertMessage({
          type: 'error',
          text: error.apiData,
          dismissible: true,
        });
      }
    },
    handleClickClear() {
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
