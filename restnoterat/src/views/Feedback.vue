<template>
    <div>
      <q-btn class="q-ma-lg" @click="$router.go(-1)" text-color="black" label="Tillbaka" icon="arrow_back" unelevated no-caps/>
 <q-breadcrumbs>
      <q-breadcrumbs-el label="Hem" icon="home" to="/" />
      <q-breadcrumbs-el label="Om" />
    </q-breadcrumbs>
    <h4>Feedback</h4>
    <div class="info">
      <p>
        Om du hittar något fel på webbsidan eller vill föreslå en förbättning kan du
        skapa en issue på <a href="https://github.com/kdmon/restnoterat/issues">github</a>
        eller skicka iväg ett mail till <a href='mailto:hej@martinkassar.se'>hej@martinkassar.se</a>.
        Eftersom det är ett ideellt projekt så kan det dröja innan ändringar implementeras.
      </p>
    </div>
    <h4>För utvecklare</h4>
    <div class="info">
      <p>
        Webbplatsen är skriven i JavaScript med ramverket Vue.js och Node.js.
        Datan om restnoterignar som hämtas från läkemedelsverker är i XML och
        konverteras till JSON via Node. Gränsnittet för webbplatsen är byggt med
        Quasar.
        <br>
        <br>
        Projektet är i öppen <a href="https://github.com/kdmon/restnoterat">källkod</a>
        och licenserad under <a href="https://www.mit.edu/~amini/LICENSE.md">MIT.</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.info {
  display: flex;
  justify-content: center;
}
.info p {
  max-width: 500px;
}
h4 {
  text-align: center;
}
</style>
