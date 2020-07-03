<template>
  <div>
    <h4>Details</h4>
    <div v-if="allSupplies[$route.params.id]">
      <h4
        v-for="(supply, index) in allSupplies[$route.params.id]"
        v-bind:key="index"
      >
        {{ supply }}
      </h4>
    </div>
    <h4 v-else>Can't find the nplid you are searching for</h4>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GetData',
  methods: mapActions(['fetchSuppliesTwo']),
  computed: mapGetters(['allSupplies']),
  created () {
    // this.fetchSuppliesTwo();
    // console.log(this.allSupplies[19930528000047])
  }
}
</script>

<style scoped></style>
