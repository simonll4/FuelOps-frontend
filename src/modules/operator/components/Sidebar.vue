<template>
    <v-navigation-drawer class="sidebar">
      <div class="d-flex align-center mr-5 pa-7">
        <v-img src="/src/assets/logo.png"></v-img>
        <span class="text-xl"><b>FUEL</b>OPS</span>
      </div>
  
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <router-link to="/operator" class="router-link">
          <v-list-item prepend-icon="mdi-home" title="Inicio"></v-list-item>
        </router-link>
        <router-link to="/operator/orders" class="router-link">
          <v-list-item
            prepend-icon="mdi-tanker-truck"
            title="Órdenes"
          ></v-list-item>
        </router-link>
        <!-- TODO: Implementar el logout para el operator -->
        <router-link to="/operator" class="router-link">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Cerrar sesión"
          ></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <style lang="scss" src="/src/styles/global.scss"></style>