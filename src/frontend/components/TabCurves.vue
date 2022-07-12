<template>
  <ContentContainer>
    <h1>Kurven</h1>
    <ChartCurve></ChartCurve>
    <h1>Basalrate + Bolus</h1>
    <ChartInsulinCurve></ChartInsulinCurve>
  </ContentContainer>
</template>

<script>
import ContentContainer from "./ContentContainer.vue";
import ChartCurve from "./ChartCurve.vue";
import ChartInsulinCurve from "./ChartInsulinCurve.vue"

export default {
  name: "TabCurves",
  components: {ContentContainer, ChartCurve, ChartInsulinCurve}
}
</script>

<style scoped>

</style>