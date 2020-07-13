<template>
  <div>
    <h6>Prod: {{ productByNplId($route.params.id).currentShortage }}</h6>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <!-- <router-link :to="{ path: '/' }"><q-breadcrumbs-el label="Hem" /></router-link> -->
        <q-breadcrumbs-el label="Hem" icon="home" to="/" />
        <q-breadcrumbs-el label="Detalj" />
      </q-breadcrumbs>
    </div>
    <h4>Details</h4>
    <div class="q-pa-md row items-start q-gutter-md ">
      <q-card class="my-card">
        <div class="text-h5 text-center">Fakta</div>
        <q-card-section><strong>Läkemdel:</strong> {{ productByNplId($route.params.id).name }}</q-card-section>
        <q-card-section><strong>ATC:</strong> {{ productByNplId($route.params.id).atc }}</q-card-section>
        <q-card-section><strong>Nplid:</strong> {{ productByNplId($route.params.id).nplId }}</q-card-section>
        <q-card-section v-if="productByNplId($route.params.id).currentShortage"><strong>Pågoende restnotering:</strong> Ja</q-card-section>
        <q-card-section v-else><strong>Pågoende restnotering:</strong> Nej</q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="text-h5 text-center">Restnotering</div>
        <q-card-section><strong>Läkemdel:</strong> {{ productByNplId($route.params.id).name }}</q-card-section>
        <q-card-section><strong>ATC:</strong> {{ productByNplId($route.params.id).atc }}</q-card-section>
        <q-card-section><strong>Nplid:</strong> {{ productByNplId($route.params.id).nplId }}</q-card-section>
        <q-card-section v-if="productByNplId($route.params.id).currentShortage"><strong>Pågoende restnotering:</strong> Ja</q-card-section>
        <q-card-section v-else><strong>Pågoende restnotering:</strong> Nej</q-card-section>
      </q-card>
    </div>
    <div v-if="productByNplId($route.params.id)">
      <h6
        v-if="productByNplId($route.params.id).name"
      >Name: {{ productByNplId($route.params.id).name }}</h6>
      <h6>Prod: {{ productByNplId($route.params.id).prod }}</h6>
      <h6>Rx: {{ productByNplId($route.params.id).rx }}</h6>
      <h6>Flags: {{ productByNplId($route.params.id).flags }}</h6>
      <h6>Substances: {{ productByNplId($route.params.id).substances }}</h6>
      <h6>Form: {{ productByNplId($route.params.id).form }}</h6>
      <h6>Strength: {{ productByNplId($route.params.id).strength }}</h6>
      <h6>packages: {{ productByNplId($route.params.id).packages }}</h6>
      <h6>Atc: {{ productByNplId($route.params.id).atc }}</h6>
      <h6>Advice: {{ productByNplId($route.params.id).shortages[0].advice }}</h6>
      <h6>Forecast: {{ productByNplId($route.params.id).shortages[0].forecastDate }}</h6>
      <h6>Npl: {{ productByNplId($route.params.id).nplId }}</h6>
      <h6>Packs: {{ productByNplId($route.params.id).shortages[0].packs }}</h6>
      <h6>Contact: {{ productByNplId($route.params.id).shortages[0].publicContact }}</h6>
      <h6>Publication: {{ productByNplId($route.params.id).shortages[0].publicationDate }}</h6>
      <h6>Reference: {{ productByNplId($route.params.id).shortages[0].referenceNumber }}</h6>
      <!-- <pre>
        {{ JSON.stringify(productByNplId($route.params.id).shortages, null, 2) }}
      </pre>-->
    </div>
    <h4 v-else>Kan inte hitta niplid du letar efter</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GetData',
  computed: mapGetters(['productByNplId']),
  created () {
    // console.log(this.allSupplies[19930528000047])
  }
}
</script>

<style scoped></style>
