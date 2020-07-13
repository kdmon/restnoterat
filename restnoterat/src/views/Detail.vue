<template>
  <div>
    <h4>Details</h4>
    <div v-if='productByNplId($route.params.id)'>
      <h6 v-if='productByNplId($route.params.id).name'>Name: {{ productByNplId($route.params.id).name }}</h6>
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
      </pre> -->
    </div>
    <h4 v-else>Can't find the nplid you are searching for</h4>
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
