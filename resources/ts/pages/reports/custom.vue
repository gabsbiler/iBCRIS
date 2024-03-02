<script setup lang="ts">
import SnackBar from '@/components/SnackBar.vue';
import axiosIns from '@/plugins/axios';


const isShow = ref(true)
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
const SnackBarRef = ref(null)

const ageFrom = ref()
const ageTo = ref()

const data = ref()

const settings = ref({
  barangay: '',
  dateFrom: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) ,
  dateTo: new Date(),
  selectedLookup: [],
  selectedIndicators: [],
  ageRange: [
    {
      from: 0,
      to: 5
    },
    {
      from: 6,
      to: 10
    },
    {
      from: 11,
      to: 15
    },
    {
      from: 16,
      to: 20
    },
    {
      from: 21,
      to: 25
    },
    {
      from: 26,
      to: 30
    },
    {
      from: 31,
      to: 35
    },
    {
      from: 36,
      to: 40
    },
  ]
})

const lookups = ref([])
const selectedLookupList = ref([])


const fetchData = async () =>  {
  try {
    const response = await axiosIns.get('/api/lookup')
    lookups.value = response.data
    // console.log(response.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const updateSelectedLookup = (selectedValue) => {
  settings.value.selectedLookup = selectedValue
  selectedLookupList.value = selectedValue.lookup_list;
  settings.value.selectedIndicators = []
};

onMounted(() => {
  fetchData(); 
});


const generateReport = async () => {
  try{
    const response = await axiosIns.get('/api/report/custom', {
      params: settings.value
    })
    console.log(response.data)
    data.value = response.data

    isShow.value=false
    SnackBarRef.value.show('success', 'Generate Finished')
  }catch(e){
    SnackBarRef.value.show('error', 'Please contact you administrator')
    console.log(e)
  }
}
</script>

<template>
  <div>
    <!-- Filter -->
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center" @click="isShow = !isShow">
        <h6 class="text-h6">
          Filter
        </h6>
        <VBtn
          variant="text" 
          :icon="isShow ? 'mdi-chevron-up': 'mdi-chevron-down'"
        />
      </VCardTitle>
      <VExpandTransition>
        <VCardText v-if="isShow" class="d-flex flex-column gap-y-3">

          <!-- Baranggay -->
          <div>
            <VLabel class="mb-3">
              Select Barangay
            </VLabel>
            <VRow>
              <VCol>
                <VCombobox 
                v-model="settings.barangay"
                :items="baranggayList"
                clearable
                />
              </VCol>
            </VRow>
          </div>

          <!-- Date Range -->
          <div>
            <VLabel class="mb-3">
              Date Range:
            </VLabel>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  label="Date From"
                  v-model="settings.dateFrom"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="settings.dateTo"
                  label="Date To"
                />
              </VCol>
            </VRow>
          </div>

          <!-- Lookup/Indicator -->
          <div>
            <VRow>
              <VCol cols="12" md="6">
                <VLabel class="mb-3" >
                  Select Lookup
                </VLabel>
                <VRow>
                  <VCol>
                    <VCombobox 
                      :items="lookups"
                      item-title="lookup_name"
                      @update:model-value="updateSelectedLookup"
                    />
                  </VCol>
                </VRow>
                
              </VCol>
              <VCol>
                <VLabel class="mb-3">
                  Select Indicators
                </VLabel>
                <VCombobox 
                  v-model="settings.selectedIndicators"
                  :items="selectedLookupList"
                  item-title="description"
                  item-value="lookup_key"
                  :disabled="!(selectedLookupList.length > 0)"
                  multiple
                  chips
                  clearable
                />
              </VCol>
            </VRow>
          </div>

          <!-- Age Picker -->
          <div>
            <VLabel class="mb-3">
              Select Age:
            </VLabel>
            <VRow>
              <VCol>
                <VTextField label="From" v-model="ageFrom" type="number"/>
              </VCol>
              <VCol class="d-flex flex-row align-center gap-x-4">
                <VTextField label="To" v-model="ageTo" type="number"/>
                <VBtn 
                  icon="mdi-plus" 
                  @click="addAndSortByFrom(ageFrom, ageTo)" 
                  :disabled="!(ageFrom > 0 && ageTo > 0)"
                />
                
              </VCol>
            </VRow>
            <div class="gap-x-2 mt-2" >
              <VChip color="primary" v-for="(value, key) in settings.ageRange" class="mx-1 mt-2">
                <VText>
                  {{ value.from }} - {{ value.to }}
                </VText> 
                <Button class="d-flex align-center ms-1" @click="removeElementArray(key)">
                  <VIcon icon="mdi-close" style="font-size: 0.9rem !important;"/>
                </Button>
              </VChip>
            </div>
          </div>

          <div class="d-flex justify-end">
            <VBtn :disabled="!(settings.barangay && settings.selectedIndicators.length > 0)" @click="generateReport">
              Generate
            </VBtn>
          </div>
        </VCardText>
      </VExpandTransition>
    </VCard>

    <VCard class="mt-5" v-if="data">
      <VCardTitle class="d-flex justify-space-between mt-2 mx-1 align-center">
        <h6 class="text-h6">{{ settings.selectedLookup.lookup_name }}</h6>
        <VBtn variant="outlined">
          Export
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VTable>
          <thead>
            <tr>
              <th>
                Age Range
              </th>
              <th v-for="indicator in settings.selectedIndicators" :key="indicator">
                {{ indicator.description }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in data">
              <td>
                {{i.ageRange}}
              </td>
              <td v-for="k in i.result">
                {{ k.count }}
              </td>
            </tr>
          </tbody>
        </VTable>
        
      </VCardText>
    </VCard>

    <SnackBar ref="SnackBarRef"></SnackBar>
  </div>
</template>
