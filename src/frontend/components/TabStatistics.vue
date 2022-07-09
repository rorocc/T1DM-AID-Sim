<template>
  <div class="circles flex justify-center">
    <div class="outer-circle -mr-4">
      <div class="content">
        <p class="stat-no">{{this.$store.getters.computedStats.totalBolus}}</p>
        <p>Bolus</p>
      </div>
    </div>
    <div class="center-circle">
      <div class="content">
        <p class="stat-no">{{this.$store.getters.computedStats.averageGlucose}}</p>
        <p>Avg Glucose</p>
      </div>
    </div>
    <div class="outer-circle -ml-4">
      <div class="content">
        <p class="stat-no">{{this.$store.getters.computedStats.totalBolus}}</p>
        <p>Bolus</p>
      </div>
    </div>
  </div>
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
.stat-no{
  @apply text-4xl font-medium;
}

.center-circle{
  background-color: #6F829E;
  color: var(--blue-light);
  border: 6px solid;
  border-color: var(--blue-light);
  @apply rounded-full h-36 w-36 text-center flex z-10 my-auto;
}

.center-circle .content, .outer-circle .content{
  @apply my-auto mx-auto;
}

.outer-circle{
  background-color: var(--blue-medium);
  @apply rounded-full h-28 w-28 text-center flex my-auto;
}

</style>