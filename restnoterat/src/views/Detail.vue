<template>
  <div>
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
          <q-chip v-if="product.currentShortages.length > 0" color="cyan">PÅGÅENDE</q-chip>
          <q-chip v-if="product.upcomingShortages.length > 0" color="blue">Kommande</q-chip>
          <q-chip v-if="product.currentShortages.length === 0 && product.upcomingShortages.length === 0" color="green">Avslutad</q-chip>
          <!-- <p
            v-if="product.currentShortage"
          >Beräknas upphöra {{ product.shortages.slice(-1)[0].forecastDate.endDate}}</p>
          <p v-else>Upphördes {{ product.shortages.slice(-1)[0].actualEndDate}}</p> -->
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
    <div class="q-pa-md" v-for="shortage in product.currentShortages" :key="shortage.referenceNumber">
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
    </div>
     <!-- END OF CURRENT SHORTAGESS -->
      <h4 v-if="product.upcomingShortages.length > 0">Kommande restnoteringar</h4>
    <h4 v-else>Inga kommande restnoteringar</h4>
    <!-- START OF UPCOMING SHORTAGES -->
    <div class="q-pa-md" v-for="shortage in product.upcomingShortages" :key="shortage.referenceNumber">
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
    </div>
    <!-- START OF PREVIOUS SHORTAGES -->
    <h4>Tidgare restnoteringar</h4>
    <div class="q-pa-md" v-for="shortage in product.previousShortages" :key="shortage.referenceNumber">
      <div class="row">
        <div class="col-5 column" v-for="pack in shortage.packs" :key="pack.nplPackId">
          <p>{{ pack.name }}</p>
          <!-- <p>PackId: {{ period.packs[0].nplpackid[0] }}</p>
          <p>Förslag: {{ period.advice }}</p> -->
        </div>
        <div class="col-7">
          <p>{{ shortage.advice }}</p>
          <p>Upphördes: {{ shortage.actualEndDate }}</p>
          <!-- <p>Publikation: {{ period.publicationDate.firstPublication }} - {{ period.publicationDate.lastPublication }}</p>
          <p>Prognos: {{ period.forecastDate.startDate }} - {{ period.forecastDate.endDate }}</p>
          <p>Upphörd: {{ period.actualEndDate }}</p> -->
        </div>
      </div>
    </div>

    <!--
    <h6>currentShortage: {{ product.currentShortage }}</h6>
    <div class="q-pa-md q-gutter-sm">
      <div class="q-pa-md headline">
        <q-card class="my-card col-12">
          <div class="q-pa-md">
            <div class="row">
              <div class="col-4">.coldsfsfsdfs</div>
              <div class="col-8">.col</div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="row">
        <q-card class="my-card headline">
          <div class="text-h5 text-center">Fakta</div>
          <q-card-section>
            <strong>Läkemdel:</strong>
            {{ product.name }}
          </q-card-section>
          <q-card-section>
            <strong>ATC:</strong>
            {{ $store.state.supplies.atcLexicon[product.atc].se }} ({{ product.atc }})
          </q-card-section>
          <q-card-section>
            <strong>Nplid:</strong>
            {{ product.nplId }}
          </q-card-section>
          <q-card-section>
            <strong>Form:</strong>
            {{ $store.state.supplies.formLexicon[product.form].se }}
          </q-card-section>
          <q-card-section>
            <strong>Styrka:</strong>
            {{ product.strength }}
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="period in product.shortages" :key="period.referenceNumber">
        <div class="text-h5 text-center">Restnotering</div>
        <q-card-section>
          <strong>Förpackning:</strong>
          {{ product.packages[period.packs[0].nplpackid[0]].text }}
        </q-card-section>
        <q-card-section>
          <strong>Nplpackid:</strong>
          {{ period.packs[0].nplpackid[0] }}
        </q-card-section>
        <q-card-section>
          <strong>Första Publicering:</strong>
          {{ period.publicationDate.firstPublication }}
        </q-card-section>
        <q-card-section>
          <strong>Senast Publicering:</strong>
          {{ period.publicationDate.lastPublication }}
        </q-card-section>
        <q-card-section>
          <strong>Prognos:</strong>
          {{ period.forecastDate.startDate }} - {{ period.forecastDate.endDate }}
        </q-card-section>
        <q-card-section>
          <strong>Restnotering upphörd:</strong>
          {{ period.actualEndDate }}
        </q-card-section>
        <q-card-section>
          <strong>Referens:</strong>
          {{ period.referenceNumber }}
        </q-card-section>
        <q-card-section>
          <strong>Rekommendation:</strong>
          {{ period.advice }}
        </q-card-section>
        <q-card-section v-if="period.actualEndDate">
          <strong>Pågoende restnotering:</strong> Nej
        </q-card-section>
        <q-card-section v-else>
          <strong>Pågoende restnotering:</strong> Ja
        </q-card-section>
        <q-card-section v-if="!period.actualEndDate">
          <strong>Kontakt:</strong>
          {{ period.publicContact }}
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="text-h5 text-center">Substans</div>
          <q-card-section><strong>Namn:</strong> {{ product.substances[0].name }}</q-card-section>
          <q-card-section><strong>Typ:</strong> {{ product.substances[0].type }}</q-card-section>
          <q-card-section><strong>Qnt:</strong> {{ product.substances[0].qnt }}</q-card-section>
          <q-card-section><strong>qunit:</strong> {{ product.substances[0].qunit }}</q-card-section>
          <q-card-section><strong>qunit2:</strong> {{ product.substances[0].qunit2 }}</q-card-section>
      </q-card>
    </div>
    <div v-if="product">
      <h6 v-if="product.name">Name: {{ product.name }}</h6>
      <h6>Prod: {{ product.prod }}</h6>
      <h6>Rx: {{ product.rx }}</h6>
      <h6>Flags: {{ product.flags }}</h6>
      <h6>Substances: {{ product.substances }}</h6>
      <h6>Form: {{ product.form }}</h6>
      <h6>Strength: {{ product.strength }}</h6>
      <h6>packages: {{ product.packages }}</h6>
      <h6>Atc: {{ product.atc }}</h6>
      <h6>Advice: {{ product.shortages[0].advice }}</h6>
      <h6>Forecast: {{ product.shortages[0].forecastDate }}</h6>
      <h6>Npl: {{ product.nplId }}</h6>
      <h6>Packs: {{ product.shortages[0].packs }}</h6>
      <h6>Contact: {{ product.shortages[0].publicContact }}</h6>
      <h6>Publication: {{ product.shortages[0].publicationDate }}</h6>
      <h6>Reference: {{ product.shortages[0].referenceNumber }}</h6>
    </div>
    <h4 v-else>Kan inte hitta niplid du letar efter</h4>

    <pre>{{ JSON.stringify(product,null,2) }}</pre>-->
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
