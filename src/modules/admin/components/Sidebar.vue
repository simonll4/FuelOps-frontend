<template>
  <v-navigation-drawer class="sidebar">
    <div class="d-flex align-center mr-5 pa-7">
      <v-img src="/src/assets/logo.png"></v-img>
      <span class="text-xl"><b>FUEL</b>OPS</span>
    </div>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Inicio"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-tanker-truck"
        title="Órdenes"
        value="orders"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Usuarios"
        value="users"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-barrel"
        title="Productos"
        value="products"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar sesión"
        value="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
