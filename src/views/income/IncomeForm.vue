<template>
  <validation-observer ref="observer">
    <v-form>
      <v-container>
        <h1>Cadastrar Receita</h1>
        <slot name="messages" />
        <!-- INPUT-DESCRIPTION -->
        <validation-provider
          name="description"
          rules="lengthMax:200"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="income.description"
            label="Description"
            :error-messages="errors"
          />
        </validation-provider>
        <!-- INPUT-DATE -->
        <validation-provider
          name="date"
          rules="required|length:10"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="income.date"
            label="Data"
            v-mask="'##/##/####'"
            :error-messages="errors"
          />
        </validation-provider>
        <!-- INPUT-VALUE -->
        <validation-provider
          name="value"
          rules="required|valueGreaterThan:0"
          v-slot="{ errors }"
        >
          <v-currency-field
            label="Valor"
            v-model="income.value"
            prefix="R$"
            :error-messages="errors"
          />
        </validation-provider>
        <!-- INPUT-ORIGIN -->
        <validation-provider name="origin" rules="required" v-slot="{ errors }">
          <v-autocomplete
            v-model="income.origin"
            :loading="form.loading"
            :disabled="form.loading"
            :items="formOrigins"
            :error-messages="errors"
            label="Origem"
            item-text="name"
            return-object
          />
        </validation-provider>
        <!-- INPUT-SUBCATEGORY -->
        <validation-provider
          name="subcategory"
          rules="required"
          v-slot="{ errors }"
        >
          <v-autocomplete
            v-model="income.subcategory"
            :loading="form.loading"
            :disabled="form.loading"
            :items="formSubcategories"
            :error-messages="errors"
            label="Subcategoria"
            item-text="name"
            return-object
          />
        </validation-provider>
        <!-- INSERT or UPDATE -->
        <v-btn color="primary" large @click.prevent="handleClickFormSubmit"
          >Cadastrar</v-btn
        >
        <!-- CLEAR THE FORM -->
        <v-btn class="ml-10" large @click.prevent="handleClickClear"
          >Limpar</v-btn
        >
      </v-container>
    </v-form>
  </validation-observer>
</template>

<script>
import {
  formatDate,
  clearMessages,
  insertMessage,
  getErrorMessage,
  isErrorWrapper,
} from '@/core/utils';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import config from '@/core/config';

export default {
  name: 'Income',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        loading: false,
      },
      income: {
        id: null,
        value: 0.0,
        origin: null,
        description: '',
        subcategory: null,
        date: formatDate(new Date(), { onlyDate: true }),
      },
    };
  },
  computed: {
    formOrigins() {
      return this.$store.getters['origin/getDataTable'];
    },
    formSubcategories() {
      return this.$store.getters['subcategory/getDataTableIncomes'];
    },
  },
  methods: {
    parsePayload() {
      return {
        id: this.income.id,
        date: this.income.date,
        value: this.income.value,
        origin_id: this.income.origin?.id,
        description: this.income.description,
        subcategory_id: this.income.subcategory?.id,
      };
    },
    async handleClickFormSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.handleClickInsert();
      }
    },
    async handleClickInsert() {
      try {
        await this.$store.dispatch('income/insertIncome', this.parsePayload());
        insertMessage({
          type: config.messages.SUCCESS,
          text: 'Receita cadastrada com sucesso!',
          dismissible: true,
        });
        this.clearForm();
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
    },
    handleClickClear() {
      clearMessages();
      this.clearForm();
    },
    clearForm() {
      this.$refs.observer.reset();
      this.income = {
        id: null,
        value: 0.0,
        origin: null,
        description: '',
        subcategory: null,
        date: formatDate(new Date(), { onlyDate: true }),
      };
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('origin/findOrigins', false);
      await this.$store.dispatch('subcategory/findSubcategories', false);
    } catch (error) {
      insertMessage({
        type: config.messages.ERROR,
        text: getErrorMessage(error),
        dismissible: true,
      });
    }
    this.form.loading = false;
  },
};
</script>
<style>
</style>
