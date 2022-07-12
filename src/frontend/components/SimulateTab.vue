<template>
  <div class="sidebarNav grid absolute right-0 h-full top-0">
    <div class="sidebarItem active">
      <i class="fa-solid fa-apple-whole"></i>
      <p>Mahlzeiten</p>
    </div>
    <div class="sidebarItem">
      <i class="fa-solid fa-clock"></i>
      <p>Zeitraum</p>
    </div>
    <div class="sidebarItem">
      <i class="fa-solid fa-syringe"></i>
      <p>Therapie</p>
    </div>
    <div class="sidebarItem">
      <i class="fa-solid fa-user"></i>
      <p>Patient:in</p>
    </div>
  </div>

  <div>
    <input type="text" placeholder="Alter">
    <input type="text" placeholder="Gewicht">
  </div>

  {{ this.$store.getters.input.timeRange.tmax}}
  <div>
    <input v-model.lazy="date" type="date" placeholder="Beginn">
    <input v-model.lazy="time" type="time" placeholder="Zeitpunkt">
    <input v-model.lazy="hours" type="number" placeholder="Zeitraum in h">

    <div v-for="meal in this.$store.getters.input.meals">
      <input v-model="meal.actual.carbs" type="number" placeholder="Kohlenhydrate in g">
      <input type="number" placeholder="Ankündigungsabstand">
    </div>

  </div>
</template>

<script>
export default {
  name: "SimulateTab",
  data() {
    return{
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      hours: 8,
    }
  },
  watch: {
    date(val, oldVal){
      let fDate = new Date(val + ' ' + this.time)
      console.log("FDATE", fDate)
      this.$store.dispatch("setTime", [fDate, this.hours]);
      console.log(fDate)
    },
    time(val, oldVal){
      let fDate = new Date(this.date + ' ' + val)
      this.$store.dispatch("setTime", [fDate, this.hours]);
    }
  }
}
</script>

<style scoped>

input{
  background-color: var(--blue-medium);
  color: var(--blue-primary);
  @apply rounded p-2;
}

.sidebarItem{
  background-color: var(--blue-medium);
  color: var(--blue-grey);
  border-bottom: 1px solid;
  border-color: var(--blue-grey);
  @apply w-24 text-center my-auto h-full;
}

.sidebarItem.active{
  background-color: var(--blue-grey);
  color: var(--blue-medium);
}


.sidebarNav{
  border-radius: 0 22px 0 0;
  @apply overflow-hidden;
}
</style>