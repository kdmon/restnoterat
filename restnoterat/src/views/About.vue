<template>
  <div>
    <q-btn class="q-ma-lg" @click="$router.go(-1)" text-color="black" label="Tillbaka" icon="arrow_back" unelevated no-caps/>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Hem" icon="home" to="/" />
      <q-breadcrumbs-el label="Om" />
    </q-breadcrumbs>
    <h4>Syfte</h4>
    <div class="info">
      <p>
        Syftet med denna webbplats är att vård- och apotekspersonal samt andra intressenter snabbt
        och enkelt ska kunna överblicka läkemedel som är, har varit eller förväntas
        bli tillfälligt slut hos tillverkare.
        <br>
        <br>
        Information om restnoteringar kommer direkt från
        <a href="https://www.lakemedelsverket.se/sv/behandling-och-forskrivning/forskrivning/restnoteringar#hmainbody1">Läkemedelsverket</a>
        och uppdateras en gång per dygn. Webbplatsen har även implementerat ett lexikon för både
        ATC-koder och NPL-id för förenkla informationen som kommer från Läkemedelsverket.
        Produktregistret är dock för tillfället utdaterat vilket påverkar informationen som
        syns på webbplatsen.
      </p>
    </div>
    <h4>Om</h4>
      <div class="info">
        <p>Mitt namn är Martin Kassar och jag är en student på Linnéuniversitetet där jag
          studerar interaktiva medier och webbteknologier. Denna webbplatsen har
          implementerats under en praktik hos E-hälsomyndigheten.
          Om du har några funderingar eller vill höra av dig når du mig via
          <a href='mailto:hej@martinkassar.se'>hej@martinkassar.se</a>.
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
