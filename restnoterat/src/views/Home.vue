<template>
  <div>
    <q-toggle debounce="3500" v-model="currentShortage"/>
      {{ input }} <br>
      {{ checkbox }}
    <data-table :current-shortage="currentShortage" />
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'Home',
  data: function () {
    return {
      input: '',
      checkbox: false,
      currentShortage: false
    }
  },
  components: {
    DataTable
  }
}
</script>

<style scoped></style>
