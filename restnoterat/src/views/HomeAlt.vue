<template>
  <div>
        <div class="row">
            <div class="col">
                <div class="q-gutter-md" style="max-width: 300px">
                    <q-input outlined v-model="query" debounce="500" label="Sök läkemedel" hint="Produktnamn eller atc-kod"/>
                </div>
            </div>
            <div class="col">
                <q-toggle debounce="500" v-model="currentShortage" label="Enbart pågående restnoteringar"/>
                <br>
                <q-toggle debounce="500" v-model="sortAtc" label="Sortera på ATC-kod"/>
          </div>
        </div>
        <br>
        <graph :current-shortage="currentShortage" :query="query"/>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'

export default {
  name: 'Home',
  data: function () {
    return {
      query: '',
      sortAtc: false,
      currentShortage: true
    }
  },
  components: {
    Graph
  }
}
</script>

<style scoped>
</style>
