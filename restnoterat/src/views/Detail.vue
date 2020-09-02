<template>
  <div>
    <q-btn class="q-ma-lg" @click="$router.go(-1)" text-color="black" label="Tillbaka" icon="arrow_back" unelevated no-caps/>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Hem" icon="home" to="/" />
      <q-breadcrumbs-el label="Detalj" />
    </q-breadcrumbs>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-5 column">
          <p>
            <span class="medicinalProduct">{{ product.name }}</span>
            {{ product.strength }}
          </p>
          <p>{{ $store.state.supplies.formLexicon[product.form].se }}</p>
          <p>{{ $store.state.supplies.atcLexicon[product.atc].se }} ({{ product.atc }})</p>
          <!-- <p>{{ JSON.stringify(product.packages) }}</p> -->
        </div>
        <div class="col-7">
          <q-chip v-if="product.currentShortages.length > 0" color="red">PÅGÅENDE</q-chip>
          <q-chip v-if="product.upcomingShortages.length > 0" color="yellow">Kommande</q-chip>
          <q-chip v-if="product.currentShortages.length === 0 && product.upcomingShortages.length === 0" color="gray">Avslutad</q-chip>
          <br>
          <br>
          <br>
          <p v-if="product.currentShortages.length >  0"> Beräknas upphöra {{ product.shortages[0].forecastDate.endDate}}</p>
          <p v-if="product.currentShortages.length === 0 && product.upcomingShortages.length === 0">Upphördes {{ product.shortages[0].actualEndDate}}</p>
          <!-- <div
            class="bg-white q-pa-sm sshadow-2"
            style="max-width: 50em; box-shadow: rgb(170, 170, 170) 0px 0px 6px -2px !important; padding-left: 1em; margin: 0px 1em 0px 0px;"
          >
            <p class="monospaced" style="margin: 0px;">{{ product.shortages.slice(-1)[0].advice}}</p>
          </div> -->
          <!-- <p
            class="q-pa-sm"
          >Senast uppdaterad: {{ product.shortages.slice(-1)[0].publicationDate.lastPublication}}</p> -->
        </div>
      </div>
    </div>
    <!-- END OF HEADLINE -->
    <h4 v-if="product.currentShortages.length > 0">Pågående restnoteringar</h4>
    <h4 v-else>Inga pågående restnoteringar</h4>
    <!-- START OF CURRENT SHORTAGES -->
      <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="label"
        style="color: red"
        v-for="shortage in product.currentShortages" :key="shortage.referenceNumber"
        :label="shortage.packs.length > 1 ? 'Flera förpackningar' : shortage.packs[0].name"
        :caption="shortage.forecastDate.startDate + ' - ' + shortage.forecastDate.endDate"
      >
        <q-card>
          <q-card-section>
            <p> <span class="text-bold">Förslag:</span> {{shortage.advice}} </p>
            <p> <span class="text-bold">Senast Uppdaterad:</span> {{shortage.publicationDate.lastPublication}} </p>
            <p> <span class="text-bold">Beräknas upphöra:</span> {{shortage.forecastDate.endDate}} </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      </q-list>
    <!-- <div class="q-pa-md" v-for="shortage in product.currentShortages" :key="shortage.referenceNumber">
      <div class="row">
        <div class="col-5 column">
         <ul>
           <li v-for="pack in shortage.packs" :key="pack.nplPackId">{{ pack.name }}</li>
         </ul>
        </div>
        <div class="col-7">
          <p> {{ shortage.advice }} </p>
          <p> Senast uppdaterad: {{ shortage.publicationDate.lastPublication }}</p>
        </div>
      </div>
    </div> -->
     <!-- END OF CURRENT SHORTAGESS -->
      <h4 v-if="product.upcomingShortages.length > 0">Kommande restnoteringar</h4>
    <h4 v-else>Inga kommande restnoteringar</h4>
    <!-- START OF UPCOMING SHORTAGES -->
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="label"
        v-for="shortage in product.upcomingShortages" :key="shortage.referenceNumber"
        :label="shortage.packs.length > 1 ? 'Flera förpackningar' : shortage.packs[0].name"
        :caption="shortage.forecastDate.startDate + ' - ' + shortage.forecastDate.endDate"
      >
        <q-card>
          <q-card-section>
            <p> <span class="text-bold">Förslag:</span> {{shortage.advice}} </p>
            <p> <span class="text-bold">Senast Uppdaterad:</span> {{shortage.publicationDate.lastPublication}} </p>
            <p> <span class="text-bold">Beräknas upphöra:</span> {{shortage.forecastDate.endDate}} </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      </q-list>
    <!-- <div class="q-pa-md" v-for="shortage in product.upcomingShortages" :key="shortage.referenceNumber">
      <div class="row">
        <div class="col-5 column">
         <ul>
           <li v-for="pack in shortage.packs" :key="pack.nplPackId">{{ pack.name }}</li>
         </ul>
        </div>
        <div class="col-7">
          <p> {{ shortage.advice }} </p>
          <p> Senast uppdaterad: {{ shortage.publicationDate.lastPublication }}</p>
        </div>
      </div>
    </div> -->
    <!-- START OF PREVIOUS SHORTAGES -->
    <h4>Tidigare restnoteringar</h4>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="label"
        style="color: grey"
        v-for="shortage in product.previousShortages" :key="shortage.referenceNumber"
        :label="shortage.packs.length > 1 ? 'Flera förpackningar' : shortage.packs[0].name"
        :caption="shortage.forecastDate.startDate + ' - ' + shortage.actualEndDate + ' (' + shortage.duration + ' dagar)'"
      >
        <q-card>
          <q-card-section>
            <p> <span class="text-bold">Förslag:</span> {{shortage.advice}} </p>
            <p> <span class="text-bold">Senast Uppdaterad:</span> {{shortage.publicationDate.lastPublication}} </p>
            <p> <span class="text-bold">Upphördes:</span> {{shortage.forecastDate.endDate}} </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      </q-list>
    <!-- <div class="q-pa-md" v-for="shortage in product.previousShortages" :key="shortage.referenceNumber">
      <div class="row">
        <div class="col-5 column" v-for="pack in shortage.packs" :key="pack.nplPackId">
          <p>{{ pack.name }}</p>
           <p>PackId: {{ period.packs[0].nplpackid[0] }}</p>
          <p>Förslag: {{ period.advice }}</p>
        </div>
        <div class="col-7">
          <p>{{ shortage.advice }}</p>
          <p>Upphörde: {{ shortage.actualEndDate }}</p>
           <p>Publikation: {{ period.publicationDate.firstPublication }} - {{ period.publicationDate.lastPublication }}</p>
          <p>Prognos: {{ period.forecastDate.startDate }} - {{ period.forecastDate.endDate }}</p>
          <p>Upphörd: {{ period.actualEndDate }}</p>
        </div>
      </div>
    </div> -->
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

<style scoped>
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
</style>
