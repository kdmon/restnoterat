<template>
  <div>
    <h1>HELLO</h1>
    <GetData />
  </div>
</template>

<script>
import GetData from "@/components/GetData.vue";

export default {
  name: "About",
  components: {
    GetData
  }
  // mounted() {
  //   fetch("testing.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // },
};
</script>

<style scoped></style>
