<template>
  <div>
    
    <!-- <pre>{{JSON.stringify(allSupplies, null, 2)}}</pre> -->
    <!-- <div v-for="supply in allSupplies" v-bind:key="supply.id" class="supplies">
      <p>Advice: {{ supply.advice }}</p>
      <p>Npldid: {{ supply.nplId }}</p>
      <p>Packs: {{ supply.packs }}</p>
      <p>Reference: {{ supply.referenceNumber }}</p>
      <p>Contact: {{ supply.publicContact }}</p>
      <br>
    </div> -->
     <table class="table table-striped">
  <thead>
    <tr>
      <th>Advice</th>
      <th>Npldid</th>
      <th>Packs</th>
      <th>Reference</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="supply in allSupplies" v-bind:key="supply.nplId">
       <td>{{ supply.advice }}</td> 
       <router-link :to="{path: '/nplid/' + supply.nplId}"><td>{{ supply.nplId }}</td></router-link>
       <!-- <td v-link=>{{ supply.nplId }} </td> -->
       <td>{{ supply.packs }}</td>  
       <td>{{ supply.referenceNumber }}</td>
       <td>{{ supply.publicContact }}</td>    
    </tr> 
   </tbody>
</table>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GetData",
  methods: mapActions(["fetchSupplies"]),
  computed: mapGetters(["allSupplies"]),
  created() {
    this.fetchSupplies();
  }
};
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}</style>
