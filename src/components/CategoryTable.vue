<template>
  <table v-if="list.length">
    <thead>
    <tr>
      <th>Código</th>
      <th>Nome</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="category in list" :key="category.id">
      <td>{{category.id}}</td>
      <td>{{category.name}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CategoryTable",
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>