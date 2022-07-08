<template>
  <div class="container mx-auto p-4">
    <Tabs></Tabs>
  </div>
  <BottomBar></BottomBar>
</template>

<script>
import Simulator from '../core/Simulator.js'
import ControllerBasalBolus from '../core/controllers/BasalBolus.js'
import VirtualPatientUvaPadova from '../core/models/UvaPadova.js'
import BottomBar from './components/BottomBar.vue';
import Tabs from './components/TabsBar.vue';

export default {
  props: {
    runSimulation: Function
  },
  components: {BottomBar, Tabs},
  data(){
    return{

    }
  },
  mounted() {

    // define a patient object
    let patient = new VirtualPatientUvaPadova()
// define a controller/algorithm
    let controller = new ControllerBasalBolus()
    controller.setParameters(patient.IIReq, true, 30, 1.5)
// define a set of meals
    let meals = [
      {
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
      },
    ]

// prepare the simulator
    var sim = new Simulator()

// start the simulation
    sim.setPatient(patient)
    sim.setController(controller)
    sim.setMeals(meals)
    sim.setOptions(this.$store.getters.timeRange)

    sim.runSimulation()
    const results = sim.getSimulationResults()

// display the results (or preprocess them as you need)
    console.log(results)
  }
}

</script>