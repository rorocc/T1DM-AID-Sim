<template>
  <body class="container mx-auto p-4 h-full">
    <Tabs></Tabs>
  </body>
  <footer>
   <BottomBar></BottomBar>
  </footer>
</template>

<script>
import Simulator from '../core/Simulator.js'
import ControllerOref0 from '../core/controllers/Oref0.js'
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
      profile: {
				max_iob: 3.5,
				dia: 6,
				max_daily_basal: 1.3,
				max_basal: 3.5,
				max_bg: 120,
				min_bg: 95,
				sens: 50,
				carb_ratio: 9,
				maxCOB: 120,
			},
    }
  },
  watch: {
    '$store.getters.simFlag': {
      handler: function(newV) {
        console.log("APP-VUE FLAG")
        this.$store.dispatch("setSimFlag",false);
        if(newV){
          this.runSimulation();
        }
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
      let controller = new ControllerOref0()
      controller.setParameters(JSON.parse(JSON.stringify(this.profile)), true, 30, 1.5)

      sim.setPatient(patient)
      sim.setController(controller)
      sim.setMeals(this.$store.getters.input.meals)

      console.log("USED TR:", this.$store.getters.input.timeRange)

      sim.setOptions(this.$store.getters.input.timeRange)

      console.log("USED MEALS", this.$store.getters.input.meals)
      sim.runSimulation();
      this.$store.dispatch("resetComputedStats");
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