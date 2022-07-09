<template>
  <canvas id="canvas_curves"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

let chartGlucose;

// glucose color
function glucoseColor(ctx) {
  if (ctx.p0.parsed.y < 54 || ctx.p1.parsed.y < 54)
    return 'rgb(140,25,22,1)';	// very low
  if (ctx.p0.parsed.y < 70 || ctx.p1.parsed.y < 70)
    return 'rgb(194,1,18,1)';	// low
  if (ctx.p0.parsed.y > 250 || ctx.p1.parsed.y > 250)
    return 'rgb(233,181,17,1)';	// very high
  if (ctx.p0.parsed.y > 180 || ctx.p1.parsed.y > 180)
    return 'rgb(250,234,0,1)';	// high
  return 'rgb(120,176,89,1)';		// target
}


export default {
  name: "ChartCurve",
  data() {
    return {
      currentDatasetID: 1,
      preserveOldCurves: false
    }
  },
  methods:{
    createDataset(){
      chartGlucose.data.datasets = [];

      chartGlucose.data.datasets.push({
        type: "line",
        label: "Gl",
        tension: 0.5,
        data: [],
        segment: {
          borderColor: ctx => glucoseColor(ctx),
        },
      });

      let simResults = JSON.parse(JSON.stringify(this.$store.getters.results))

      for (const result of simResults) {
        console.log("counter", result.x)
        const {t, x, u, y, logData} = result
        chartGlucose.data.datasets[0].data
            .push({x:t.valueOf(), y:y.G});
      }




      chartGlucose.update();
    }
  },
  computed: {
    results(){
      return this.$store.getters.results;
    }
  },
  watch:{
    results (newResults, oldResults){
      console.log("UPDATE RESULTS")
      this.createDataset();
    }
  },
  mounted() {

    const ctx = document.getElementById('canvas_curves');

    chartGlucose = new Chart(ctx, {
      data: {
        datasets: [
          {
            type: "line",
            label: this.$t("prediction"),
            data: [{x:20, y:80},{x:100, y:130},{x:140, y:200}],
            borderColor: 'rgb(0,0,0,1)',
            borderWidth: 1,
            segment: {
              borderColor: ctx => glucoseColor(ctx),
            },
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            offset: false,
            time: {unit: 'hour'},
          },
          y: {
            type: "linear",
            title: {display: false, text: "mg/dl"},
            ticks: {stepSize: 20},
            min: 40,
            suggestedMax: 200,
          },
        },
        plugins: {
          legend: {display: false},
        },
      },
    });

    this.createDataset();
  }
}
</script>

<style scoped>

</style>