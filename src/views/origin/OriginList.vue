<template>
  <v-container>
    <h2>Origem Listar</h2>
    <slot name="messages"></slot>
    <modal-default
      title="Confirmar Exclusão"
      :body="this.body"
      :callback="this.handleCallbackModalDelete"
      ref="modal"
    >
    </modal-default>
    <v-data-table
      :headers="dataTable.headers"
      :items="originVuex.dataTable"
      :items-per-page="5"
      :loading="dataTable.loading"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="handleClickUpdate(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="handleClickDelete(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <h3>Última atualização:</h3>
    {{ lastUpdate }}
  </v-container>
</template>

<script>
import ModalDefault from '@/components/layout/ModalDefault.vue';
import {
  formatDate,
  clearMessages,
  insertMessage,
  isErrorWrapper,
  getErrorMessage,
} from '@/core/utils';
import config from '@/core/config';
import { mapGetters } from 'vuex';

export default {
  components: { ModalDefault },
  name: 'Origin',
  data() {
    return {
      delete: {
        selected: null,
      },
      insert: {
        id: null,
        name: '',
      },
      dataTable: {
        loading: true,
        headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Nome', value: 'name' },
          { text: 'Ações', value: 'actions', sortable: false },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      originVuex: 'origin/getDataTable',
    }),
    body() {
      return `Você tem certeza que deseja remover a Origem <strong>${this.delete.selected?.name}</strong> ?`;
    },
    lastUpdate() {
      const { lastUpdate } = this.originVuex;
      return lastUpdate ? formatDate(lastUpdate, {}) : null;
    },
  },
  methods: {
    clearDeleteSelected() {
      this.delete.selected = null;
    },
    handleClickDelete({ id, name }) {
      this.delete.selected = { id, name };
      this.$refs.modal.show = true;
    },
    handleCallbackModalDelete(choice) {
      if (choice) {
        try {
          this.$store.dispatch('origin/deleteOrigin', this.delete.selected);
          clearMessages();
          insertMessage({
            type: config.messages.SUCCESS,
            text: `${this.delete.selected.name} removido com sucesso!`,
            dismissible: true,
          });
          this.clearDeleteSelected();
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
      }
    },
    handleClickUpdate({ id, name }) {
      const target = {
        id,
        name,
      };
      this.$router.push({ name: 'OriginForm', params: { mode: 'update', target } });
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('origin/findOrigins', false);
    } catch (error) {
      insertMessage({
        type: config.messages.ERROR,
        text: getErrorMessage(error),
        dismissible: true,
      });
    }

    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
