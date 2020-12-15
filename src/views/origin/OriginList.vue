<template>
  <v-container>
    <h2>Origem Listar</h2>
    <modal-default
      :title="this.title"
      :body="this.body"
      :callback="this.handleCallbackModal"
      ref="modal"
    >
    </modal-default>
    <v-data-table
      :headers="dataTable.headers"
      :items="dataTable.data"
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
  </v-container>
</template>

<script>
import ModalDefault from '@/components/layout/ModalDefault.vue';

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
        loading: false,
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
        data: [],
      },
    };
  },
  computed: {
    title() {
      return 'Confirmar Exclusão';
    },
    body() {
      return `Você tem certeza que deseja remover a Origem <strong>${this.delete.selected?.name}</strong> ?`;
    },
  },
  methods: {
    handleClickDelete({ id, name }) {
      this.delete.selected = { id, name };
      this.$refs.modal.show = true;
    },
    handleCallbackModal(choice) {
      if (choice) {
        // TODO(14/12/2020): Realmente remover a Origem. Consumindo o back-end e tratando retorno.
        console.log(`${this.delete.selected.name} removido com sucesso!`);
      }

      this.selected = null;
    },
    handleClickUpdate({ id, name }) {
      console.log(id, name);
    },
  },
};
</script>

<style>
</style>
