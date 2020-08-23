<template>
  <div cclass="bg-teal" style="overflow: auto; height: calc(100vh - 80px); margin-top: 0; will-change: transform;">
        <div class="row bg-white" style="position: sticky; top: 0px; left: 0; z-index: 50;">
            <div class="col q-pl-xl">
                <div class="q-gutter-md" style="max-width: 400px">
                    <q-input dense outlined v-model="query" debounce="500" label="Sök på namn, nplid eller atc-kod">
                      <template v-if="query" v-slot:append>
                        <q-icon name="cancel" @click.stop="query = ''" class="cursor-pointer" />
                      </template>
                    </q-input>
                    <p style="margin: 0.5em 0 0 2em; font-weight: 600;">Visar {{Object.keys(shortages).length}} träffar, sorterat på senast uppdaterad.</p>
                </div>
            </div>
            <div class="col q-pr-lg">
                <q-toggle debounce="500" v-model="currentShortage" label="Enbart pågående restnoteringar"/>
                <br>
                <q-toggle debounce="500" v-model="sortAtc" label="Sortera på ATC-kod"/>
          </div>
        </div>
        <svg
            id="graph"
            xmlns="http://www.w3.org/2000/svg"
            :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale + 350"
            height="50"
            :hheight="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
            vviewbox="0 0 100 100"
            aaria-labelledby="diagram"
            role="presentation"
            style="padding-left: 350px; background: white; box-shadow: 0 4px 4px 0 #00000040; display: block; z-index: 100; position: sticky; top: 80px; left: 0;"
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
                v-if="Math.floor(day % (365.25/12)) == 0"
                :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                y="40"
                height="50"
                :gheight="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                width="1"
                :fill="pickColor('minorLine')"
                />

                <!-- Print dates -->
                <text
                v-if="Math.floor(day % (365.25/12)) == 0"
                :x="(day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale) - 6"
                y="40"
                fill="#777777"
                font-size="9"
                >{{ months[Math.floor(day / (365.25/12))]}}</text>

                <!-- Mark major grid lines -->
                <rect
                v-if="Math.floor(day % 365.25) == 0"
                :x="day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale"
                y="35"
                height="50"
                :gheight="$store.state.supplies.graph.rows * $store.state.supplies.graph.rowHeight"
                width="3"
                :fill="pickColor('majorLine')"
                />

                <!-- Print dates -->
                <text
                v-if="Math.floor(day % 365.25) == 0"
                :x="(day * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale) - 15"
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
                :fill="pickColor('today')"
            />

            <!-- Print todays date -->
            <text
                :x="(Math.abs($store.state.supplies.graph.min) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale) - 30"
                y="12"
                fill="black"
            >{{ new Date().toISOString().slice(0, 10)}}</text>
            </g>
        </svg>
        <template v-for="(supply, i, c) in shortages">
            <div @click="clickHandler(supply.nplId)" :key="i" :style="c % 2 == 0 ? `background: ${pickColor('even2')}; height: ${(supply.shortages.length) * $store.state.supplies.graph.rowHeight}px` : `background: ${pickColor('odd2')}; height: ${(supply.shortages.length) * $store.state.supplies.graph.rowHeight}px`" style="cursor: pointer; display: block; width: 350px; overflow: hidden; z-index: 10; white-space: nowrap; text-overflow: ellipsis; padding-left: 8px; border-bottom: 1px solid #ccc; border-right: 1px dashed #ccc; position: sticky; top: 135px; left: 0;">
                {{c+1}}. <strong>{{supply.name}} {{supply.strength}}</strong> <br>
                <span style="display: inline-block; margin-top: -0.3em; font-size: 0.8em; line-height: 1em; margin-left: 3.5em;">
                {{$store.state.supplies.formLexicon[supply.form].se}}
                <br><strong>{{supply.atc}}</strong>: {{$store.state.supplies.atcLexicon[supply.atc].se}} </span>
            </div>
            <svg
            :key="i + 'a'"
            id="graph"
            xmlns="http://www.w3.org/2000/svg"
            :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale + 350"
            :height="supply.shortages.length * $store.state.supplies.graph.rowHeight"
            vviewBox="0 0 18 18"
            aaria-labelledby="diagram"
            role="presentation"
            style="padding-left: 350px; display: block; border-bottom: 1px solid #bbb; "
            :style="`margin-top: -${(supply.shortages.length) * $store.state.supplies.graph.rowHeight}px`"
            >
            <ttitle id="diagram" lang="en">Diagram</ttitle>

            <!-- Plot packages -->
            <!-- Group by nplid -->
            <g>
                <rect
                x="0"
                y="0"
                :height="(supply.shortages.length) * $store.state.supplies.graph.rowHeight"
                :width="(Math.abs($store.state.supplies.graph.min) + $store.state.supplies.graph.max) * $store.state.supplies.graph.pixelsPerDay * $store.state.supplies.graph.scale + 350"
                :fill=" c % 2 == 0 ? pickColor('even') : pickColor('odd') "
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
                    rx="4"
                    ry="4"
                    :x="(period.relativeStartDay + Math.abs($store.state.supplies.graph.min)) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    :y="p*$store.state.supplies.graph.rowHeight + 25"
                    :width="(Math.abs(period.duration) || 100) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    :height="8"
                    :fill="pickColor(period.status)"
                    />
                    <text
                    :x="(period.relativeStartDay + Math.abs($store.state.supplies.graph.min)) *$store.state.supplies.graph.pixelsPerDay *$store.state.supplies.graph.scale"
                    :y="p*$store.state.supplies.graph.rowHeight + ($store.state.supplies.graph.rowHeight / 1.5) -8"
                    fill="black"
                    font-size="14"
                    >{{ getPacks(period.packs, supply.packages) }}</text>
                </a>
                </g>
            </g>
            </svg>
        </template>
        <graph style="display: none;" :current-shortage="currentShortage" :query="query"/>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'

export default {
  name: 'Home',
  data: function () {
    return {
      months: ['', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', '', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
      query: '',
      sortAtc: false,
      currentShortage: true
    }
  },
  computed: {
    shortages () {
      return this.$store.getters.shortages(this.currentShortage, this.query)
    }
  },
  methods: {
    calculateDate: function (daysAgo) {
      const d = new Date()
      d.setDate(d.getDate() + daysAgo)
      return d.toISOString().slice(0, 4)
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
        upcoming: '#ffa726', // '#2196F3',
        current: '#f50000', // '#00BCD4',
        previous: '#777777', // '#4caf50',
        majorLine: '#00000020',
        minorLine: '#00000020',
        odd: '#f5f5f5',
        even: '#eeeeee',
        odd2: '#fafaff',
        even2: '#f0f0fa',
        today: '#2196f3' // '#ff0000'
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
  },
  components: {
    Graph
  }
}
</script>

<style scoped>
</style>
