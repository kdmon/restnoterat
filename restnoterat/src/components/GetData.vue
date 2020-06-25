<template>
  <div>
    <h1>COMPONENT</h1>
    <pre>{{JSON.stringify(allSupplies, null, 2)}}</pre>
    <div v-for="supply in allSupplies" v-bind:key="supply.id" class="supplies">
      {{ supply }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "getData",
  methods: mapActions(["fetchSupplies"]),
  computed: mapGetters(["allSupplies"]),
  created() {
    this.fetchSupplies();
  }
};
</script>

<style scoped></style>
