<template>
  <v-app>
    <the-header-and-sidebar />
    <v-main
      ><v-container>
        <router-view>
          <template slot="messages"><message-display /></template>
        </router-view> </v-container
    ></v-main>
  </v-app>
</template>

<script>
import TheHeaderAndSidebar from '@/components/layout/TheHeaderAndSidebar.vue';
import MessageDisplay from './components/MessageDisplay.vue';

export default {
  components: { TheHeaderAndSidebar, MessageDisplay },
  name: 'App',
};
</script>
