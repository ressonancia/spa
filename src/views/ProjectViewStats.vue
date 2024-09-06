<template>
	<h2 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">Connections</h2>
	<div class="mt-10 h-[30vh] bg-white rounded-md p-10 shadow">
		<apexchart height="100%" width="100%" type="area" :options="options" :series="series"></apexchart>
	</div>
	<h2 class="mt-10 text-3xl tracking-tight text-gray-900 sm:text-4xl">Messages</h2>
	<div class="mt-10 h-[30vh] bg-white rounded-md p-10 shadow">
		<apexchart height="100%" width="100%" type="area" :options="options2" :series="series2"></apexchart>
	</div>
</template>

<script setup>

let options = {
	chart: {
		id: 'vuechart-example',
		toolbar: false,
	},
	xaxis: {
		categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		},
		labels: {
			show: false
		}
	},
	yaxis: {
		show: false
	},
	grid: {
		show: false
	},
	colors: ['#1F2937'],
	markers: false,
	stroke: {
          curve: 'straight',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.1,
            opacityTo: 0.8
          }
        },

}

let options2 = {
	chart: {
		id: 'vuechart-example2',
		toolbar: false,
	},
	xaxis: {
		categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		},
		labels: {
			show: false
		}
	},
	yaxis: {
		show: false
	},
	grid: {
		show: false
	},
	colors: ['#1F2937', '#9A3412'],
	markers: false,
	stroke: {
          curve: 'straight',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.1,
            opacityTo: 0.8
          }
        },

}

let series = [{
	name: 'Total Connections',
	data: [30, 40, 45, 50, 49, 60, 70, 91]
}]

let series2 = [{
	name: 'Sent',
	data: [30, 20, 35, 50, 5, 33, 90, 77]
},
{
	name: 'Received',
	data: [20, 15, 34, 43, 1, 32, 52, 72]
}]

</script>