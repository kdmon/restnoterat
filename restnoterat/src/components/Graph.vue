<template>
    <div>
        <div style="border: 2px solid black; padding: 0; height: 500px; overflow: auto;">
            <!-- Date scale -->
            <svg
                id="graph"
                xmlns="http://www.w3.org/2000/svg"
                :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                height="50"
                :hheight="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                vviewbox="0 0 100 100"
                aaria-labelledby="diagram"
                role="presentation"
                style="display: block; z-index: 1; position: sticky; top: 0px; left: 0;"
            >
                <ttitle id="diagram" lang="en">Diagram</ttitle>

                <!-- plot timelines/scale -->
                <g>
                    <!-- Background fill -->
                    <rect
                    y="0"
                    x="0"
                    height="50"
                    :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    fill="white"
                    />
                <g
                    v-for="day in (Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max)"
                    :key="day"
                >

                    <!-- Mark minor grid lines -->
                    <rect
                    v-if="Math.floor((day % (1/$store.state.supplies.graph.scale) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale) == 0)"
                    :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    y="40"
                    height="50"
                    :gheight="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                    width="1"
                    :fill="pickColor('minorLine')"
                    />

                    <!-- Mark major grid lines -->
                    <rect
                    v-if="Math.floor((day % (10 * (1/$store.state.supplies.graph.scale) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale)) == 0)"
                    :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    y="35"
                    height="50"
                    :gheight="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                    width="3"
                    :fill="pickColor('majorLine')"
                    />

                    <!-- Print dates -->
                    <text
                    v-if="Math.floor((day % (10 * (1/$store.state.supplies.graph.scale) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale)) == 0)"
                    :x="(day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale) - 30"
                    y="30"
                    fill="black"
                    >{{ calculateDate(day - Math.abs($store.state.supplies.graph.min)) }}</text>
                </g>

                <!-- Mark today's date -->
                <rect
                    :x="Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    y="15"
                    height="60"
                    width="5"
                    fill="red"
                />

                <!-- Print todays date -->
                <text
                    :x="(Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale) - 30"
                    y="12"
                    fill="black"
                >{{ new Date().toISOString().slice(0, 10)}}</text>
                </g>
            </svg>
            <div v-for="(supply, i, c) in shortages" :key="i" style="ddisplay: none">
               <div style="display: block; position: sticky; top: 50px; background:yellow;">
                    {{c+1}}. {{supply.name}} ({{i}})
                </div>
                <svg
                id="graph"
                xmlns="http://www.w3.org/2000/svg"
                :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                :height="supply.shortages.length * $store.state.supplies.graph.rowHeight"
                vviewBox="0 0 18 18"
                aaria-labelledby="diagram"
                role="presentation"
                style="display: block;"
                >
                <ttitle id="diagram" lang="en">Diagram</ttitle>

                <!-- Plot packages -->
                <!-- Group by nplid -->
                <g
                    v-for="(row) of supply"
                    :key="row.nplId"
                    :ttransform="`translate(0, ${(row.offset * $store.state.supplies.graph.rowHeight) + 50 || 0})`"
                >
                    <rect
                    x="0"
                    y="0"
                    :height="(supply.shortages.length) * $store.state.supplies.graph.rowHeight"
                    :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                    :fill=" i % 2 == 0 ? pickColor('even') : pickColor('odd') "
                    />
                    <!-- Group by nplpackid -->
                    <g
                    v-for="(period, p) of supply.shortages"
                    :key="p"
                    tabindex="0"
                    @cclick="clickHandler(supply.nplId)"
                    sstyle="cursor: pointer;"
                    >
                    <a @click="clickHandler(supply.nplId)" xxlink:hhref="#" cursor="pointer" pointer-events="all">
                        <rect
                        class="drug-row"
                        rx="10"
                        ry="10"
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
                        >{{ getPacks(period.packs, supply.packages) }}</text>
                    </a>
                    </g>
                </g>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'DataTable',
  props: ['currentShortage', 'query'],
  data: function () {
    return {
      splitterModel: 20
    }
  },
  computed: {
    shortages () {
      return this.$store.getters.shortages(this.currentShortage, this.query)
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
    // searchHandler: function () {
    //   // console.log('detta e log', this.search)
    //   // console.log('detta e log', this.$store.state.supplies.combined)
    //   let products
    //   for (products in this.$store.state.supplies.combined) {
    //     if (this.$store.state.supplies.combined[products].name.includes(this.query)) {
    //       console.log(this.$store.state.supplies.combined[products].name)
    //     }
    //   }
    // },
    clickHandler: function (id) {
      this.$router.push({ name: 'Detail', params: { id: id } })
    },
    pickColor: function (status) {
      const color = {
        upcoming: '#2196F3',
        current: '#00BCD4',
        previous: '#4caf50',
        majorLine: '#00000020',
        minorLine: '#00000020',
        odd: '#f5f5f5',
        even: '#eeeeee',
        today: '#ff0000'
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
