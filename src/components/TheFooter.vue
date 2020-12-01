<template>
  <footer>
    <a href="https://www.github.com/lucasromagnoli" target="_blank">Desenvolvido por <strong>Lucas Ramos
      Romagnoli</strong> em 2020</a>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
footer {
  font-size: 1.3em;
  border-radius: 6px;
  position: relative;
  top: 75px;
  padding: 25px;
  background: #f3f3f3;
  text-align: center;
  a {
    font-size: inherit;
    padding: 10px;
    border-radius: 8px;

    strong {
      font-size: inherit;
    }
  }
}
</style>