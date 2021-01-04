<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-5" color="grey darken-1" size="64"></v-avatar>
        <div>lucasr.romagnoli@gmail.com</div>
      </v-sheet>
      <v-list>
        <v-list-item
          v-for="(link, index) in orphanLinks"
          :key="index + link"
          :to="link.route"
          exact
          link
        >
          <v-list-item-icon>
            <v-icon v-text="link.icon" />
          </v-list-item-icon>

          <v-list-item-title v-text="link.title" />
        </v-list-item>

        <v-list-group
          v-for="(link, index) in fatherLinks"
          :key="index"
          :value="false"
          :prepend-icon="link.icon"
        >
          <template v-slot:activator>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </template>

          <v-list-item
            v-for="(children, indexChildren) in link.childrens"
            :key="indexChildren + children"
            :to="children.route"
            exact
            link
          >
            <v-list-item-icon>
              <v-icon v-text="children.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="children.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Cash Control</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      links: [
        {
          icon: 'mdi-home',
          title: 'Home',
          route: { name: 'Home' },
        },
        {
          icon: 'mdi-home',
          title: 'Categorias',
          childrens: [
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Cadastrar',
              route: { name: 'CategoryForm' },
            },
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Listar',
              route: { name: 'CategoryList' },
            },
          ],
        },
        {
          icon: 'mdi-home',
          title: 'Subcategoria',
          childrens: [
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Cadastrar',
              route: { name: 'SubcategoryForm' },
            },
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Listar',
              route: { name: 'SubcategoryList' },
            },
          ],
        },
        {
          icon: 'mdi-home',
          title: 'Origens',
          childrens: [
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Cadastrar',
              route: { name: 'OriginForm' },
            },
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Listar',
              route: { name: 'OriginList' },
            },
          ],
        },
        {
          icon: 'mdi-home',
          title: 'Transações',
          childrens: [
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Movimentações',
              route: { name: 'Transaction' },
            },
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Receitas',
              route: { name: 'Income' },
            },
            {
              icon: 'mdi-inbox-arrow-down',
              title: 'Despesas',
              route: { name: 'Expense' },
            },
          ],
        },
      ],
    };
  },
  computed: {
    orphanLinks() {
      return this.links.filter((link) => !link.childrens || link.childrens.length === 0);
    },
    fatherLinks() {
      return this.links.filter((link) => link.childrens && link.childrens.length !== 0);
    },
  },
};
</script>

<style>
</style>
