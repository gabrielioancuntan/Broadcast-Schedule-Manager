<template>
  <div style="max-width: 400px; margin: auto;">
    <DoughnutChart
        :chart-data="chartData"
        :options="chartOptions"
    ></DoughnutChart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { DoughnutChart } from 'vue-chart-3'
import type { Chart, LegendItem } from 'chart.js';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

const props = defineProps<{
  data: Record<string, number>
}>()

const labels = computed(() => Object.keys(props.data))
const values = computed(() => Object.values(props.data))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Scheduled Hours',
      data: values.value,
      backgroundColor: ['#2A265F', '#F66', '#34495e', '#dbe4e2']
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        generateLabels(chart: Chart): LegendItem[] { //used to append hour and minutes near Label
          const data = chart.data;
          return data.labels?.map((label, i) => {
            const value = chart.data.datasets[0].data[i] as number;
            const h = Math.floor(value);
            const m = Math.round((value - h) * 60);

            return {
              text: `${label} (${h}h ${m}m)`,
              fillStyle: Array.isArray(chart.data.datasets[0].backgroundColor)
                  ? chart.data.datasets[0].backgroundColor[i]
                  : (chart.data.datasets[0].backgroundColor as string),
              strokeStyle: Array.isArray(chart.data.datasets[0].backgroundColor)
                  ? chart.data.datasets[0].backgroundColor[i]
                  : (chart.data.datasets[0].backgroundColor as string),

              index: i,
            };
          }) ?? [];
        }

      }
    },
    title: {
      display: true,
      text: 'Total Scheduled Time per Channel (Hours)',
      color: '#2A265F',
      font: { size: 16 }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const raw = context.raw;
          const hours = Math.floor(raw);
          const minutes = Math.round((raw - hours) * 60);
          return `${context.label}: ${hours}h ${minutes}m`;
        }
      }
    }
  }
}));

</script>

<style scoped>
.chart-container {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}

.channel-times {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.channel-times li {
  font-weight: 500;
  color: #2A265F;
  margin: 0.25rem 0;
}
</style>