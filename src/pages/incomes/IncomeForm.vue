<template>
  <v-container>
    <v-card>
      <v-card-title>Cadastrar Receita</v-card-title>
      <v-container>
        <v-text-field
            label="Nome"
            v-model="income.name"
        >
        </v-text-field>

          <v-currency-field
              prefix="R$"
              label="Valor"
              v-model="income.value">

          </v-currency-field>

        <v-select
            :items="subcategories"
            item-text="name"
            item-value="id"
            @change="selectSubcategory"
            label="Seleciona uma subcategoria"
        ></v-select>

        <v-select
            :items="origins"
            item-text="name"
            item-value="id"
            @change="selectOrigin"
            label="Seleciona uma Origem"
        ></v-select>

        <v-date-picker
            v-model="datePicker"
            year-icon="mdi-calendar-blank"
            prev-icon="mdi-skip-previous"
            next-icon="mdi-skip-next"
            full-width
        ></v-date-picker>

        <v-col cols="12" md="6">
          <v-btn
              width="125px"
              color="primary"
              @click.prevent="insert"
          >
            Cadastrar
          </v-btn>

          <v-btn
              width="125px"
              color="primary"
              class="ml-10"
              :to="{name: 'incomeList'}"
          >
            Listar
          </v-btn>
        </v-col>

      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import {api, endpoint, entities} from '@/service/api';
import {formatDate} from '@/utils';

export default {
  name: 'IncomeForm',
  data() {
    return {
      income: {
        name: '',
        value: null,
        subcategory_id: '',
        origin_id: '',
        date: '',
      },
      datePicker: new Date().toISOString().substr(0, 10),
      origins: [],
      subcategories: []
    }
  },
  methods: {
    selectSubcategory(subcategoryId) {
      this.income.subcategory_id = subcategoryId;
    },
    selectOrigin(originId) {
      this.income.origin_id = originId;
    },
    insert() {
      api.post(endpoint.INCOME, this.income).catch(error => {
        console.log(error.response);
      })
    }
  },
  watch: {
    datePicker(date) {
      this.income.date = formatDate(date);
    }
  },
  created() {
    api.get(endpoint.SUBCATEGORY_FILTER.concat(entities.transactionType.income)).then(r => {
      this.subcategories = r.data.payload;
      api.get(endpoint.ORIGIN).then(r => {
        this.origins = r.data.payload.content
      })
    })
  }
}
</script>

<style scoped>

</style>