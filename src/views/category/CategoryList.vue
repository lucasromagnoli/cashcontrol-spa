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
  </v-container>
</template>

<script>
import ModalDefault from '@/components/layout/ModalDefault.vue';
import SubcategoryTable from '@/components/SubcategoryTable.vue';
import {
  emitEvent, insertMessage, clearMessages, isErrorWrapper, getErrorMessage,
} from '@/core/utils';
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
            text: 'Ações', value: 'actions', sortable: false, align: 'center',
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
          this.$store.dispatch('category/deleteCategory', this.delete.selected);
          clearMessages();
          insertMessage({
            type: 'success',
            text: `${this.delete.selected.name} removido com sucesso!`,
            dismissible: true,
          });
          this.clearDeleteSelected();
        } catch (error) {
          if (isErrorWrapper(error) && error.isValidationError()) {
            this.$refs.observer.setErrors(error.validation);
          }
          insertMessage({
            type: 'error',
            text: getErrorMessage(error),
            dismissible: true,
          });
        }
      }
    },
    clearDeleteSelected() {
      this.delete.selected = null;
    },
  },
  computed: {
    modalDeleteBody() {
      return `Você tem certeza que deseja remover a Categoria <strong>${this.delete.selected?.name}</strong> ?`;
    },
    categoryDataTable() {
      return this.$store.getters['category/getCategoryDataTable'];
    },
  },
  mounted() {
    // TODO(20/12/2020): Implementar lógica de só atualizar a cada 5 minutos.
    this.$store.dispatch('category/findCategories');
    this.dataTable.loading = false;
  },
};
</script>

<style>
</style>
