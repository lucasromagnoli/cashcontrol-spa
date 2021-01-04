<template>
  <div>
    <slot name="messages"></slot>

      <modal-default
        title="Confirmar Exclusão"
        :body="modalDeleteBody"
        :callback="this.handleCallbackModalDelete"
        ref="modal"
      />
      <v-data-table
      :headers="dataTable.headers"
      :items="isDetails ? dataTable.details : subcategoryDataTable"
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

    <div v-if="details === false">
      <h3>Última atualização:</h3>
      {{ lastUpdate }}
    </div>
  </div>
</template>

<script>
import config from '@/core/config';
import {
  insertMessage, getErrorMessage, formatDate, clearMessages, isErrorWrapper,
} from '@/core/utils';
import ModalDefault from '@/components/layout/ModalDefault.vue';

export default {
  name: 'SubcategoryTable',
  components: {
    ModalDefault,
  },
  props: {
    details: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      delete: {
        selected: null,
      },
      dataTable: {
        loading: true,
        details: [],
        headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Categoria', value: 'category.name' },
          { text: 'Tipo', value: 'category.type' },
          { text: 'Nome', value: 'name' },
          { text: 'Descrição', value: 'description' },
          {
            text: 'Ações', value: 'actions', sortable: false, align: 'center',
          },
        ],
      },
    };
  },
  methods: {
    setDetails(category) {
      this.dataTable.details = this.subcategoryDataTable.filter(
        (sub) => sub.category.id === category.id,
      );
    },
    handleClickDelete({ id, name }) {
      this.delete.selected = { id, name };
      this.$refs.modal.show = true;
    },
    async handleCallbackModalDelete(choice) {
      if (choice) {
        try {
          this.$store.dispatch('subcategory/deleteSubcategory', this.delete.selected);
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
    clearDeleteSelected() {
      this.delete.selected = null;
    },
    handleClickUpdate({
      id, name, description, category,
    }) {
      const target = {
        id,
        name,
        description,
        category,
      };
      console.log(target, target);
      this.$router.push({ name: 'SubcategoryForm', params: { mode: 'update', target } });
    },
  },
  computed: {
    subcategoryDataTable() {
      return this.$store.getters['subcategory/getDataTable'];
    },
    isDetails() {
      return this.details;
    },
    lastUpdate() {
      const { lastUpdate } = this.$store.state.subcategory;
      return lastUpdate ? formatDate(lastUpdate) : null;
    },
    modalDeleteBody() {
      return `Você tem certeza que deseja remover a Subcategoria <strong>${this.delete.selected?.name}</strong> ?`;
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('subcategory/findSubcategories');
      if (this.isDetails) {
        window.bus.$on(config.events.DETAILS_SUBCATEGORY, this.setDetails);
        console.log('listening', config.events.DETAILS_SUBCATEGORY);
      }
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
