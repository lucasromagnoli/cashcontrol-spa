<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title v-text="title"></v-card-title>
      <v-card-text v-html="body"></v-card-text>
      <v-card-actions class="dflex justify-space-around">
        <v-btn @click="handleClickChoice(false)">Não</v-btn>
        <v-btn @click="handleClickChoice(true)">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // ['title', 'body', 'callback']
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClickChoice(b) {
      this.callback(b);
      this.show = false;
      this.choice = b;
    },
  },
  data() {
    return {
      show: false,
      choice: false,
    };
  },
};
</script>

<style>
</style>
