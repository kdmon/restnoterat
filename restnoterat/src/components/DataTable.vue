<template>
  <div>
    <!-- <pre> zzzz {{JSON.stringify(shortages(), null, 2)}}</pre> -->
    <!-- <pre>{{ JSON.stringify($store.state.supplies.graph) }}</pre> -->
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="search" debounce="500" label="Nplid" hint="Sök efter nplid" @input="searchHandler"/>
      <p> sökning: {{ search }}</p>
    </div>

    <q-card style="padding: 1em">
      <p>
        {{ $store.state.supplies.graph.scale }}:
        <q-slider v-model="$store.state.supplies.graph.scale" :min="0" :max="2" :step="0.1"></q-slider>
      </p>
      <q-splitter v-model="splitterModel" style="height: 65vh">
        <template v-slot:before>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Atc</th>
                <th>Npl id</th>
                <!-- <th>Referens</th> -->
                <!-- <th>Förslag</th> -->
                <th>Pack</th>
                <th>datum</th>
                <th>Pågående</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(supply, i, c) in shortages" :key="supply.nplId">
                <td>{{c}} {{ supply.name }}</td>
                <td>{{ supply.atc }}</td>
                <router-link :to="{ path: '/nplid/' + supply.nplId }">
                  <td>{{ supply.nplId }}</td>
                </router-link>
                <!-- <td>{{ supply.shortages[0].referenceNumber }}</td> -->
                <!-- <td>{{ supply.shortages[0].advice }}</td> -->
                <td>
                  <span
                    v-for="i in supply.shortages.length"
                    :key="i"
                  >{{ supply.shortages[i - 1].packs }}</span>
                </td>
                <td>
                  <span
                    v-for="i in supply.shortages.length"
                    :key="i"
                  >{{ supply.shortages[0].forecastDate }}</span>
                </td>
                <td v-if="supply.currentShortages.length > 0">Ja</td>
                <td v-else>Nej</td>
              </tr>
            </tbody>
          </table>
        </template>

        <template v-slot:after>
          <svg
              id="graph"
              xmlns="http://www.w3.org/2000/svg"
              :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
              :height="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
              vviewBox="0 0 18 18"
              aria-labelledby="diagram"
              role="presentation"
            >
              <title id="diagram" lang="en">Diagram</title>

              <!-- plot timelines/scale -->
              <!-- TODO: Account for scale -->
              <g>
                <g
                  v-for="day in (Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max)"
                  :key="day"
                >
                  <rect
                    v-if="Math.floor((day % (1/$store.state.supplies.graph.scale) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale) == 0)"
                    :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    y="50"
                    :height="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                    width="1"
                    fill="black"
                  />

                  <rect
                    v-if="Math.floor((day % (10 * (1/$store.state.supplies.graph.scale) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale)) == 0)"
                    :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    y="50"
                    :height="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                    width="3"
                    fill="black"
                  />
                  <!--
                  <rect
                    v-if="day % $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale == 0"
                    :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    y="50"
                    height="400"
                    width="3"
                    fill="#ccc"
                  />
                  -->
                  <!--
                  <text v-if="day %$store.state.supplies.graph.pixelsPerDay == 0" :x="day *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale" y="20" fill="black">Dag {{day - daysSinceFirstShortage}}</text>
                  -->
                  <text
                    v-if="Math.floor((day % (10 * (1/$store.state.supplies.graph.scale) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale)) == 0)"
                    :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    y="40"
                    fill="black"
                  >{{ calculateDate(day - Math.abs($store.state.supplies.graph.min)) }}</text>
                </g>

                <!-- mark today's date -->
                <rect
                  :x="Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                  y="30"
                  height="1140000"
                  width="5"
                  fill="red"
                />
                <text
                  :x="Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                  y="20"
                  fill="black"
                >{{ Math.abs($store.state.supplies.graph.min)}}!</text>
              </g>

              <!-- plot packages -->
              <!-- Group by nplid -->
              <g
                v-for="(row, i) of shortages"
                :key="i"
                :transform="`translate(0, ${(row.offset * $store.state.supplies.graph.rowHeight) + 50 || 0})`"
              >
                <rect
                  x="0"
                  y="0"
                  :height="row.packCount * $store.state.supplies.graph.rowHeight"
                  width="1115000"
                  :fill=" i % 2 == 0 ? '#eeeeee80' : '#cccccc80'"
                />
                <!-- Group by nplpackid -->
                <g
                  v-for="(period, p) of row.shortages"
                  :key="p"
                  tabindex="0"
                  @click="clickHandler(row.nplId)"
                >
                  <rect
                    class="drug-row"
                    :x="(period.relativeStartDay + Math.abs($store.state.supplies.graph.min)) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    :y="p*$store.state.supplies.graph.rowHeight"
                    :width="(Math.abs(period.duration) || 100) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    :height="$store.state.supplies.graph.rowHeight"
                    :fill="pickColor(period.status)"
                  />
                  <text
                    :x="(period.relativeStartDay + Math.abs($store.state.supplies.graph.min)) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    :y="p*$store.state.supplies.graph.rowHeight + ($store.state.supplies.graph.rowHeight / 1.5)"
                    fill="black"
                    font-size="24"
                  >{{ getPacks(period.packs, row.packages) }}</text>
                </g>
              </g>
            </svg>
        </template>
      </q-splitter>
    </q-card>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'DataTable',
  props: ['currentShortage'],
  data: function () {
    return {
      splitterModel: 20,
      search: ''
    }
  },
  computed: {
    shortages () {
      return this.$store.getters.shortages(this.currentShortage)
    }
  },
  mounted: function () {
    const e = document.getElementById('graph')
    // TODO calculate where it should start
    e.parentElement.scrollLeft = 19500
  },
  methods: {
    calculateDate: function (daysAgo) {
      const d = new Date()
      d.setDate(d.getDate() + daysAgo)
      return d.toISOString().slice(0, 10)
    },
    searchHandler: function () {
      // console.log('detta e log', this.search)
      // console.log('detta e log', this.$store.state.supplies.combined)
      let products
      for (products in this.$store.state.supplies.combined) {
        if (this.$store.state.supplies.combined[products].name.includes(this.search)) {
          console.log(this.$store.state.supplies.combined[products].name)
        }
      }
    },
    clickHandler: function (id) {
      this.$router.push({ name: 'Detail', params: { id: id } })
    },
    pickColor: function (status) {
      const color = {
        upcoming: '#cccccc',
        current: '#3cb2c5',
        previous: '#474a4a'
      }
      return color[status]
    },
    // TODO: fix latest catalog
    getPacks: function (packIds, packages) {
      if (packIds.length > 1) {
        return 'Flera förpackningar'
      } else {
        if (packages[packIds[0].nplpackid[0]]) {
          return packages[packIds[0].nplpackid[0]].text
        } else {
          return 'Okänd förpackning'
        }
      }
    }
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
