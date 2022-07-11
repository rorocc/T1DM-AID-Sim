<template>
  <div class="bottom fixed bottom-0 w-full h-1/2">
    <div v-if="this.isDialogOpen" class="bottom-dialog h-full"> <!-- Bottom Dialog Screens -->
      <BottomBarContent v-if="this.currentDialog === 'tabScenario'">
        <div @click="toggleDialog(0)" class="closer"></div>
      </BottomBarContent>
      <BottomBarContent v-if="this.currentDialog === 'tabCompare'">
        <div @click="toggleDialog(0)" class="closer"></div>
        <p>Sim</p>
      </BottomBarContent>
      <BottomBarContent v-if="this.currentDialog === 'tabSimulate'">
        <div @click="toggleDialog(0)" class="closer"></div>
        <div class="sidebarNav grid absolute right-0 h-full top-0">
          <div class="sidebarItem">
            <span>Icon</span>
            <span>Text</span>
          </div>
          <div class="sidebarItem">
            <span>Icon</span>
            <span>Text</span>
          </div>
          <div class="sidebarItem">
            <span>Icon</span>
            <span>Text</span>
          </div>
          <div class="sidebarItem">
            <span>Icon</span>
            <span>Text</span>
          </div>
        </div>
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

export default {
  components: {BottomBarContent},
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

.sidebarItem{
  @apply bg-blue-200 w-44 text-center;
}

.sidebarNav{
  border-radius: 0 22px 0 0;
  @apply overflow-hidden;
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

.tab-btn + .active{
  color: var(--blue-light);
  border-right: none;
  background-color: var(--blue-primary);
}

</style>