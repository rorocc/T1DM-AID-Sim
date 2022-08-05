<template>
	<div style="position: relative; height:40vh;" class="mb-16">
		<canvas id="canvas_curves_insulin"></canvas>
	</div>

</template>


<script>
/* 	This file is part of LoopInsighT1, an open source tool to
   	simulate closed-loop glycemic control in type 1 diabetes.
   	Distributed under the MIT software license.
	See https://lt1.org for further information.	*/

import Chart from 'chart.js/auto';
import colors from '../Colors.js';
import 'chartjs-adapter-moment';

let chartInsulinCarbs;

export default {
	name: "ChartInsulinCurve",
	data() {
		return {
			currentDatasetID: 1,
			controllerOutput: [],
		}
	},
	methods: {
	  createDataset(){
        chartInsulinCarbs.data.datasets = [];
        
		chartInsulinCarbs.data.datasets.push({
          	type: "scatter", 
			label: this.$t("ibolus"), 
			backgroundColor: colors['THUTeal'], 
			radius: 10, 
			pointStyle: "circle", 
			rotation: 180,
		    data: [],},
			{
			type: "line", 
		    yAxisID: 'y', 
			label: this.$t("iir"), 
			borderColor: colors['THULightBlue'], 
			spanGaps: true, 
			stepped: "before",
			data: [],},
			/*{
			type: "scatter", 
			yAxisID: 'y', 
			label: this.$t("iob"), 
			borderColor: colors['THUGreen'], 
			backgroundColor: colors['THUGreen'], 
			radius: 2, 
			pointStyle: "circle",
			data: [],},*/
		  {
			type: "scatter", 
			yAxisID: 'yG', 
			label: this.$t("totalmeal"), 
			backgroundColor: colors['THULightGray'], 
			radius: 10, pointStyle: "circle",
			data: [],},
		  /*{	
			type: "line", 
			yAxisID: 'yG', 
			label: this.$t("carbspermin"), 
			borderColor: colors['THUDarkBlue'], 
			stepped: "before",
			data: [],}, */
	  	);
       
	    let simResults = JSON.parse(JSON.stringify(this.$store.getters.results))
     
	    for (const result of simResults) {
          const {t, x, u, y, logData} = result

		  if (u.ibolus > 0) {
		  chartInsulinCarbs.data.datasets[0].data
              .push({x:t, y:u.ibolus});
		  }
			chartInsulinCarbs.data.datasets[1].data.push({x: t, y: u.iir});

		  /* if (typeof log !== "undefined") {
			chartInsulinCarbs.data.datasets[2].data.push({x:t, y: logData.IOB});
		  }*/
		  chartInsulinCarbs.data.datasets[2].data.push({x:t, y: u.meal});
		  // chartInsulinCarbs.data.datasets[4].data.push({x:t, y: u.carbs});
		}
        chartInsulinCarbs.update();
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
	
	const ctx = document.getElementById("canvas_curves_insulin");

	chartInsulinCarbs = new Chart(ctx, {
      data: {
	    /* datasets: [
		  {
			type: "line", 
		    yAxisID: 'y', 
			label: this.$t("iir"), 
			borderColor: colors['THURed'], 
			spanGaps: true, 
			stepped: "before",},
		  {
			type: "scatter", 
			yAxisID: 'y', 
			label: this.$t("ibolus"), 
			backgroundColor: colors['THURed'], 
			borderColor: colors['THUAnthrazit'], 
			radius: 10, 
			pointStyle: "triangle", 
			rotation: 180},
		  {
			type: "scatter", 
			yAxisID: 'y', 
			label: this.$t("iob"), 
			borderColor: colors['THUGreen'], 
			backgroundColor: colors['THUGreen'], 
			radius: 2, 
			pointStyle: "circle"},
		  {
			type: "scatter", 
			yAxisID: 'yG', 
			label: this.$t("totalmeal"), 
			borderColor: colors['THUAnthrazit'], 
			backgroundColor: colors['THUDarkBlue'], 
			radius: 10, pointStyle: "triangle"},
		  {	
			type: "line", 
			yAxisID: 'yG', 
			label: this.$t("carbspermin"), 
			borderColor: colors['THUDarkBlue'], 
			stepped: "before"},
		], */
	  },
	  options: {
		maintainAspectRatio: false,
	    scales: {
		  x: {
		    type: "time",
			offset: false,
			time: {unit: 'hour'},
		  },
		  y: {
			title: {display: true, text: "U, U/h"},
			min: 0, 
			ticks: {stepSize: 1},
			suggestedMax: 10, 
		  },
		  yG: {
			title: {display: true, text: "g, g/min"}, 
			position: 'right',
			min: 0,
			suggestedMax: 30,
			ticks: {stepSize: 10},
			grid: { drawOnChartArea: true},
		  },
		},
		plugins: {
		  legend: {
			position: 'bottom',
			align: 'start',
			labels:{
				usePointStyle: true,
			}
		  },
		  tooltip: {
		    callbacks: {
			  afterBody: (context) => {
			    let t0 = context[0].parsed.x;
				let output = this.controllerOutput[t0];
				this.$emit("selectLog", t0, output);
			  },
			},
		  },
		},
	},
    });
	this.createDataset();
  },	
}

</script>

<i18n locale="en">
{
	"title":		"Insulin dosage and carb intake",
	"iir":			"Basalrate (U/h)",
	"ibolus":		"Bolus (U)",
	"iob":			"calculated IOB in U",
	"totalmeal":	"Mahlzeiten (Kh)",
	"carbspermin":	"intake in g/min",
}
</i18n>
<i18n locale="de">
{
	"title": 		"Insulindosierung und Mahlzeiten",
	"iir":			"Basalrate (U/h)",
	"ibolus":		"Bolus (U)",
	"iob":			"Berechnetes IOB in U",
	"totalmeal":	"Mahlzeiten (Kh)",
	"carbspermin":	"Aufnahme in g/min",
}
</i18n>
