<template>
  <div>
    <!-- <pre> zzzz {{JSON.stringify(shortages(), null, 2)}}</pre> -->
    <!-- <div v-for="supply in allSupplies" v-bind:key="supply.id" class="supplies">
      <p>Advice: {{ supply.advice }}</p>
      <p>Npldid: {{ supply.nplId }}</p>
      <p>Packs: {{ supply.packs }}</p>
      <p>Reference: {{ supply.referenceNumber }}</p>
      <p>Contact: {{ supply.publicContact }}</p>
      <br>
    </div> -->
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
        <tr v-for="supply in shortages()" v-bind:key="supply.nplId">
          <td>{{ supply.name }}</td>
          <td>{{ supply.atc }}</td>
          <router-link :to="{ path: '/nplid/' + supply.nplId }"
            ><td>{{ supply.nplId }}</td></router-link>
            <td>{{ supply.shortages[0].referenceNumber }}</td>
          <td>{{ supply.shortages[0].advice }}</td>
          <td>{{ supply.shortages[0].packs }}</td>
          <td>{{ supply.shortages[0].publicContact }}</td>
          <!-- <td>{{ supply.shortages[0].publicationDate.firstPublication }}</td> -->
          <td v-if='supply.currentShortage'>Ja</td>
          <td v-else>Nej</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GetData',
  methods: mapActions(['fetchSupplies']),
  computed: mapGetters(['shortages']),
  created () {
    //  this.fetchSupplies();
  }
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
