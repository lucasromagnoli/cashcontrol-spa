<template>
  <v-app>
    <the-header-and-sidebar />
    <v-main><router-view></router-view></v-main>
  </v-app>
</template>

<script>
import TheHeaderAndSidebar from './components/layout/TheHeaderAndSidebar.vue';

export default {
  components: { TheHeaderAndSidebar },
  name: 'App',
};
</script>
