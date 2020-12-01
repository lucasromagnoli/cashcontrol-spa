<template>
  <div id="home">
    <div id="title">
      <h1>Cash Control - Web Version</h1>
      <p>Aplicação responsável por gerenciar despesas pessoais. Descomplicando a vida e proporcionando satisfação em ter o
        controle de suas finanças.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
#title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  h1 {
    font-size: 3em;
  }

  p {
    font-size: 1.2em;
  }
}
</style>