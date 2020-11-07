<template>
  <div>
    <h1>Category Form</h1>
    <form>
      <label for="categoryName">Name</label>
      <input type="text" id="categoryName" placeholder="Nome" v-model="name"/>
      <button @click.prevent="save">Cadastrar</button>
    </form>

    <CategoryList ref="teste"/>
  </div>
</template>

<script>
import {api} from "@/service/api";
import CategoryList from "@/pages/categoria/CategoryList";

export default {
  name: "CategoryForm",
  components: {CategoryList},
  data() {
    return {
      name: ""
    }
  },
  methods: {
    save() {
      const data = {
        name: this.name,
        type: "e"
      }

      api.post("/category", data).then(r => {
        this.$refs.teste.categories.push({id: r.data.payload.id, name: r.data.payload.name})
      });
    }
  }
}
</script>

<style scoped>

</style>