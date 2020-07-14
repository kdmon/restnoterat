<template>
  <div>
    <h6>currentShortage: {{ product.currentShortage }}</h6>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Hem" icon="home" to="/" />
        <q-breadcrumbs-el label="Detalj" />
      </q-breadcrumbs>
    </div>
        <div class="q-pa-md row items-start q-gutter-md ">
      <q-card class="my-card">
        <div class="text-h5 text-center">Fakta</div>
        <q-card-section><strong>Läkemdel:</strong> {{ product.name }}</q-card-section>
        <q-card-section><strong>ATC:</strong> {{ product.atc }}</q-card-section>
        <q-card-section><strong>Nplid:</strong> {{ product.nplId }}</q-card-section>
        <q-card-section><strong>Form:</strong> {{ product.form }}</q-card-section>
      </q-card>
      <q-card class="my-card" v-for="period in product.shortages" :key="period.referenceNumber">
        <div class="text-h5 text-center">Restnotering</div>
          <q-card-section><strong>Förpackning:</strong> {{ product.packages[period.packs[0].nplpackid[0]].text }}</q-card-section>
          <q-card-section><strong>Nplpackid:</strong> {{ period.packs[0].nplpackid[0] }}</q-card-section>
          <q-card-section><strong>Första Publicering:</strong> {{ period.publicationDate.firstPublication }}</q-card-section>
          <q-card-section><strong>Senast Publicering:</strong> {{ period.publicationDate.lastPublication }}</q-card-section>
          <q-card-section><strong>Prognos:</strong> {{ period.forecastDate.startDate }} - {{ period.forecastDate.endDate }}</q-card-section>
          <q-card-section><strong>Restnotering upphörd:</strong> {{ period.actualEndDate }}</q-card-section>
          <q-card-section><strong>Referens:</strong> {{ period.referenceNumber }}</q-card-section>
          <q-card-section><strong>Rekommendation:</strong> {{ period.advice }} </q-card-section>
          <q-card-section v-if="period.actualEndDate"><strong>Pågoende restnotering:</strong> Nej</q-card-section>
          <q-card-section v-else><strong>Pågoende restnotering:</strong> Ja</q-card-section>
          <q-card-section v-if="!period.actualEndDate"><strong>Kontakt:</strong> {{ period.publicContact }} </q-card-section>
      </q-card>
      <!-- <q-card class="my-card">
        <div class="text-h5 text-center">Substans</div>
          <q-card-section><strong>Namn:</strong> {{ product.substances[0].name }}</q-card-section>
          <q-card-section><strong>Typ:</strong> {{ product.substances[0].type }}</q-card-section>
          <q-card-section><strong>Qnt:</strong> {{ product.substances[0].qnt }}</q-card-section>
          <q-card-section><strong>qunit:</strong> {{ product.substances[0].qunit }}</q-card-section>
          <q-card-section><strong>qunit2:</strong> {{ product.substances[0].qunit2 }}</q-card-section>
      </q-card> -->
          </div>
    <div v-if="product">
      <h6
        v-if="product.name"
      >Name: {{ product.name }}</h6>
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
</style>
