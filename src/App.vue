<template>
  <v-app>
    <the-header-and-sidebar />
    <v-main
      ><v-container><router-view></router-view></v-container
    ></v-main>
  </v-app>
</template>

<script>
import TheHeaderAndSidebar from './components/layout/TheHeaderAndSidebar.vue';

export default {
  components: { TheHeaderAndSidebar },
  name: 'App',
};
</script>
