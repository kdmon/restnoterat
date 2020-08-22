<template>
   <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-blue">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Restnoterat</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        overlay
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list v-for="(menuItem, index) in menuList" :key="index">

            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                <router-link class="route" :to="{ path: menuItem.route}">
                  {{ menuItem.label }}
                </router-link>
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />

          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <q-page class="q-pt-md">
        <div v-if="!$store.state.supplies.loading">
          <router-view />
        </div>
        <div v-else>
          <q-spinner/>
          <h3>{{ $store.state.supplies.loading }}</h3>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'home',
    label: 'Hem',
    separator: true,
    route: '/'
  },
  {
    icon: 'contact_support',
    label: 'Om',
    separator: false,
    route: '/om'
  },
  {
    icon: 'bug_report',
    label: 'Feedback',
    separator: false,
    route: '/feedback'
  }
]

export default {
  data () {
    return {
      drawer: false,
      menuList
    }
  }
}
</script>
<style>
.route {
  text-decoration: none;
  color: black;
}
</style>
