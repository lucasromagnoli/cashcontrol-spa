<template>
<div>
  <h1>Category List</h1>

  <CategoryTable :list="categories"/>
  <i>Last update: {{this.lastUpdate}}</i>
</div>
</template>

<script>
import {api} from "@/service/api";
import CategoryTable from "@/components/CategoryTable";

export default {
  name: "CategoryList",
  components: {
    CategoryTable
  },
  data() {
    return {
      categories: [],
      lastUpdate: null,
    }
  },
  methods: {
    teste() {
      api.get("/category").then(r => {
        this.lastUpdate = new Date()
        this.categories = r.data.payload.content;
      });
    }
  },
  mounted() {
    this.teste();
  }
}
</script>

<style scoped>

</style>