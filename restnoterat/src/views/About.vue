<template>
  <div>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Hem" icon="home" to="/" />
      <q-breadcrumbs-el label="Om" />
    </q-breadcrumbs>
    <div class="info">
      <p>
        Syftet med denna webbplats är att vård- och aptekspersonal samt andra intressenter snabbt
        och enkelt ska kunna överblicka läkemdel som är, har varit eller förväntas
        bli tillfälligt slut hos tillverkare.
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
</style>
