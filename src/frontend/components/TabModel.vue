<template>
  <ContentContainer>
    <h1>Modell</h1>
    <div class="model-row">
      <h1>Deine Eingaben</h1>
      <div class="col-start-1"></div>
      <div class="circle-container col-start-2">
        <div class="circle focused-circle">
          <div class="content">
            <p>Mahlzeit</p>
            <p>40g KH</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <div class="circle">
          <div class="content">
            <p>Physiolog.</p>
            <p>Daten</p>
          </div>
        </div>
      </div>
    </div>
    <div class="model-row mt-8">
      <h1>Berechnungen</h1>
      <div class="circle-container col-start-1">
        <div class="circle">
          <div class="content">
            <p>Berechnung</p>
            <p>Insulin-</p>
            <p>dosierung</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <div class="circle">
          <div class="content">
            <p>Berechnung</p>
            <p>Blutzucker</p>
          </div>
        </div>
      </div>
    </div>
    <div class="model-row mt-8">
      <h1>Anpassungen</h1>
      <div class="circle-container col-start-1">
        <div class="circle">
          <div class="content">
            <p>Spritzen</p>
            <p>der Insulin-</p>
            <p>dosis</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <div class="circle">
          <div class="content">
            <p>Überprüfung</p>
            <p>des Blutzuckers</p>
          </div>
        </div>
      </div>
      <div class="circle-container">
        <div class="circle">
          <div class="content">
            <p>Anpassung</p>
            <p>der Basal-</p>
            <p>rate</p>
          </div>
        </div>
      </div>
    </div>
  </ContentContainer>

  <div>
    <div style="background-color: var(--blue-primary);" class="w-full text-center text-white py-2">
      <div class="grid grid-cols-3">
        <i class="fa-solid fa-angle-left my-auto"></i>
        <p>Deine Eingaben: Mahlzeiten</p>
        <i class="fa-solid fa-angle-right my-auto"></i>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div class="col-span-1 flex justify-center my-auto">
        <div class="circle focused-circle">
          <div class="content">
            <p>Mahlzeit</p>
            <p>40g KH</p>
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
  components: {ContentContainer}
}
</script>

<style scoped>
  .model-row {
    background-color: var(--blue-light);
    @apply grid grid-cols-3 rounded-lg;
  }
  .circle-container {
    @apply flex justify-center my-auto;
  }
  .circle {
    background-color: var(--blue-medium);
    @apply rounded-full h-28 w-28 text-center flex my-2;
  }
  .circle .content {
    @apply my-auto mx-auto;
  }
  .focused-circle {
    border: solid;
    border-color: #6F829E;
  }
</style>