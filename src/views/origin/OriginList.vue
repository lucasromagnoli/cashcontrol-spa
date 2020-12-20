<template>
  <v-container>
    <h2>Origem Listar</h2>
    <slot name="messages"></slot>
    <modal-default
      :title="this.title"
      :body="this.body"
      :callback="this.handleCallbackModal"
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
import { dateDifferenceInMinutes, formatDate, insertMessage } from '@/core/utils';
import config from '@/core/config';
import { mapGetters } from 'vuex';
import OriginService from '@/services/origin-service';

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
    title() {
      return 'Confirmar Exclusão';
    },
    body() {
      return `Você tem certeza que deseja remover a Origem <strong>${this.delete.selected?.name}</strong> ?`;
    },
    lastUpdate() {
      const { lastUpdate } = this.originVuex;
      return lastUpdate ? formatDate(lastUpdate) : null;
    },
  },
  methods: {
    handleClickDelete({ id, name }) {
      this.delete.selected = { id, name };
      this.$refs.modal.show = true;
    },
    handleCallbackModal(choice) {
      if (choice) {
        OriginService.delete({
          endpoint: `/${this.delete.selected.id}`,
        });
        this.$store.commit('origin/DELETE_ORIGIN', this.delete.selected);
        insertMessage({
          type: 'success',
          text: `${this.delete.selected.name} removido com sucesso!`,
          dismissible: true,
        });
      }

      this.selected = null;
    },
    handleClickUpdate({ id, name }) {
      console.log(id, name);
      const target = {
        id,
        name,
      };
      this.$router.push({ name: 'OriginForm', params: { mode: 'update', target } });
    },
  },
  async mounted() {
    // TODO(20/12/2020): Levar para os actions do vuex?
    const dataTable = this.$store.getters['origin/getDataTable'];
    const diffInMinus = dateDifferenceInMinutes(new Date(), this.originVuex.lastUpdate);
    /* eslint-disable */

    if (
      Number.isNaN(diffInMinus) ||
      diffInMinus >= config.ORIGIN_DATATABLE_EXPIRE_MINUTES ||
      !dataTable
    ) {
      // TODO(18/12/2020): Corrigir bug do eslint+prettier referente a posição dos operadores lógicos
      /* eslint-enable */
      this.dataTable.loading = true;
      const { apiContent: origins } = await OriginService.get({
        endpoint: '/',
        query: { page: 0, size: 100 },
      });
      this.$store.commit('origin/BOOTSTRAP_ORIGIN', origins);
      console.log('Atualizando lista de origens');
    }

    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
