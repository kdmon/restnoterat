<template>
  <div>
    <q-btn
      class="q-ma-lg"
      @click="$router.go(-1)"
      text-color="black"
      label="Tillbaka"
      icon="arrow_back"
      unelevated
      no-caps
    />
    <div class="q-pa-md">
      <div class="row">
        <div class="col-8 column">
          <h1>
            {{ product.name }}
            {{ product.strength }}
          </h1>
          <h2>{{ $store.state.supplies.formLexicon[product.form].se }}</h2>
          <h2>{{ $store.state.supplies.atcLexicon[product.atc].se }} ({{ product.atc }})</h2>
          <!-- <p>{{ JSON.stringify(product.packages) }}</p> -->
        </div>
        <div class="col-4" style="display: flex; align-items: baseline;">
          <q-chip
            class="rounded"
            text-color="white"
            size="24px"
            v-if="product.currentShortages.length > 0"
            color="red-14"
          >Pågående</q-chip>
          <q-chip
            class="rounded"
            size="24px"
            v-if="product.upcomingShortages.length > 0"
            color="amber-14"
          >Kommande</q-chip>
          <q-chip
            class="rounded"
            text-color="white"
            size="24px"
            v-if="product.currentShortages.length === 0 && product.upcomingShortages.length === 0"
            color="grey-7"
          >Avslutad</q-chip>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
    <!-- END OF HEADLINE -->
    <div class="q-pa-md">
      <!-- END OF UPCOMING SHORTAGES -->
      <div>
        <h4>Pågående restnoteringar ({{product.currentShortages.length}})</h4>
        <!-- START OF CURRENT SHORTAGES -->
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            icon="stop_circle"
            header-class="red-icon"
            v-for="shortage in product.currentShortages"
            :key="shortage.referenceNumber"
            :label="shortage.packs.length > 1 ? 'Flera förpackningar' : shortage.packs[0].name"
            :caption="shortage.forecastDate.startDate + ' - ' + shortage.forecastDate.endDate"
          >
            <q-card>
              <q-card-section>
                <div v-if="shortage.packs.length > 1">
                  <p>
                    <span class="text-bold">Förpackningar:</span>
                  </p>
                  <ul>
                    <li v-for="pack in shortage.packs" :key="pack.nplPackId">{{pack.name}}</li>
                  </ul>
                </div>
                <p>
                  <span class="text-bold">Information från läkemedelsverket:</span>
                  {{shortage.advice}}
                </p>
                <p>
                  <span class="text-bold">Senast Uppdaterad:</span>
                  {{shortage.publicationDate.lastPublication}}
                </p>
                <p>
                  <span class="text-bold">Beräknas upphöra:</span>
                  {{shortage.forecastDate.endDate ? shortage.forecastDate.endDate : 'Uppgift saknas'}}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <!-- END OF CURRENT SHORTAGESS -->
      <div>
        <h4>Kommande restnoteringar ({{product.upcomingShortages.length}})</h4>
        <!-- START OF UPCOMING SHORTAGES -->
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            icon="stop_circle"
            header-class="yellow-icon"
            v-for="shortage in product.upcomingShortages"
            :key="shortage.referenceNumber"
            :label="shortage.packs.length > 1 ? 'Flera förpackningar' : shortage.packs[0].name"
            :caption="shortage.forecastDate.startDate + ' - ' + shortage.forecastDate.endDate"
          >
            <q-card>
              <q-card-section>
                <div v-if="shortage.packs.length > 1">
                  <p>
                    <span class="text-bold">Förpackningar:</span>
                  </p>
                  <ul>
                    <li v-for="pack in shortage.packs" :key="pack.nplPackId">{{pack.name}}</li>
                  </ul>
                </div>
                <p>
                  <span class="text-bold">Information från läkemedelsverket:</span>
                  {{shortage.advice}}
                </p>
                <p>
                  <span class="text-bold">Senast Uppdaterad:</span>
                  {{shortage.publicationDate.lastPublication}}
                </p>
                <p>
                  <span class="text-bold">Beräknas upphöra:</span>
                  {{shortage.forecastDate.endDate ? shortage.forecastDate.endDate : 'Uppgift saknas'}}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <!-- START OF PREVIOUS SHORTAGES -->
      <div>
        <h4>Avslutade restnoteringar ({{product.previousShortages.length}})</h4>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            icon="stop_circle"
            header-class="grey-icon"
            v-for="shortage in product.previousShortages"
            :key="shortage.referenceNumber"
            :label="shortage.packs.length > 1 ? 'Flera förpackningar' : shortage.packs[0].name"
            :caption="shortage.forecastDate.startDate + ' - ' + shortage.actualEndDate + ' (' + shortage.duration + ' dagar)'"
          >
            <q-card>
              <q-card-section>
                <div v-if="shortage.packs.length > 1">
                  <p>
                    <span class="text-bold">Förpackningar:</span>
                  </p>
                  <ul>
                    <li v-for="pack in shortage.packs" :key="pack.nplPackId">{{pack.name}}</li>
                  </ul>
                </div>
                <p>
                  <span class="text-bold">Information från läkemedelsverket:</span>
                  {{shortage.advice}}
                </p>
                <p>
                  <span class="text-bold">Senast Uppdaterad:</span>
                  {{shortage.publicationDate.lastPublication}}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetData',
  computed: {
    product () {
      return this.$store.getters.productByNplId(this.$route.params.id)
    }
  },
  created () {
    // console.log(this.allSupplies[19930528000047])
  }
}
</script>

<style>
.red-icon .q-item__section--avatar {
  color: #d50000;
}
.grey-icon .q-item__section--avatar {
  color: #757575;
}
.yellow-icon .q-item__section--avatar {
  color: #ffab00;
}
</style>

<style scoped>
.my-card {
  max-width: 400px;
}
.row > div {
  padding: 10px 15px;
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
h4 {
  margin-bottom: 0.5em;
}
h1 {
  line-height: 1em;
  margin: 0;
  font-size: 3.25em;
}
h2 {
  margin: 0.25em 0;
  line-height: 1em;
  font-size: 2.15em;
}
.rounded {
  border-radius: 48px;
}
</style>
