<template>
  <ContentContainer>
    <h1>Modell</h1>
    <h2>Deine Eingaben</h2>
    <div class="model-row">
      <div class="circle-container col-start-3">
        <div @click="toggleCircle('meal')" ref="meal" class="circle focused-circle">
          <div class="content">
            <p>{{ this.circles['meal'].firstLine }}</p>
            <p>{{ this.circles['meal'].secondLine }}</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="circle-container">
        <div @click="toggleCircle('data')" ref="data" class="circle">
          <div class="content">
            <p>{{ this.circles['data'].firstLine }}</p>
            <p>{{ this.circles['data'].secondLine }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3">
      <div class="circle-container col-start-2">
        <i class="fa-solid fa-arrow-down-long"></i>
      </div>
    </div>
    <h2>Berechnungen</h2>
    <div class="model-row">
      <div class="circle-container col-start-1">
        <div @click="toggleCircle('calcInsulin')" ref="calcInsulin" class="circle">
          <div class="content">
            <p>{{ this.circles['calcInsulin'].firstLine }}</p>
            <p>{{ this.circles['calcInsulin'].secondLine }}</p>
            <p>{{ this.circles['calcInsulin'].thirdLine }}</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="circle-container">
        <div @click="toggleCircle('calcGlucose')" ref="calcGlucose" class="circle">
          <div class="content">
            <p>{{ this.circles['calcGlucose'].firstLine }}</p>
            <p>{{ this.circles['calcGlucose'].secondLine }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3">
      <div class="circle-container">
        <i class="fa-solid fa-arrow-down-long"></i>
      </div>
      <div class="circle-container">
        <i class="fa-solid fa-arrow-up-long"></i>
      </div>
    </div>
    <h2>Anpassungen</h2>
    <div class="model-row">
      <div class="circle-container">
        <div @click="toggleCircle('injectInsulin')" ref="injectInsulin" class="circle">
          <div class="content">
            <p>{{ this.circles['injectInsulin'].firstLine }}</p>
            <p>{{ this.circles['injectInsulin'].secondLine }}</p>
            <p>{{ this.circles['injectInsulin'].thirdLine }}</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="circle-container">
        <div @click="toggleCircle('checkGlucose')" ref="checkGlucose"  class="circle">
          <div class="content">
            <p>{{ this.circles['checkGlucose'].firstLine }}</p>
            <p>{{ this.circles['checkGlucose'].secondLine }}</p>
            <p>{{ this.circles['checkGlucose'].thirdLine }}</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="circle-container">
        <div @click="toggleCircle('adjustBasal')" ref="adjustBasal" class="circle">
          <div class="content">
            <p>{{ this.circles['adjustBasal'].firstLine }}</p>
            <p>{{ this.circles['adjustBasal'].secondLine }}</p>
            <p>{{ this.circles['adjustBasal'].thirdLine }}</p>
          </div>
        </div>
      </div>
    </div>
  </ContentContainer>

  <div class="mb-16">
    <div style="background-color: var(--blue-primary);" class="w-full text-center text-white py-2">
      <div class="grid grid-cols-3">
        <i @click="previousCircle()" class="fa-solid fa-angle-left my-auto"></i>
        <p>{{ this.circles[this.activeCircle].headline }}</p>
        <i @click="nextCircle()" class="fa-solid fa-angle-right my-auto"></i>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div class="col-span-1 flex justify-center my-auto">
        <div class="circle focused-circle">
          <div class="content">
            <p>{{ this.circles[this.activeCircle].firstLine }}</p>
            <p>{{ this.circles[this.activeCircle].secondLine }}</p>
            <p>{{ this.circles[this.activeCircle].thirdLine }}</p>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ContentContainer from "./ContentContainer.vue";

export default {
  name: "TabModel",
  components: {ContentContainer},
  data(){
    return{
      activeCircle: 'meal',
      circles: {
        'meal':{headline:'Deine Eingaben: Mahlzeiten', firstLine: 'Mahlzeit', secondLine: '40g KH', thirdLine: '', next: 'data', previous: 'adjustBasal'},
        'data':{headline:'Deine Eingaben: Physiologische Daten', firstLine: 'Physiolog.', secondLine: 'Daten', thirdLine:'', next: 'calcInsulin', previous: 'meal'},
        'calcInsulin':{headline:'Berechnungen: Berechnung Insulindosierung', firstLine: 'Berechnung', secondLine: 'Insulin-', thirdLine:'dosierung', next: 'calcGlucose', previous: 'data'},
        'calcGlucose':{headline:'Berechnungen: Berechnung Blutzucker', firstLine: 'Berechnung', secondLine: 'Blutzucker', thirdLine:'', next: 'injectInsulin', previous: 'calcInsulin'},
        'injectInsulin':{headline:'Anpassungen: Spritzen der Insulindosis', firstLine: 'Spritzen', secondLine: 'der Insulin-', thirdLine:'dosis', next: 'checkGlucose', previous: 'calcGlucose'},
        'checkGlucose':{headline:'Anpassungen: Überprüfung des Blutzuckers', firstLine: 'Überprüfung', secondLine: 'des Blut-', thirdLine:'zuckers', next: 'adjustBasal', previous: 'injectInsulin'},
        'adjustBasal':{headline:'Anpassungen: Anpassung der Basalrate', firstLine: 'Anpassung', secondLine: 'der Basal-', thirdLine:'rate', next: 'meal', previous: 'checkGlucose'}
      },
    }
  },
  methods:{
    toggleCircle(circleRef){
      this.$refs[this.activeCircle].classList.remove('focused-circle');
      this.$refs[circleRef].classList.add('focused-circle');
      this.activeCircle = circleRef;
    },
    nextCircle(){
      this.$refs[this.activeCircle].classList.remove('focused-circle');
      this.activeCircle = this.circles[this.activeCircle].next;
      this.toggleCircle(this.activeCircle);
    },
    previousCircle(){
      this.$refs[this.activeCircle].classList.remove('focused-circle');
      this.activeCircle = this.circles[this.activeCircle].previous;
      this.toggleCircle(this.activeCircle);
    }
  }
}
</script>

<style scoped>
  .model-row {
    background-color: var(--blue-light);
    @apply grid grid-cols-model rounded-lg;
  }
  .circle-container {
    @apply flex justify-center my-auto;
  }
  .circle {
    background-color: var(--blue-medium);
    @apply rounded-full md:h-28 md:w-28 h-24 w-24 text-center flex my-2;
  }
  .circle .content {
    @apply my-auto mx-auto;
  }
  .focused-circle {
    border: solid;
    border-color: #6F829E;
  }
</style>