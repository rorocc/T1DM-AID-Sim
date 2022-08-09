<template>
  <ContentContainer>
    <h1>Glukosekonzentration</h1>
    <ChartCurve></ChartCurve>
    <h1>Insulindosierung und Mahlzeiten</h1>
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