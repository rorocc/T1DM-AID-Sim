<template>
  <ContentContainer>
    <h1>Kurven</h1>
    <ChartCurve></ChartCurve>
  </ContentContainer>
</template>

<script>
import ContentContainer from "./ContentContainer.vue";
import ChartCurve from "./ChartCurve.vue";

export default {
  name: "TabCurves",
  components: {ContentContainer, ChartCurve}
}
</script>

<style scoped>

</style>