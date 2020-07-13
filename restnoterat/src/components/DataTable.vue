<template>
  <div>
    <!-- <pre> zzzz {{JSON.stringify(shortages(), null, 2)}}</pre> -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Namn</th>
          <th>Atc</th>
          <th>Npl id</th>
          <th>Referens</th>
          <th>Förslag</th>
          <th>Pack</th>
          <th>Contact</th>
          <!-- <th>Publication</th> -->
          <!-- <th>Forecast</th> -->
          <th>Pågående</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supply, i, c) in shortages(currentShortage)" :key="supply.nplId">
          <td>{{c}} {{ supply.name }}</td>
          <td>{{ supply.atc }}</td>
          <router-link :to="{ path: '/nplid/' + supply.nplId }">
            <td>{{ supply.nplId }}</td>
          </router-link>
          <td>{{ supply.shortages[0].referenceNumber }}</td>
          <td>{{ supply.shortages[0].advice }}</td>
          <td>{{ supply.shortages[0].packs }}</td>
          <td>{{ supply.shortages[0].publicContact }}</td>
          <!-- <td>{{ supply.shortages[0].publicationDate.firstPublication }}</td> -->
          <td v-if="supply.currentShortage">Ja</td>
          <td v-else>Nej</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DataTable',
  props: ['currentShortage'],
  data: function () {
    return {}
  },
  computed: mapGetters(['shortages'])
}
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
