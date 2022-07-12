<template>
<ContentContainer>
  <div class="circles flex justify-center my-4">
    <div class="outer-circle -mr-4">
      <div class="content">
        <p class="stat-no text-blue-400">{{this.$store.getters.computedStats.IIReq}} IE</p> <!-- needed: basal rate -->
        <p>Basal </p>
      </div>
    </div>
    <div class="center-circle">
      <div class="content">
        <p class="stat-no">{{this.$store.getters.computedStats.averageGlucose}} IE</p> <!-- avg glucose nicht richtig oder? -->
        <p>Gesamt-</p>
        <p>Insulin</p>
      </div>
    </div>
    <div class="outer-circle -ml-4">
      <div class="content">
        <p class="stat-no text-teal-400">{{this.$store.getters.computedStats.totalBolus}} IE</p>
        <p>Bolus</p>
      </div>
    </div>
  </div>
</ContentContainer>
  <ContentContainer>
    <h1>Zeit in Bereichen</h1>
    <div class="space-y-3">
      <div class="bar-container">
        <div class="tir_bar">
          <div class="tir_progressHigh" :style="{ width: this.getTirPercentage(this.$store.getters.computedStats.tir_high) + this.getTirPercentage(this.$store.getters.computedStats.tir_veryhigh) + '%'}">
            <p>{{ getTimeString(this.$store.getters.computedStats.tir_high) }}</p>
          </div>
        </div>
        <div>
          <p>Hoch (&lt;180mg/dL) </p>
        </div>
      </div>
      <div class="bar-container">
        <div class="tir_bar">
          <div class="tir_progressIR" :style="{ width: this.getTirPercentage(this.$store.getters.computedStats.tir_target) + '%'}">
            <p>{{ getTimeString(this.$store.getters.computedStats.tir_target) }}</p>
          </div>
        </div>
        <div>
          <p>Zielbereich (70-180mg/dL)</p>
        </div>
      </div>
      <div class="bar-container">
        <div class="tir_bar">
          <div class="tir_progressLow" :style="{ width: this.getTirPercentage(this.$store.getters.computedStats.tir_low) + this.getTirPercentage(this.$store.getters.computedStats.tir_verylow) + '%'}">
            <p>{{ getTimeString(this.$store.getters.computedStats.tir_low) }}</p>
          </div>
        </div>
        <div>
          <p>Niedrig (>70mg/dL) </p>
        </div>
      </div>
    </div>


  </ContentContainer>

  <ContentContainer>
    <h1>Statistik</h1>
    <div class="grid grid-cols-2 text-center">
      <div>
        <p class="stats-content text-green-500">{{this.$store.getters.computedStats.averageGlucose}} mg/dL</p>
        <p>Mittelwert Glukose</p>
      </div>
      <div>
        <p class="stats-content">{{this.$store.getters.computedStats.GMI}} %</p>
        <p>Glukosemanagement-</p>
        <p>indikator</p>
      </div>
    </div>
  </ContentContainer>

  <ContentContainer>
    <h1>Zeitraum</h1>
    <div class="grid grid-cols-2 items-center">
      <div>
        <p>{{this.$store.getters.timeRange.t0.toLocaleString()}}</p>
        <p>{{this.$store.getters.timeRange.tmax.toLocaleString()}}</p>
        <p>{{(this.$store.getters.timeRange.tmax - this.$store.getters.timeRange.t0)/ (1000 * 3600)}} Stunden betrachtet</p>
      </div>
      <div>
        <p> {{ this.$store.getters.meals}} </p> <!-- needed: number of meals -->
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

.tir_progressHigh{
  background-color: #8333ce;
  color: var(--blue-primary);
  @apply h-full text-right;
}

.tir_progressIR{
  background-color: #6dd63c;
  color: var(--blue-primary);
  @apply h-full text-right;
}

.tir_progressLow{
  background-color: #dd1f29;
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

.stats-content{
  @apply text-2xl font-semibold;
}

</style>