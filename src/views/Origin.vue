<template>
  <div>
    <v-form>
      <v-container>
        <h2>Cadastrar Origem</h2>
        <v-text-field
          v-model="insert.name"
          label="Nome"
          required
        ></v-text-field>
        <v-btn color="primary" large @click.prevent="handleClickInsert"
          >Cadastrar</v-btn
        >
      </v-container>
    </v-form>

    <v-data-table
      :headers="dataTable.headers"
      :items="dataTable.data"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="handleClickUpdate(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="handleClickDelete(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Origin',
  data() {
    return {
      insert: {
        name: '',
      },
      dataTable: {
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
  methods: {
    handleClickInsert() {
      this.dataTable.data.push({
        id: 1,
        name: this.insert.name,
      });

      this.insert.name = '';
    },
    handleClickDelete({ id, name }) {
      console.log(id, name);
    },
    handleClickUpdate({ id, name }) {
      console.log(id, name);
    },
  },
};
</script>

<style>
</style>
