<template>
  <div id="app">
    <TheHeader/>
    <main class="content">
      <router-view></router-view>
    </main>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter
  },
};
</script>
<style lang="scss">
// Resetando css
html,
body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  color: #13242A;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background: #f9dcc4;
}

#app {
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
}

.btn {
  font-size: 1.5em;
  color: #fff;
  background: #2A9D8F;
  border-radius: 6px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(30, 60, 90, .1);
  transition: all .3s;
  border: none;
  &:hover {
    background: #1A6158;
    box-shadow: 0 6px 12px rgba(30, 60, 90, .4);
  }
}

.content {
  flex: 1;
  background: #f3f3f3;
  border-radius: 6px;
  max-width: 1440px;
  min-width: 1440px;
  padding: 50px;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(30, 60, 90, .1);
}


@media only screen and (max-width: 1450px) {
  .content {
    max-width: 100%;
    min-width: 375px;
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>
