<script lang="ts" setup>
import axiosIns from '@/plugins/axios';
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from "vue3-apexcharts";
import type { ThemeInstance } from 'vuetify';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()

const expenseRationChartConfig = computed(() => getDonutChartConfig(vuetifyTheme.current.value))

const series = ref([])
const labels = ref([])

const colorVariables = (themeColors: ThemeInstance['themes']['value']['colors']) => {
  const themeSecondaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['medium-emphasis-opacity']})`
  const themeDisabledTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['disabled-opacity']})`
  const themeBorderColor = `rgba(${hexToRgb(String(themeColors.variables['border-color']))},${themeColors.variables['border-opacity']})`
  const themePrimaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['high-emphasis-opacity']})`

  return { themeSecondaryTextColor, themeDisabledTextColor, themeBorderColor, themePrimaryTextColor }
}

const getDonutChartConfig = (themeColors: ThemeInstance['themes']['value']['colors']) => {
  const donutColors = {
    series1: '#fdd835',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#32baff',
    series5: '#ffa1a1',
  }

  const { themeSecondaryTextColor, themePrimaryTextColor } = colorVariables(themeColors)

  return {
    stroke: { width: 0 },
    labels: labels.value,
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`,
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: themeSecondaryTextColor },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.5rem',
            },
            value: {
              fontSize: '1.5rem',
              color: themeSecondaryTextColor,
              formatter: (val: string) => `${parseInt(val, 10)}`,
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Total Count',
              // formatter: () => '31%',
              color: themePrimaryTextColor,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem',
                  },
                  value: {
                    fontSize: '1rem',
                  },
                  total: {
                    fontSize: '1rem',
                  },
                },
              },
            },
          },
        },
      },
    ],
  }
}

const fetchData = async () => {
  try{  
    const response = await axiosIns.get('/api/dashboard/member/count/46')
    labels.value = Object.keys(response.data)
    series.value = Object.values(response.data)

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
          Solo Parent
        </h6>
        <div class="d-flex gap-x-3">
          <div v-for="(label, index) in labels">
            <p class="text-body-2">
              {{label}}: <b>{{ series[index] }}</b>
            </p>
          </div>
        </div>
      </VCardTitle>
      <VCardText>
        <VueApexCharts
          v-if="series.length > 0"
          type="donut"
          height="430"
          :options="expenseRationChartConfig"
          :series="series"
        />
      </VCardText>
    </VCard>
  
</template>
