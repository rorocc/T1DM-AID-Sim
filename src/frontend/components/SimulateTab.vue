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
    <div v-if="this.activeTab==='tabPatient'" style="background-color: var(--blue-light);" class="p-4 my-2 rounded">
      <!-- TODO alles bisher ohne Auswirkungen -->
      <div class="grid grid-flow-col justify-between">
        <label for="age">Alter</label>
        <input id="age" v-model.lazy="age" type="number" placeholder="Alter" class="w-20">
      </div>
      <div class="grid grid-flow-col justify-between">
        <label for="weight">Gewicht in kg</label>
        <input id="weight" v-model.lazy="weight" type="number" class="w-20">
      </div>
    </div>

    <div>
      <div v-if="this.activeTab==='tabTime'" style="background-color: var(--blue-light);" class="p-4 my-2 rounded">
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
          <input id="hours" v-model.lazy="hours" type="number" placeholder="Zeitraum in h" class="w-20">
        </div>
      </div>

      <div v-if="this.activeTab==='tabMeals'">
        <div v-for="(meal,index) in this.meals" class="singleMeal">
          <div class="grid grid-flow-col justify-between items-center">
            <h1>Mahlzeit #{{index+1}}</h1>
            <div v-if="!meal.edit" @click="setMealEditMode(index, true)">
              <i class="fa-solid fa-pen"></i>
            </div>
            <div v-else class="grid grid-flow-col space-x-6 items-center">
              <i class="fa-solid fa-trash" @click="deleteMeal(index)"></i>
              <i class="fa-solid fa-floppy-disk" @click="setMealEditMode(index, false); saveMeal(index, meal)"></i>
            </div>
          </div>
          <div v-if="!meal.edit">
            <p><i class="fa-solid fa-clock"></i> {{ meal.actual.start.toLocaleString() }}</p>
            <p><i class="fa-solid fa-bread-slice"></i> {{ meal.actual.carbs }} Kohlenhydrate</p>
            <p><i class="fa-solid fa-bullhorn"></i> Ankündigung: <span v-if="meal.announcement">{{meal.announcement.start.toLocaleString()}}</span><span v-else>Nein</span></p>
          </div>
          <div v-else>
            <div class="mb-2">
              <label  for="carbs">Beginn</label>
              <input class="col-span-2" id="carbs" @change="changeStart(index, $event)" :value="convertValueForDatePicker(meal)" type="datetime-local" placeholder="Kohlenhydrate in g">
            </div>
            <div class="grid grid-cols-3 items-center">
              <label class="col-span-2" for="carbs">Kohlenhydrate in g</label>
              <input class="max-w-min" id="carbs" v-model="meal.actual.carbs" type="number" placeholder="Kohlenhydrate in g">
            </div>
            <div v-if="meal.announcement !== undefined" class="grid space-y-2">
              <h2 @click="()=>{meal.announcement = undefined}">x Ankündigung</h2>
              <div class="grid grid-cols-3 items-center">
                <label class="col-span-2" for="abstand_ank">Abstand</label>
                <input id="abstand_ank" type="number" placeholder="h">
              </div>
              <div class="grid grid-cols-3 items-center">
                <label >Beginn</label>
                <input class="col-span-2" id="beginn_ank" v-model="meal.announcement.start" type="date" placeholder="h">
                <input class="col-span-2" id="beginn_ank" v-model="meal.announcement.start" type="time" placeholder="h">
              </div>
            </div>
            <div v-else>
              <h2 class="my-2" @click="()=>{meal.announcement = {}}">+ Ankündigung hinzufügen</h2>
            </div>

          </div>
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

export default {
  name: "SimulateTab",
  data() {
    return{
      activeTab: 'tabMeals',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      hours: 8,
      meals: this.$store.getters.input.meals,
      weight: 75,
      age: 20,
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
    convertValueForDatePicker(meal) {
      const start = meal.actual.start;
      const dateInUTC = new Date(start.valueOf() - start.getTimezoneOffset() * 60000);
      const date = dateInUTC.toISOString().split('Z')[0];
      return date;
    },
    changeStart(i, event) {
      const value = event.target.value;
      const date = new Date(value);
      this.meals[i].actual.start = date;
    },
    addMeal(){
      let start, duration, carbs, announcement;

      if(this.meals.length === 0){
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
        edit: true,
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
    setMealEditMode(idx, bool){
      this.meals[idx].edit = bool;
    },
    saveMeal(idx, meal){
      this.meals[idx] = meal;
      this.$store.dispatch("setMeals", this.meals);
    },
    deleteMeal(idx){
      this.meals.splice(idx, 1);
      this.$store.dispatch("setMeals", this.meals);
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
  color: var(--blue-primary);
  background-color: var(--blue-light);
  @apply w-full p-4 my-2 rounded;
}

.singleMeal h1{
  @apply font-medium text-lg;
}

.singleMeal h2{
  @apply font-medium pt-2;
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