<template>
  <div class="circles flex justify-center my-4">
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
    <div class="space-y-3">
      <div class="bar-container">
        <div class="tir_bar">
          <div class="tir_progress" :style="{ width: this.getTirPercentage(this.$store.getters.computedStats.tir_high) + '%'}">
            <p>{{ getTimeString(this.$store.getters.computedStats.tir_high) }}</p>
          </div>
        </div>
        <div>Hoch</div>
      </div>
      <div class="bar-container">
        <div class="tir_bar">
          <div class="tir_progress" :style="{ width: this.getTirPercentage(this.$store.getters.computedStats.tir_target) + '%'}">
            <p>{{ getTimeString(this.$store.getters.computedStats.tir_target) }}</p>
          </div>
        </div>
        <div>Zielbereich</div>
      </div>
      <div class="bar-container">
        <div class="tir_bar">
          <div class="tir_progress" :style="{ width: this.getTirPercentage(this.$store.getters.computedStats.tir_low) + '%'}">
            <p>{{ getTimeString(this.$store.getters.computedStats.tir_low) }}</p>
          </div>
        </div>
        <div>Niedrig</div>
      </div>
    </div>


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
  components: {ContentContainer},
  methods: {
    getTirPercentage(tirValue){
      return this.$store.getters.computedStats.t_total <= 0 ? 0 : Math.round((100 * tirValue) / this.$store.getters.computedStats.t_total);
    },
    getTimeString(tirValue){
      let hours = tirValue / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours-rhours)*60;
      let rminutes = Math.floor(minutes);

      let hoursString = (rhours <= 0) ? "" : rhours + 'h ';

      return hoursString + rminutes + 'min';
    }
  }
}
</script>

<style scoped>
.bar-container{
  @apply grid grid-cols-3 text-right;
}

.tir_bar{
  background-color: var(--blue-medium);
  @apply w-full h-6 rounded-full overflow-hidden col-span-2;
}

.tir_progress{
  background-color: #6F829E;
  color: var(--blue-primary);
  @apply h-full text-right;
}

.tir_progress p{
  @apply px-2
}

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