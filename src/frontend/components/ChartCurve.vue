<template>
  <canvas id="canvas_curves"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import { defaults } from 'chart.js'
import colors from '../Colors.js';
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
      /*{type: "scatter", 
        yAxisID: 'yG', 
        label: this.$t("totalmeal"), 
        backgroundColor: colors['THULightGray'], 
        radius: 10, pointStyle: "circle",
        data: [],
      },
      // Anmerkung: Die Farbe geht aus irgendwelchen Gründen verloren
      {type: "scatter", 
        yAxisID: 'yB', 
        label: this.$t("ibolus"), 
        backgroundColor: colors['THUTeal'], 
        radius: 10, 
        pointStyle: "circle", 
        rotation: 180,
          data: [],
      },
      );*/

      let simResults = JSON.parse(JSON.stringify(this.$store.getters.results))

      for (const result of simResults) {
        const {t, x, u, y, logData} = result
        chartGlucose.data.datasets[0].data
          .push({x:t.valueOf(), y:y.G});
      	/*	  
        if (u.ibolus > 0) {
        chartGlucose.data.datasets[1].data
          .push({x:t, y:u.ibolus});
        }
        
        chartGlucose.data.datasets[1].data.push({x:t, y: u.meal}); */
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
          /* yG: {
            title: {display: true, text: "g, g/min"}, 
            position: 'right',
            min: 0,
            suggestedMax: 30,
            ticks: {stepSize: 10},
            grid: { drawOnChartArea: true},
            },
          // Anmerkung: yB sorgt für die zweite Legende links. Bin nicht sicher, ob die angezeigt werden soll, aber irgendwo müsste sie dann ja hin
          yB: {
            title: {display: true, text: "U, U/h"},
            min: 0, 
            ticks: {stepSize: 1},
            suggestedMax: 10, 
          }, */
        },
        plugins: {
          legend: {display: false},
        },
      },
    });

    this.createDataset();
  },
  beforeMount() {
    defaults.elements.point.pointStyle = 'line'
		defaults.elements.point.radius = 0
		
  }
}
</script>

<style scoped>

</style>