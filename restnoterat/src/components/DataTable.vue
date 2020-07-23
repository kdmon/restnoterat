<template>
  <div>
    <!-- <pre> zzzz {{JSON.stringify(shortages(), null, 2)}}</pre> -->
    <!-- <table class="table table-striped">
      <thead>
        <tr>
          <th>Namn</th>
          <th>Atc</th>
          <th>Npl id</th>
          <th>Referens</th>
          <th>Förslag</th>
          <th>Pack</th>
          <th>Contact</th>
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
          <td v-if="supply.currentShortages.length > 0">Ja</td>
          <td v-else>Nej</td>
        </tr>
      </tbody>
    </table>-->
    <!-- <div class="row">
      <div class="col-1 column atc">
        <h4>ssdada</h4>
        <h4>ssdada</h4>
      </div>
      <div class="col-11 column">
        <p>dsadad</p>
        <p>dsadad</p>
        <p>dsadad</p>
      </div>
    </div>-->
    <div class="row" v-for="supply in shortages()" :key="supply.nplId" style="margin-top: 0">
      <div class="col-1">
        <h5 style="width: fit-content">{{ supply.atc }}</h5>
      </div>
      <div class="col-11">
        <svg xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="0" y="0" width="600" height="100" fill="red" />
            <text x="0" y="50" fill="black">{{ supply.shortages[0].packs }}</text>
          </g>
        </svg>
      </div>
    </div>
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
.my-card {
  max-width: 400px;
}
.row > div {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.row + .row {
  margin-top: 1rem;
}
.headline {
  width: 600px;
}
.medicinalProduct {
  font-size: 20px;
}
.atc {
  border: 4px solid yellow;
}
</style>
