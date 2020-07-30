<template>
    <div>
 <q-breadcrumbs>
      <q-breadcrumbs-el label="Hem" icon="home" to="/" />
      <q-breadcrumbs-el label="Om" />
    </q-breadcrumbs>
    <div class="info">
      <p>
        Om du hittar något fel på webbsidan eller vill föreslå en förbättning kan du
        skapa en issue på github
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
