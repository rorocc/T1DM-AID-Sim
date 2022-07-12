<template>
  <div class="sidebarNav grid absolute right-0 h-full top-0">
    <div ref="tabMeals" class="sidebarItem active" @click="setActiveTab('tabMeals')">
      <i class="fa-solid fa-apple-whole"></i>
      <p>Mahlzeiten</p>
    </div>
    <div ref="tabTime" class="sidebarItem" @click="setActiveTab('tabTime')">
      <i class="fa-solid fa-clock"></i>
      <p>Zeitraum</p>
    </div>
    <div ref="tabTherapy" class="sidebarItem" @click="setActiveTab('tabTherapy')">
      <i class="fa-solid fa-syringe"></i>
      <p>Therapie</p>
    </div>
    <div ref="tabPatient" class="sidebarItem" @click="setActiveTab('tabPatient')">
      <i class="fa-solid fa-user"></i>
      <p>Patient:in</p>
    </div>
  </div>

  <div class="container w-2/3">
  <div v-if="this.activeTab==='tabPatient'">
    <input type="text" placeholder="Alter">
    <input type="text" placeholder="Gewicht">
  </div>


  <div>
    <div v-if="this.activeTab==='tabTime'">
      <input v-model.lazy="date" type="date" placeholder="Beginn">
      <input v-model.lazy="time" type="time" placeholder="Zeitpunkt">
      <input v-model.lazy="hours" type="number" placeholder="Zeitraum in h">
    </div>

    <div v-if="this.activeTab==='tabMeals'" v-for="meal in this.meals" class="w-full bg-gray-200 p-4">
      <div>
        <p>{{ meal.actual.start.toLocaleString() }}</p>
        <p> Ankündigung: <span v-if="meal.announcement">{{meal.announcement.start.toLocaleString()}}</span><span v-else>Nein</span></p>
      </div>
      <input v-model="meal.actual.carbs" type="number" placeholder="Kohlenhydrate in g">
      <input type="number" placeholder="Ankündigungsabstand">
    </div>

  </div>
  </div>
</template>

<script>
export default {
  name: "SimulateTab",
  data() {
    return{
      activeTab: 'tabMeals',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      hours: 8,
      meals: this.$store.getters.input.meals,
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
  methods: {
    pushMeal(){
      let meal = {
        actual: {
          start: new Date(2022,5,1,8,0,0),
          duration: 15,
          carbs: 20,
        },
        announcement: {
          start: new Date(2022,5,1,8,0,0),
          carbs: 20,
          time: new Date(2022,5,1,7,0,0),
        },
      }
    },
    setActiveTab(ref){
      this.activeTab = ref;

      this.$refs['tabMeals'].classList.remove('active');
      this.$refs['tabPatient'].classList.remove('active');
      this.$refs['tabTherapy'].classList.remove('active');
      this.$refs['tabTime'].classList.remove('active');

      if(ref) this.$refs[ref].classList.add('active');
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