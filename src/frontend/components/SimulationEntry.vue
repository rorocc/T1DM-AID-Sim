<template>
  <div class="entry flex justify-between w-full" @click="showSavedSim()">
    <div class="grid grid-row-2 w-3/4">
      <p class="font-bold">{{input.meals.length}} Mahlzeiten | {{new Date(results[0].t).toTimeString().substring(0,5)}}-{{new Date(results[results.length-1].t).toTimeString().substring(0,5)}} Uhr</p>
      <div class="grid grid-cols-2 items-center justify-content-between w-full">
        <p>{{(computedStats.t_total/60).toFixed()}} Stunden</p>
        <div class="bar h-4 w-full relative inline-flex">
          <div class="bg-purple-600 h-full" :style="{width: calculateWidth(computedStats.tir_high + computedStats.tir_veryhigh) + '%'}"></div>
          <div class="bg-green-600 h-full" :style="{width: calculateWidth(computedStats.tir_target) + '%'}"></div>
          <div class="bg-red-700 h-full" :style="{width: calculateWidth(computedStats.tir_low) + '%'}"></div>
        </div>
      </div>
    </div>
    <i class="fa-solid fa-chevron-right toggle-visibility"></i>
  </div>
</template>

<script>
export default {
  name: "SimulationEntry",
  props: ['results', 'computedStats','input','idx'],

  methods: {
    showSavedSim(){
      this.$store.dispatch("setSavedResults",this.idx);
    },
    calculateWidth(tr){
      let width = this.computedStats.t_total <= 0 ? 0 : Math.round((100 * tr) / this.computedStats.t_total);
      console.log("timerange", width);
      return width;
    }
  }
}
</script>

<style scoped>

  .toggle-visibility{
    @apply mr-3 my-auto text-xl;
  }
  .entry{
    color: var(--blue-grey);
    background-color: var(--blue-medium);
    @apply my-4 p-2 rounded;
  }
</style>