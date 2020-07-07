<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/nplid">Detail</router-link>
    </div>
    <div v-if="!$store.state.supplies.loading">
      <router-view />
    </div>
    <div v-else>
      <h3>laddar</h3>
    </div>
  </div>
</template>

<style></style>
