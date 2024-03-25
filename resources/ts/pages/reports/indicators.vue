<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const isOptionShow = ref(true)
const baranggayList = [
'Alitao',
'Alupay',
'Angeles Zone I (Pob.)',
'Angeles Zone II',
'Angeles Zone III',
'Angeles Zone IV',
'Angustias Zone I (Pob.)',
'Angustias Zone II',
'Angustias Zone III,',
'Angustias Zone IV',
'Anos',
'Ayaas',
'Baguio',
'Banilad',
'Calantas',
'Camaysa',
'Dapdap',
'Gibanga',
'Alsam Ibaba',
'Bukal Ibaba',
'Ilasan Ibaba',
'Nangka Ibaba',
'Palale Ibaba',
'Ibas',
'Alsam Ilaya',
'Bukal Ilaya',
'Ilasan Ilaya',
'Nangka Ilaya',
'Palale Ilaya',
'Ipilan',
'Isabang',
'Calumpang',
'Domoit Kanluran',
'Katigan Kanluran',
'Palale Kanluran',
'Lakawan',
'Lalo',
'Lawigue',
'Lita (Pob.)',
'Malaoa',
'Masin',
'Mate',
'Mateuna',
'Mayowe',
'Opias',
'Pandakaki',
'Pook',
'Potol',
'San Diego Zone I (Pob.)',
'San Diego Zone II',
'San Diego Zone III',
'San Diego Zone IV',
'San Isidro Zone I (Pob.)',
'San Isidro Zone II',
'San Isidro Zone III',
'San Isidro Zone IV',
'San Roque Zone I (Pob.)',
'San Roque Zone II',
'Domoit Silangan',
'Katigan Silangan',
'Palale Silangan',
'Talolong',
'Tamlong',
'Tongko',
'Valencia',
'Wakas'
]

const indicators = ref()

const settings = ref({
  barangay: [],
  indicator: undefined
})

const results = ref([])

const fetchIndicators = async () => {
  try {
    const response = await axiosIns.get('api/lookup');
    indicators.value = response.data.map((item:any) => ({
      lookup_name: `[${item.column_number}] ${item.lookup_name}`,
      id: item.id
    }));
  } catch (e) {
    console.error(e);
  }
};

const generate = async () => {

  try{
    const data = {
      barangays: settings.value.barangay,
      indicator: settings.value.indicator.id
    }
    const response = await axiosIns .post('/api/indicator/count', data)
    results.value.push(response.data)
  }catch(e){
    console.log(e)
  }
  isOptionShow.value = false
}

const convertResultsToCSV = (data) => {
  let csvContent = "";

  csvContent += "Code,Description," + data.barangays.join(",") + ",Total\r\n";

  data.content.forEach((item) => {
    const rowTotal = item.count.reduce((sum, value) => sum + value, 0);
    const row = [
      item.code,
      item.description,
      ...item.count,
      rowTotal
    ].join(",");
    
    csvContent += row + "\r\n";
  });

  return csvContent;
};

const downloadCSV = (csvString, fileName) => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadTableAsCSV = (content) => {
  // Use the first item in results.value for CSV generation (as an example)
  // In practice, you might need to adjust this to handle multiple results or a selected result
  const csvString = convertResultsToCSV(content);
  downloadCSV(csvString, 'export.csv');
};

onMounted(() => {
  fetchIndicators()
})
</script>

<template>
  <div>
    <VCard class="mb-5">
      <VCardTitle class="mt-2 ms-1">
        Generate Reports on the counts of a certain Indicators
      </VCardTitle>
      <VCardText>
        This module allows you to generate a report that display the count of a certain indicator in selected barangay/s. For Example, you want to generate the count of Sex in Alitao, just select the barangay (can be multiple select) and the indicators you want. Also, you can generate as many reports as you want on. The reports will appear below. Each report can be downloaded in CSV format.
      </VCardText>
    </VCard>
    <!-- Report Options -->
    <VCard>
      <VCardTitle 
        class="d-flex justify-space-between align-center" 
        @click="isOptionShow =! isOptionShow"
        style="cursor: pointer;"
      >
        <h6 class="text-h6">Report Options</h6>
        
        <VBtn 
          :icon="isOptionShow ? 'mdi-chevron-up':'mdi-chevron-down' " 
          variant="text"
        />
      </VCardTitle>
      <VExpandTransition>
        <div v-show="isOptionShow">
          <div class="d-flex flex-column justify-end">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  
                  <VCombobox
                    label="Select Barangay" 
                    :items="baranggayList"
                    v-model="settings.barangay"
                    multiple
                    chips
                    clearable
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VCombobox
                    label="Select Indicator" 
                    :items="indicators"
                    item-title="lookup_name"
                    item-value="id"
                    v-model="settings.indicator"
                    clearable
                  />
                </VCol>
              </VRow>
            </VCardText>
            <VCardAction class="ms-auto">
              <div style="display: inline;">
                <VBtn
                  class="ma-2"
                  variant="outlined"
                  @click="() => {
                    settings.barangay.length !== baranggayList.length ? settings.barangay = baranggayList : settings.barangay = []
                  }"
                >
                  {{settings.barangay.length !== baranggayList.length ? 'Select' : "Deselect"}} All Brgy
                </VBtn>
                <VBtn
                  class="ma-2"
                  variant="outlined"
                  :disabled="!(results.length > 0)"
                  @click="results = []"
                >
                  Reset
                </VBtn>
                <VBtn 
                  class="ma-2"
                  @click="generate"
                  :disabled="!(settings.barangay && settings.indicator)"
                >
                  Add Report
                </VBtn>
              </div>
              
            </VCardAction>
          </div>
        </div>
      </VExpandTransition>
    </VCard>
    
    <!-- Report -->
    <VCard 
      class="mt-5"
      v-for="(result, index) in results"
    >
      <VCardTitle class="d-flex justify-space-between align-center pt-3">
        <div style="overflow-x: scroll; scrollbar-width: none;">
          <h6 class="text-h6">
          Count of {{result.indicator }} for Brgy/s {{result.barangays.join(', ')}}
        </h6>
        </div>
        
        <div>
          <VBtn 
            @click="downloadTableAsCSV(result)" 
            icon="mdi-download"
            variant="text"
          />
          <VBtn 
            icon="mdi-trash-can-outline" 
            variant="text"
            @click="results.splice(index, 1)"
          />
        </div>
        
      </VCardTitle>
      <VCardText>
          <h6 class="text-body-1">
            <b></b> 
          </h6>
          <VTable>
            <thead>
              <tr>
                <th>
                  [Code] Description
                </th>
                <th v-for="brgy in result.barangays">
                  {{ brgy }}
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="content in result.content">
                <td>
                <b>[{{content.code}}] {{content.description}}</b>
                </td>
                <td v-for="value in content.count">
                  {{ value }}
                </td>
                <td>
                  <b>{{ content.count.reduce((acc, val) => acc + val, 0) }}</b>
                </td>
              </tr>
            </tbody>
          </VTable>
        
      </VCardText>
    </VCard>
  </div>
  
</template>
