<template>
  <div>
    <!-- <pre> zzzz {{JSON.stringify(shortages(), null, 2)}}</pre> -->
    <!-- <pre>{{ JSON.stringify($store.state.supplies.graph) }}</pre> -->
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
    <q-card style="padding: 1em">
      <!-- <p>{{scalingFactor}}: <q-slider v-model="scalingFactor" :min="1" :max="5"></q-slider></p> -->

      <div class="row">
        <div class="col-2" style="border: 1px solid black">
          atckod
        </div>
        <div class="col-10" style="border: 1px solid black">
          <div style="width: auto; height: 500px; overflow: auto;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
              :height="$store.state.supplies.graph.rows * 25"
              vviewBox="0 0 18 18"
              aria-labelledby="diagram"
              role="presentation">
              <title id="diagram" lang="en">Diagram</title>

              <!-- plot timelines/scale -->
              <g>
                <g v-for="day in (Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max)" :key="day">
                  <rect :x="day *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="50" height="4000" width="1" fill="#ccc"></rect>
                  <rect v-if="day %$store.state.supplies.graph.pixelsPerDay == 0" :x="day *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="50" height="400" width="3" fill="#ccc"></rect>
                  <!--
                  <text v-if="day %$store.state.supplies.graph.pixelsPerDay == 0" :x="day *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="20" fill="black">Dag {{day - daysSinceFirstShortage}}</text>
                  -->
                  <text v-if="day %$store.state.supplies.graph.pixelsPerDay == 0" :x="day *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="40" fill="black"> {{ 'hej' }}</text>
                </g>

                <!-- mark today's date -->
                <rect :x="Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="30" height="4000" width="5" fill="red"></rect>
                <text :x="Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="20" fill="black">Idag!</text>

              </g>

              <!-- plot packages -->
              <!-- Group by nplid -->
              <g v-for="(row, i) of shortages()" :key="i" :transform="`translate(0, ${(row.offset * 25) + 50 || 0})`">
                <rect x="0" y="0" :height="row.packCount * 25" width="5000" :fill=" i % 2 == 0 ? '#eeeeee80' : '#cccccc80'"></rect>
                <!-- Group by nplpackid -->
                <g v-for="(period, p) of row.shortages" :key="p" tabindex="0" @click="alert(period.nplpack)" >
                  <rect class="drug-row" :x="period.relativeStartDay *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" :y="p*25" :width="(Math.abs(period.duration) || 100) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" height="20" fill="red"></rect>
                  <!-- <text :x="(period.start *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale) + 10" :y="p*50 + 25" fill="black">{{period.nplpack}}</text> -->
                </g>
              </g>

            </svg>

          </div>
        </div>
      </div>
    </q-card>
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
