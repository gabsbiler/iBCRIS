<script setup lang="ts">
import { getHorizontalBarChartConfig } from '@core/libs/chartjs/chartjsConfig';
import BarChart from '@core/libs/chartjs/components/BarChart';
import { useTheme } from 'vuetify';

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
      label: 'Single',
      backgroundColor: colors.warningShade,
      borderColor: 'transparent',
      data: chartContent.data1,
    },
    {
      maxBarThickness: 15,
      backgroundColor: colors.horizontalBarInfo,
      label: 'Married',
      borderColor: 'transparent',
      data: chartContent.data2,
    },
  ],
}

function transformData(input) {
    const labels = [];
    const data1 = []; // for male values
    const data2 = []; 

    input.forEach(item => {
        labels.push(`${item.age.from}-${item.age.to}`);
        data1.push(item.single);
        data2.push(item.married);
    });

    return {
        labels,
        data1,
        data2,
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
