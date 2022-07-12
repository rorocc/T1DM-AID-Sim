<template>
  <div class="sidebarNav grid absolute right-0 h-full top-0">
    <div @click="toggleSidebar('sideMeals')" ref="sideMeals" class="tab-btn active">
      <i class="fa-solid fa-apple-whole"></i>
      <p>Mahlzeiten</p>
    </div>
    <div @click="toggleSidebar('sideTime')" ref="sideTime" class="tab-btn">
      <i class="fa-solid fa-clock"></i>
      <p>Zeitraum</p>
    </div>
    <div @click="toggleSidebar('sideTherapy')" ref="sideTherapy" class="tab-btn">
      <i class="fa-solid fa-syringe"></i>
      <p>Therapie</p>
    </div>
    <div @click="toggleSidebar('sidePatient')" ref="sidePatient" class="tab-btn">
      <i class="fa-solid fa-user"></i>
      <p>Patient:in</p>
    </div>
  </div>

<div v-show="this.activeTab === 'sideMeals'">
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

</div>
<div v-if="this.activeTab === 'sideTime'">
  <p> test </p>
</div>

<div v-if="this.activeTab === 'sideTherapy'">
  <p> test </p>
</div>

<div v-if="this.activeTab === 'sidePatient'">
  <p> test </p>
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
      activeTab: 'sideMeals'
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
  },
  methods:{
    toggleSidebar(tabRef){
      this.activeTab = tabRef;
      this.$refs['sideMeals'].classList.remove('active');
      this.$refs['sideTime'].classList.remove('active');
      this.$refs['sideTherapy'].classList.remove('active');
      this.$refs['sidePatient'].classList.remove('active');
      this.$refs[tabRef].classList.add('active');
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

.tab-btn{
  background-color: var(--blue-medium);
  color: var(--blue-grey);
  border-bottom: 1px solid;
  border-color: var(--blue-grey);
  @apply w-24 text-center my-auto h-full;
}

.active{
  background-color: var(--blue-grey);
  color: var(--blue-medium);
}


.sidebarNav{
  border-radius: 0 22px 0 0;
  @apply overflow-hidden;
}
</style>