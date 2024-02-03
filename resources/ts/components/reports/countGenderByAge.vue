<script setup lang="ts">
import { useTheme } from 'vuetify'
import type { ChartJsCustomColors } from '@/views/charts/chartjs/types'
import { getHorizontalBarChartConfig } from '@core/libs/chartjs/chartjsConfig'
import BarChart from '@core/libs/chartjs/components/BarChart'

const colors = {
  polarChartInfo: '#299aff',
  horizontalBarInfo: '#26c6da',
  warningShade: '#ffbd1f',
}

const props = defineProps(['data'])

const vuetifyTheme = useTheme()

const chartOptions = computed(() => getHorizontalBarChartConfig(vuetifyTheme.current.value))

const chartContent = {...transformData(props.data)}

const data = {
  labels: chartContent.labels,
  datasets: [
    {
      maxBarThickness: 15,
      label: 'Male',
      backgroundColor: colors.warningShade,
      borderColor: 'transparent',
      data: chartContent.data1,
    },
    {
      maxBarThickness: 15,
      backgroundColor: colors.horizontalBarInfo,
      label: 'Female',
      borderColor: 'transparent',
      data: chartContent.data2,
    },
    {
      maxBarThickness: 15,
      backgroundColor: colors.polarChartInfo,
      label: 'Unknown',
      borderColor: 'transparent',
      data: chartContent.data3,
    },
  ],
}

function transformData(input) {
    const labels = [];
    const data1 = []; // for male values
    const data2 = []; // for female values
    const data3 = []; // for unknown values

    input.forEach(item => {
        labels.push(`${item.age.from}-${item.age.to}`);
        data1.push(item.male);
        data2.push(item.female);
        data3.push(item.unknown);
    });

    return {
        labels,
        data1,
        data2,
        data3
    };
}

</script>

<template>
  <BarChart
   v-if="chartContent"
    height="375"
    :chart-data="data"
    :chart-options="chartOptions"
  />
</template>
