<script setup lang="ts">
import { getPolarChartConfig } from '@core/libs/chartjs/chartjsConfig';
import PolarAreaChart from '@core/libs/chartjs/components/PolarAreaChart';
import { useTheme } from 'vuetify';

const colors = {
  yellow: '#ffe802',
  primary: '#836af9',
  polarChartGrey: '#4f5d70',
  polarChartInfo: '#299aff',
  polarChartGreen: '#28dac6',
  polarChartWarning: '#ff8131',
}
const props = defineProps([
  'labels',
  'data'
])

const vuetifyTheme = useTheme()

const chartConfig = computed(() => getPolarChartConfig(vuetifyTheme.current.value))

const data = {
  labels: props.labels,
  datasets: [
    {
      borderWidth: 0,
      label: 'Population',
      data: props.data,
      backgroundColor: [colors.primary, colors.yellow, colors.polarChartWarning, colors.polarChartInfo, colors.polarChartGrey, colors.polarChartGreen],
    },
  ],
}

</script>

<template>
  <PolarAreaChart
    :height="400"
    :chart-data="data"
    :chart-options="chartConfig"
  />
</template>
