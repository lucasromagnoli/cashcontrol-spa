<template>
  <nav>
    <router-link to="/" class="btn">Cash Control</router-link>
    <router-link to="/" class="btn">Categorias</router-link>
    <router-link to="/" class="btn">Subcategorias</router-link>
    <router-link to="/" class="btn">Origens</router-link>
    <router-link to="/" class="btn">Receitas</router-link>
    <router-link to="/" class="btn">Despesas</router-link>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style lang="scss" scoped>
nav {
  background: #E9C46A;
  height: 100px;
  padding: 20px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #E2B33C;
  flex-wrap: wrap;

  .btn {
    background: #d99902 !important;
  }
}

</style>