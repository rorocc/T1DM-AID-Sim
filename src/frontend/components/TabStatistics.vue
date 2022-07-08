<template>
  <ContentContainer>
    <h1>Zeit in Bereichen</h1>
  </ContentContainer>

  <ContentContainer>
    <h1>Statistik</h1>
  </ContentContainer>

  <ContentContainer>
    <h1>Zeitraum</h1>
    <div class="grid grid-cols-2">
      <div>
        <p>{{this.$store.getters.timeRange.t0.toLocaleString()}}</p>
        <p>{{this.$store.getters.timeRange.tmax.toLocaleString()}}</p>
        <p>{{(this.$store.getters.timeRange.tmax - this.$store.getters.timeRange.t0)/ (1000 * 3600)}} Stunden betrachtet</p>
      </div>
      <div>
        <p>Mahlzeiten</p>
      </div>
    </div>
  </ContentContainer>
</template>

<script>
import ContentContainer from "./ContentContainer.vue";
export default {
  name: "TabStatistics",
  components: {ContentContainer}
}
</script>

<style scoped>

</style>