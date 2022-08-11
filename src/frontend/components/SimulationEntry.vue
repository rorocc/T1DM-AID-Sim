<template>
  <div class="entry flex justify-between">
    <div class="grid grid-row-2">
      <p class="font-bold"><i class="fa-solid fa-pen"></i> OpenAPS | {{input.meals.length}} Mahlzeiten | {{results[0].t.toTimeString().substring(0,5)}}-{{results[results.length-1].t.toTimeString().substring(0,5)}} Uhr</p>
      <div class="grid grid-flow-col items-center justify-content-between">
        <p>{{(computedStats.t_total/60).toFixed()}} Stunden</p>
        <div class="bar h-4 w-20 relative">
          <div class="bg-purple-600 h-full w-full absolute"></div>
          <div class="bg-green-600 h-full w-2/4 absolute"></div>
          <div class="bg-red-700 h-full w-1/4 absolute"></div>
        </div>
      </div>
    </div>
    <i class="fa-solid fa-eye toggle-visibility"></i>
  </div>
</template>

<script>
export default {
  name: "SimulationEntry",
  props: ['results', 'computedStats','input']
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