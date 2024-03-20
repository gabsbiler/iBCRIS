<script lang="ts" setup>
import axiosIns from '@/plugins/axios';
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from "vue3-apexcharts";
import type { ThemeInstance } from 'vuetify';
import { useTheme } from 'vuetify';

const colorVariables = (themeColors: ThemeInstance['themes']['value']['colors']) => {
  const themeSecondaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['medium-emphasis-opacity']})`
  const themeDisabledTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['disabled-opacity']})`
  const themeBorderColor = `rgba(${hexToRgb(String(themeColors.variables['border-color']))},${themeColors.variables['border-opacity']})`
  const themePrimaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['high-emphasis-opacity']})`

  return { themeSecondaryTextColor, themeDisabledTextColor, themeBorderColor, themePrimaryTextColor }
}

const getLineChartSimpleConfig = (themeColors: ThemeInstance['themes']['value']['colors']) => {
  const { themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff'],
    },
    grid: {
      padding: { top: -10 },

      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      custom(data: any) {
        return `<div class='bar-chart pa-2'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor },
      },
    },
    xaxis: {
      axisBorder: { show: false },

      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor },
      },
      categories: series.value[0].labels,
    },
  }
}
const vuetifyTheme = useTheme()

const balanceChartConfig = computed(() => getLineChartSimpleConfig(vuetifyTheme.current.value))

const series = ref([
  { 
    labels: ['Religion', 'Religion','Religion', 'Religion', 'Religion', 'Religion', 'Religion', 'Religion', 'Religion', 'Religion', 'Religion', 'Religion', 'Religion' ,'Religion', 'Religion'],
    data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 15],
  },
])

const fetchData = async () => {
  try{  
    const response = await axiosIns.get('/api/dashboard/member/count/9')
    // Convert the object into an array of [key, value] pairs and sort
    const sortedArray = Object.entries(response.data).sort((a, b) => b[1] - a[1]);

    // Select only the top 7 entries
    const top7 = sortedArray.slice(0, 7);

    // Optionally, convert the top 7 back into an object
    const top7Data = top7.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    series.value[0].labels = Object.keys(top7Data)
    series.value[0].data = Object.values(top7Data)

  }catch(e){
    console.log(e)
  }
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <VCard>
    <VCardTitle>
      <h6 class="text-h6">
        Religion/Religious Affiliation
      </h6>
      <div class="d-flex gap-x-3">
        <div>
          <p class="text-body-2">
            Highest Count | {{series[0].labels[0]}}: <b>{{ series[0].data[0] }}</b>
          </p>
        </div>
      </div>
    </VCardTitle>
    <VCardText>
      <VueApexCharts
        type="bar"
        height="400"
        :options="balanceChartConfig"
        :series="series"
      />
    </VCardText>
  </VCard>
  
</template>
