<template>
  <div class="bottom fixed bottom-0 w-full h-1/2">
    <div v-if="this.isDialogOpen" class="bottom-dialog h-full"> <!-- Bottom Dialog Screens -->
      <BottomBarContent v-if="this.currentDialog === 'tabScenario'">
        <div @click="toggleDialog(0)" class="closer"></div>
        <div class="grid grid-rows-2 space-y-1">
          <div class="flex justify-around">
            <div class="scenario-block">
              <p>Aufstehen</p>
              <i class="fa-solid fa-sun"></i>
            </div>
            <div class="scenario-block">
              <p>Doppelte Mahlzeit</p>
              <i class="fa-solid fa-bowl-food"></i>
            </div>
            <div class="scenario-block">
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
              <p>Kurve als Szenario speichern</p>
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </BottomBarContent>
      <BottomBarContent v-if="this.currentDialog === 'tabCompare'">
        <div @click="toggleDialog(0)" class="closer"></div>
        <p>Sim</p>
      </BottomBarContent>
      <BottomBarContent v-if="this.currentDialog === 'tabSimulate'">
        <div @click="toggleDialog(0)" class="closer"></div>
        <SimulateTab></SimulateTab>
      </BottomBarContent>
    </div>
    <div class="tab-container block inset-x-0 z-10 bottom-0 fixed bg-white"> <!-- Bottom Nav Bar -->
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

export default {
  components: {BottomBarContent, SimulateTab},
  data(){
    return{
      isDialogOpen: true,
      currentDialog: "tabSimulate"
    }
  },
  methods: {
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
      this.isDialogOpen = bool;
    },
    setActive(ref){
      this.$refs['tabCompare'].classList.remove('active');
      this.$refs['tabSimulate'].classList.remove('active');
      this.$refs['tabScenario'].classList.remove('active');

      if(ref) this.$refs[ref].classList.add('active');
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

.closer{
  @apply w-1/12 bg-blue-100 h-1 rounded-full absolute left-1/2 cursor-pointer;
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