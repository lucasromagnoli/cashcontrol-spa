<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Origens</h1>
      </v-card-title>

      <v-card-title
          class="align-end">
        <v-text-field
            append-icon="mdi-magnify"
            label="Pesquisar"
            v-model="search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn
            color="primary"
            :to="{name: 'originForm'}"
        >
          Cadastrar
        </v-btn>
      </v-card-title>
      <v-data-table
          dense
          :headers="headers"
          :items="origins"
          :loading="loading"
          :search="search"
          item-key="name"
          class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {api, endpoint, map} from '@/service/api';

export default {
  name: 'OriginList',
  data: () => ({
    search: '',
    loading: true,
    lastLoad: null,
    origins: [],
    headers: [
      {text: 'Código', value: 'id', align: 'start'},
      {text: 'Nome', value: 'name'},
    ],
  }),
  async created() {
    const request = await api.get(map(endpoint.ORIGIN, endpoint.SEARCH));
    this.origins = request.data.payload.content;
    this.loading = false;
  }
}
</script>

<style scoped>

</style>