<template>
  <div>
    <h4>Details</h4>
    <div v-if="productByNplId($route.params.id)">
      <!-- <h4
        v-for="(supply, index) in allSupplies[$route.params.id]"
        v-bind:key="index"
      >
        {{ supply }}
        
      </h4> -->
      <h4>{{ productByNplId($route.params.id).name }}</h4>
      <h4>{{ productByNplId($route.params.id).atc }}</h4>
      <h4>{{ productByNplId($route.params.id).advice }}</h4>
      

    </div>
    <h4 v-else>Can't find the nplid you are searching for</h4>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GetData',
  methods: mapActions(['fetchSuppliesTwo']),
  computed: mapGetters(['productByNplId']),
  created () {
    // this.fetchSuppliesTwo();
    // console.log(this.allSupplies[19930528000047])
  }
}
</script>

<style scoped></style>
