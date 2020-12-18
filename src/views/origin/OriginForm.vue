<template>
  <v-form>
    <v-container>
      <h2>Cadastrar Origem</h2>
      <slot name="messages"></slot>
      <v-text-field v-model="insert.name" label="Nome" required></v-text-field>
      <v-btn color="primary" large @click.prevent="handleClickInsert"
        >Cadastrar</v-btn
      >
    </v-container>
  </v-form>
</template>

<script>
import OriginService from '@/services/origin-service';
import { insertMessage } from '@/core/utils';

export default {
  name: 'OriginForm',
  methods: {
    async handleClickInsert() {
      try {
        const { apiContent: origin } = await OriginService.post({
          endpoint: '/',
          payload: {
            name: this.insert.name,
          },
        });
        this.$store.commit('origin/INSERT_ORIGIN', origin);
        insertMessage({
          type: 'success',
          text: `${origin.name} cadastrada com sucesso!`,
          dismissible: true,
        });
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
