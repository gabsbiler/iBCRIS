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

const series = ref([
  { 
    labels: [],
    data: [] 
  }
])

const getBarChartConfig = (themeColors: ThemeInstance['themes']['value']['colors']) => {
  const { themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: true,
        startingShape: 'rounded',
      },
    },
    grid: {
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: false },
      },
      padding: {
        top: -10,
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
      categories: series.value[0].labels,
      labels: {
        style: { colors: themeDisabledTextColor },
      },
    },
  }
}

const vuetifyTheme = useTheme()

const horizontalBarChartConfig = computed(() => getBarChartConfig(vuetifyTheme.current.value))


const fetchData = async () => {
  try{  
    const response = await axiosIns.get('/api/dashboard/member/count/11')
    // Convert the object into an array of [key, value] pairs and sort
    const sortedArray = Object.entries(response.data).sort((a, b) => b[1] - a[1]);
    console.log(sortedArray)
    // Select only the top 7 entries
    const top7 = sortedArray.slice(0, 7);

    // Optionally, convert the top 7 back into an object
    const top7Data = top7.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    // console.log(top7Data)
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
        Highest Grade/Year Completed
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
        v-if="series[0].labels"
        type="bar"
        height="400"
        :options="horizontalBarChartConfig"
        :series="series"
      />
    </VCardText>
  </VCard>
  
</template>
