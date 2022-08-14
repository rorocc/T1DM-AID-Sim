<template>
  <div class="bottom fixed bottom-0 w-full h-1/2 mb-14 pointer-events-none">
    <div v-if="this.isDialogOpen" class="bottom-dialog h-full" :class="[isDialogOpen ? 'pointer-events-auto' : 'pointer-events-none']"> <!-- Bottom Dialog Screens -->
      <BottomBarContent v-if="this.currentDialog === 'tabScenario'">
        <div class="closerContainer"  @click="toggleDialog(0)">
          <div class="closer"></div>
        </div>
        <div class="grid grid-rows-2 space-y-1">
          <div class="flex justify-around">
            <div class="scenario-block">
              <p>Aufstehen</p>
              <i class="fa-solid fa-sun"></i>
            </div>
            <div class="scenario-block" @click="runDoubleMealScenario">
              <p>Doppelte Mahlzeit</p>
              <i class="fa-solid fa-bowl-food"></i>
            </div>
            <div class="scenario-block" @click="showAlert('Der Simulator unterstützt zur Zeit nicht die Berechnung der Auswirkungen von Alkoholkonsum.')">
              <p>Alkohol</p>
              <i class="fa-solid fa-wine-bottle"></i>
            </div>
          </div>
          <div class="flex justify-around">
            <div class="scenario-block">
              <p>Lange Reise</p>
              <i class="fa-solid fa-plane"></i>
            </div>
            <div class="scenario-block">
              <p>Fettiges Essen</p>
              <i class="fa-solid fa-burger"></i>
            </div>
            <div class="scenario-block add">
            </div>
<!--            <div class="scenario-block add">
              <p>Kurve als Szenario speichern</p>
              <i class="fa-solid fa-plus"></i>
            </div>-->
          </div>
        </div>
      </BottomBarContent>
      <BottomBarContent v-if="this.currentDialog === 'tabCompare'">
        <div class="closerContainer"  @click="toggleDialog(0)">
          <div class="closer"></div>
        </div>
        <div class="w-full" @click="saveCurrentSimulation()">
          <div class="mx-auto border-blue-900 border rounded-xl flex items-center w-2/3 text-blue-900 space-x-2 justify-center text-center">
            <i class="fa-solid fa-floppy-disk"></i> <p>Simulation speichern</p>
          </div>
        </div>
        <div v-for="(entry, idx) in this.$store.getters.savedSims">
          <SimulationEntry :idx="idx" :input="entry.inp" :results="entry.res" :computed-stats="entry.compRes"></SimulationEntry>
        </div>

      </BottomBarContent>
      <BottomBarContent v-if="this.currentDialog === 'tabSimulate'">
        <div class="closerContainer"  @click="toggleDialog(0)">
          <div class="closer"></div>
        </div>

        <SimulateTab></SimulateTab>
      </BottomBarContent>
    </div>
    <div class="tab-container block inset-x-0 z-10 bottom-0 fixed bg-white pointer-events-auto"> <!-- Bottom Nav Bar -->
      <div class="grid grid-cols-3">
        <div class="tab-btn" ref="tabScenario" @click="setDialogType('tabScenario')">Szenarien</div>
        <div class="tab-btn" ref="tabCompare" @click="setDialogType('tabCompare')">Vergleichen</div>
        <div class="tab-btn" ref="tabSimulate" @click="setDialogType('tabSimulate')">Simulieren</div>
      </div>
    </div>
  </div>

</template>

<script>
import BottomBarContent from "./BottomBarContent.vue";
import SimulateTab from "./SimulateTab.vue";
import SimulationEntry from "./SimulationEntry.vue";

export default {
  components: {BottomBarContent, SimulateTab, SimulationEntry},
  data(){
    return{
      isDialogOpen: false,
      currentDialog: ""
    }
  },
  methods: {
    showAlert(msg){
      alert(msg);
    },
    saveCurrentSimulation(){
      this.$store.dispatch("saveResults");
      console.log(this.$store.getters.savedSims)

    },
    setDialogType(type){

      if(this.currentDialog === type){
        this.toggleDialog(0);
        this.currentDialog = "";
        this.setActive("");
        return;
      }else if(!this.isDialogOpen){
        this.toggleDialog(1);
      }

      this.currentDialog = type;
      this.setActive(type);
      console.log(this.currentDialog)
    },
    toggleDialog(bool){
      console.log(this.isDialogOpen)
      if(!bool){
        this.setActive();
        this.currentDialog = "";
      }
      this.isDialogOpen = bool;
    },
    setActive(ref){
      this.$refs['tabCompare'].classList.remove('active');
      this.$refs['tabSimulate'].classList.remove('active');
      this.$refs['tabScenario'].classList.remove('active');

      if(ref) this.$refs[ref].classList.add('active');
    },
    runDoubleMealScenario(){
      let timeRange = {
            "hours": 8,
            "t0": new Date(2022,5,1,11,0,0),
            "tmax": new Date(2022,5,1,19,0,0),
          };
      let meals = [{
            edit: false,
            actual: {
              start: new Date(2022,5,1,12,30,0),
              duration: 15,
              carbs: 60,
            },
            announcement: {
              start: new Date(2022,5,1,12,15,0),
              carbs: 30,
              time: new Date(2022,5,1,11,30,0),
            },
          }]
      console.log("PUSHED:", this.meals);
      this.$store.dispatch("setMeals", meals);
      this.$store.dispatch("setTimeRange", timeRange)
    }
  }
}
</script>

<style scoped>

.scenario-block{
  background-color: var(--blue-medium);
  color: var(--blue-grey);
  @apply w-28 h-28 overflow-hidden relative rounded flex;
}

.scenario-block p{
  @apply text-center m-auto;
}

.scenario-block i{
  opacity: 0.15;
  @apply absolute text-9xl -left-1/3 top-0;
}


.scenario-block.add{
  background: none;
  border: 1px solid;
  border-color: var(--blue-medium);
}

i{
  @apply text-2xl;
}

.closerContainer{
  @apply w-full h-4;
}

.closer{
  @apply w-3/12 bg-blue-100 h-1 rounded-full mx-auto cursor-pointer;
}

.bottom-dialog{
  @apply z-10 w-full;
}

.tab-container{
  filter: drop-shadow(0px 23px 45px rgba(0, 0, 0, 0.25));
}

.tab-btn{
  border-right: 1px solid #aaaaaa;
  color: var(--blue-primary);
  @apply px-6 py-4 text-center;
}

.tab-btn.active{
  color: var(--blue-light);
  border-right: none;
  background-color: var(--blue-primary);
}

</style>