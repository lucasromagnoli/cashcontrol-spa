<template>
  <v-container>
    <v-card>
      <v-card-title>Cadastrar Origem</v-card-title>
      <v-container>
        <v-alert
            v-if="success || error"
            :type="this.success ? 'success' : 'error'"
        >{{ alertMessage }}
        </v-alert>

          <v-col cols="12" md="6">
            <v-text-field
                label="Nome"
                v-model="name"
            >
            </v-text-field>
          </v-col>

        <v-col cols="12" md="6">
          <v-btn
              width="125px"
              color="primary"
              @click.prevent="insert"
          >
            <span v-if="!loading">Cadastrar</span>

            <v-progress-circular
                indeterminate
                color="white"
                v-if="loading"
            ></v-progress-circular>
          </v-btn>

          <v-btn
              width="125px"
              color="primary"
              class="ml-10"
              :to="{name: 'originList'}"
          >
            <span>Listar</span>
          </v-btn>
        </v-col>

      </v-container>
    </v-card>
  </v-container>
</template>

<script>


import {api, endpoint} from '@/service/api';

export default {
  name: 'OrigenForm',
  data() {
    return {
      success: false,
      error: false,
      loading: false,
      alertMessage: '',
      name: ''
    }
  },
  methods: {
    insert() {
      const payload = {
        name: this.name
      };
      this.loading = true;

      api.post(endpoint.ORIGIN, payload).then(r => {
        this.success = true;
        this.error = false;
        this.name = '';
        this.alertMessage = r.data.message;
        this.loading = false;
      }).catch(({response}) => {
        this.success = false
        this.error = true;
        this.alertMessage = response.data.message;
        this.loading = false;
        console.error(response);
      });
    }
  }
}
</script>

<style scoped>

</style>