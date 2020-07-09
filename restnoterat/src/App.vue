<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-xl">
        <div v-if="!$store.state.supplies.loading">
          <router-view />
        </div>
        <div v-else>
          <q-spinner/>
          <h3>laddar</h3>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style></style>
