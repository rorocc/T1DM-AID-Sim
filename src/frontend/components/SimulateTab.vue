<template>
  <div class="sidebarNav grid absolute right-0 h-full top-0">

    <div ref="tabMeals" class="sidebarItem active" @click="setActiveTab('tabMeals')">
      <div class="itemLabel">
        <i class="fa-solid fa-apple-whole"></i>
        <p>Mahlzeiten</p>
      </div>

    </div>
    <div ref="tabTime" class="sidebarItem" @click="setActiveTab('tabTime')">
      <div class="itemLabel">
        <i class="fa-solid fa-clock"></i>
        <p>Zeitraum</p>
      </div>

    </div>
    <div ref="tabTherapy" class="sidebarItem" @click="setActiveTab('tabTherapy')">
      <div class="itemLabel">
        <i class="fa-solid fa-syringe"></i>
        <p>Therapie</p>
      </div>

    </div>
    <div ref="tabPatient" class="sidebarItem" @click="setActiveTab('tabPatient')">
      <div class="itemLabel">
        <i class="fa-solid fa-user"></i>
        <p>Patient:in</p>
      </div>
    </div>
  </div>

  <div class="container w-2/3">
  <div v-if="this.activeTab==='tabPatient'">
    <input type="text" placeholder="Alter">
    <input type="text" placeholder="Gewicht">
  </div>


  <div>
    <div v-if="this.activeTab==='tabTime'" class="grid grid-flow-row justify-between space-y-2 w-full">
      <div class="grid grid-flow-col justify-between">
        <label for="date">Beginn</label>
        <input id="date" v-model.lazy="date" type="date" placeholder="Beginn">
      </div>
      <div class="grid grid-flow-col justify-between">
        <label for="time">Zeitpunkt</label>
        <input id="time" v-model.lazy="time" type="time" placeholder="Zeitpunkt">
      </div>
      <div class="grid grid-flow-col justify-between">
        <label for="hours">Zeitraum in h</label>
        <input id="hours" v-model.lazy="hours" type="number" placeholder="Zeitraum in h">
      </div>
    </div>

    <div v-if="this.activeTab==='tabMeals'">
      <div v-for="meal in this.meals" class="singleMeal">
        <div>
          <p>{{ meal.actual.start.toLocaleString() }}</p>
          <p> Ankündigung: <span v-if="meal.announcement">{{meal.announcement.start.toLocaleString()}}</span><span v-else>Nein</span></p>
        </div>
        <input id="carbs" v-model="meal.actual.carbs" type="number" placeholder="Kohlenhydrate in g">
        <label for="carbs">Kohlenhydrate in g</label>
        <input id="abstand" type="number" placeholder="Ankündigungsabstand">
        <label for="abstand">Ankündigungsabstand</label>
      </div>

      <div class="addMealContainer" @click="addMeal()">
        <div class="addMealButton">
          <i class="fa-solid fa-plus"></i>
        </div>
        <p>Mahlzeit hinzufügen</p>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
import {dateToBrowserLocale} from "../../common/util.js";

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
    hours(val, oldVal){
      let fDate = new Date(this.date + ' ' + this.time);
      this.$store.dispatch("setTime", [fDate, val]);
    },
    date(val, oldVal){
      let fDate = new Date(val + ' ' + this.time)
      this.$store.dispatch("setTime", [fDate, this.hours]);
    },
    time(val, oldVal){
      let fDate = new Date(this.date + ' ' + val)
      this.$store.dispatch("setTime", [fDate, this.hours]);
    },
  },
  methods: {
    addMeal(){
      let start, duration, carbs, announcement;

      if(!this.meals){
        duration = 15;
        carbs = 20;
        start = new Date(this.date + ' ' + this.time);
      }else{
        duration = this.meals[this.meals.length-1].actual.duration;
        carbs = this.meals[this.meals.length-1].actual.carbs;
        start = this.meals[this.meals.length-1].actual.start;
      }

      announcement = undefined;

      this.pushMeal(start, duration, carbs, announcement);


    },
    pushMeal(start, duration, carbs, announcement){
      let meal = {
        actual: {
          start: start,
          duration: duration,
          carbs: carbs,
        },
        announcement
      }

      this.meals.push(meal);
      this.$store.dispatch("setMeals", this.meals)
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

.singleMeal{
  @apply w-full bg-gray-200 p-4 my-2 rounded;
}

.addMealContainer{
  @apply w-full grid grid-flow-col space-x-2 items-center justify-center mt-3;
}

.addMealButton{
  border: 1px solid;
  border-color: var(--blue-primary);
  @apply rounded-full w-8 h-8 grid justify-center items-center;
}

.itemLabel{
  @apply my-auto;
}

.itemLabel i{
  @apply text-3xl;
}

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

.sidebarItem{
  background-color: var(--blue-medium);
  color: var(--blue-grey);
  border-bottom: 1px solid;
  border-color: var(--blue-grey);
  @apply w-24 text-center my-auto h-full grid;
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