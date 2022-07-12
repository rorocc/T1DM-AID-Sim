<template>
  <div class="container mx-auto p-4 h-full">
    <Tabs></Tabs>
  </div>
  <footer>
   <BottomBar></BottomBar>
  </footer>
</template>

<script>
import Simulator from '../core/Simulator.js'
import ControllerBasalBolus from '../core/controllers/BasalBolus.js'
import VirtualPatientUvaPadova from '../core/models/UvaPadova.js'
import BottomBar from './components/BottomBar.vue';
import ContentContainer from "./components/ContentContainer.vue";
import Tabs from './components/TabsBar.vue';

var sim = new Simulator();

export default {
  props: {
  },
  components: {BottomBar, Tabs, ContentContainer},
  data(){
    return{
      results: {},
    }
  },
  watch: {
    '$store.getters.input.timeRange': {
      deep: true,
      immediate: false,
      handler: function(newV) {
        console.log("APP-VUE INPUT CHANGE DETECTED")
        this.runSimulation();
      },
    },
  },
  methods: {
    run() {
      this.resetData();
      this.runSimulation();
      this.updateData();
    },
    resetData(){
      //todo
    },
    runSimulation(){
      console.log("BEFORE",this.$store.getters.input.meals)
      // define a patient object
      let patient = new VirtualPatientUvaPadova()
      // define a controller/algorithm
      let controller = new ControllerBasalBolus()
      controller.setParameters(patient.IIReq, true, 30, 1.5)

      sim.setPatient(patient)
      sim.setController(controller)
      sim.setMeals(this.$store.getters.input.meals)

      console.log("USED TR:", this.$store.getters.input.timeRange)

      sim.setOptions(this.$store.getters.input.timeRange)

      sim.runSimulation();
      this.$store.dispatch("setResults",sim.getSimulationResults());

      console.log("AFTER", this.$store.getters.input.meals)
      //console.log("log",this.$store.getters.results)
    },
    updateData(){
      //todo
    }

  },
  mounted() {
    this.runSimulation()
  },

}

</script>