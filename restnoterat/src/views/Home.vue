<template>
  <div>
    <q-btn label="martin" color="red"/>
    <q-input debounce="500" label="jag är ett textfält" v-model="input"/>
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
      currentShortage: false
    }
  },
  components: {
    DataTable
  }
}
</script>

<style scoped></style>
