<template>
  <div>
    <h4>Details</h4>
    <div v-if='productByNplId($route.params.id)'>
      <!-- <h4
        v-for="(supply, index) in allSupplies[$route.params.id]"
        v-bind:key="index"
      >
        {{ supply }}

      </h4> -->
      <h4 v-if='productByNplId($route.params.id).name'>Name: {{ productByNplId($route.params.id).name }}</h4>
      <h4>Prod: {{ productByNplId($route.params.id).prod }}</h4>
      <h4>Rx: {{ productByNplId($route.params.id).rx }}</h4>
      <h4>Flags: {{ productByNplId($route.params.id).flags }}</h4>
      <h4>Substances: {{ productByNplId($route.params.id).substances }}</h4>
      <h4>Form: {{ productByNplId($route.params.id).form }}</h4>
      <h4>Strength: {{ productByNplId($route.params.id).strength }}</h4>
      <h4>packages: {{ productByNplId($route.params.id).packages }}</h4>
      <h4>Atc: {{ productByNplId($route.params.id).atc }}</h4>
      <h4>Advice: {{ productByNplId($route.params.id).advice }}</h4>
      <h4>Forecast: {{ productByNplId($route.params.id).forecastDate }}</h4>
      <h4>Npl: {{ productByNplId($route.params.id).nplId }}</h4>
      <h4>Packs: {{ productByNplId($route.params.id).packs }}</h4>
      <h4>Contact: {{ productByNplId($route.params.id).publicContact }}</h4>
      <h4>Publication: {{ productByNplId($route.params.id).publicationDate }}</h4>
      <h4>Reference: {{ productByNplId($route.params.id).referenceNumber }}</h4>
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
