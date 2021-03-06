<template>
  <v-container>
    <slot name="messages"></slot>
    <h1>Categoria Listar</h1>

    <v-dialog v-model="showSubcategories" max-width="960px" eager>
      <subcategory-table :details="true" />
    </v-dialog>

    <modal-default
      title="Confirmar Exclusão"
      :body="modalDeleteBody"
      :callback="this.handleCallbackModalDelete"
      ref="modal"
    />

    <v-data-table
      :headers="dataTable.headers"
      :items="categoryDataTable"
      :items-per-page="5"
      :loading="dataTable.loading"
      class="elevation-1"
    >
      <template v-slot:item.subcategories="{ item }">
        <v-btn
          block
          text
          tile
          @click="handleClickDetailsSubcategories(item)"
          class="elevation-2 accent"
        >
          consultar
        </v-btn>
      </template>

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
import SubcategoryTable from '@/components/SubcategoryTable.vue';
/*eslint-disable*/
import { emitEvent, insertMessage, clearMessages, getErrorMessage, formatDate } from '@/core/utils';
import config from '@/core/config';

export default {
  components: { SubcategoryTable, ModalDefault },
  name: 'CategoryList',
  data() {
    return {
      showSubcategories: false,
      delete: {
        selected: null,
      },
      dataTable: {
        loading: true,
        headers: [
          {
            text: 'Código',
            align: 'center',
            sortable: false,
            value: 'id',
          },
          { text: 'Tipo', value: 'type', align: 'center' },
          { text: 'Nome', value: 'name', align: 'center' },
          { text: 'Descrição', value: 'description', align: 'center' },
          {
            text: 'Subcategorias',
            value: 'subcategories',
            width: '200px',
            align: 'center',
            sortable: false,
          },
          {
            text: 'Ações',
            value: 'actions',
            sortable: false,
            align: 'center',
          },
        ],
      },
    };
  },
  methods: {
    handleClickDetailsSubcategories(category) {
      this.showSubcategories = true;
      emitEvent(config.events.DETAILS_SUBCATEGORY, category);
    },
    handleClickDelete({ id, name }) {
      this.delete.selected = { id, name };
      this.$refs.modal.show = true;
    },
    async handleCallbackModalDelete(choice) {
      if (choice) {
        try {
          await this.$store.dispatch('category/deleteCategory', this.delete.selected);
          clearMessages();
          insertMessage({
            type: config.messages.SUCCESS,
            text: `${this.delete.selected.name} removido com sucesso!`,
            dismissible: true,
          });
          this.clearDeleteSelected();
        } catch (error) {
          insertMessage({
            type: config.messages.ERROR,
            text: getErrorMessage(error),
            dismissible: true,
          });
        }
      }
    },
    clearDeleteSelected() {
      this.delete.selected = null;
    },
    handleClickUpdate({ id, name, description, type }) {
      const target = {
        id,
        name,
        description,
        type,
      };
      this.$router.push({ name: 'CategoryForm', params: { mode: 'update', target } });
    },
  },
  computed: {
    modalDeleteBody() {
      return `Você tem certeza que deseja remover a Categoria <strong>${this.delete.selected?.name}</strong> ?`;
    },
    categoryDataTable() {
      return this.$store.getters['category/getDataTable'];
    },
    lastUpdate() {
      const { lastUpdate } = this.$store.state.category;
      return lastUpdate ? formatDate(lastUpdate, {}) : null;
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
    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
