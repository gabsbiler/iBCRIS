<script setup lang="ts">
import axiosIns from '@/plugins/axios';


const isSettingVisible = ref(true)
const generateLoading = ref(false)
const dateToday = new Date()
const ageFrom = ref()
const ageTo = ref()
const data = ref()
const settings = ref({
  dateFrom: dateToday,
  dateTo: dateToday,
  barangay: [],
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

const removeElementArray = (index) => {
  if(index >= 0 && index < settings.value.ageRange.length) {
    settings.value.ageRange.splice(index, 1);
  }
};

const addAndSortByFrom = (from, to) => {
  settings.value.ageRange.push({ from, to });
  settings.value.ageRange.sort((a, b) => a.from - b.from);
};

const clearData = () => {
  data.value = null
}

const generateReport = async() => {
  generateLoading.value = true
  try{
    const response = await axiosIns.get('/api/reports/generate', {
      params: settings.value
    })
    data.value = response.data
  }catch(error){
    console.log(error)
  }
  generateLoading.value = false
  isSettingVisible.value = false
}

</script>
<template>
  <div class="d-flex flex-column gap-y-5">
    
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center" @click="isSettingVisible = !isSettingVisible">
        <h6 class="text-h6">Settings</h6>
        <VBtn 
          :icon="isSettingVisible ? 'mdi-chevron-down' : 'mdi-chevron-up'"
          variant="text"
        />
      </VCardTitle>
      <VExpandTransition>
        <div v-show="isSettingVisible">
          <VDivider/>
          <VCardText>
            <VRow>
              <VCol>
                <VCombobox 
                  label="Selected Barangay" 
                  :items="baranggayList"
                  v-model="settings.barangay"
                  multiple
                  chips
                  clearable
                />
              </VCol>
            </VRow>
            <VDivider class="my-5"/>
            <VRow>
              <VCol cols="12" md="6">
                <VText>Pick a Date:</VText>
                <VRow class="mt-1">
                  <VCol cols="6">
                    <AppDateTimePicker 
                      label="From" 
                      v-model="settings.dateFrom"
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppDateTimePicker 
                      label="To" 
                      v-model="settings.dateTo"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VDivider vertical/>
              <VCol cols="12" md="6">
                <VText>Select Age:</VText>
                <VRow class="mt-1">
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
                <VRow>
                  <VCol class="gap-x-2" >
                    <VChip color="primary" v-for="(value, key) in settings.ageRange" class="mx-1 mt-2">
                      <VText>
                        {{ value.from }} - {{ value.to }}
                      </VText> 
                      <Button class="d-flex align-center ms-1" @click="removeElementArray(key)">
                        <VIcon icon="mdi-close" style="font-size: 0.9rem !important;"/>
                      </Button>
                    </VChip>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
            
            
            
            <VDivider class="my-5"/>
            <div class="d-flex justify-end">
              <VBtn variant="text" @click="clearData">
                Clear
              </VBtn>
              <VBtn variant="elevated" @click="generateReport" :loading="generateLoading">
                Generate
              </VBtn>
            </div>
            
          </VCardText>
        </div>
      </VExpandTransition>
    </VCard>


    <VRow v-if="data">
      <VCol cols="12" md="6">
        <TotalGenderCount :data="data"/>
      </VCol>

      <VCol cols="12" md="6">
        <GenderByAge :data="data"/>
      </VCol>

      <VCol cols="12">
        <VCard title="Martial By Age">
          <VCardText >
            <VTable>
              <thead>
                <th>Age</th>
                <th>Single</th>
                <th>Married</th>
                <th>Consensual</th>
                <th>Widow</th>
                <th>Divorced</th>
                <th>Common Law</th>
                <th>Unknown</th>
              </thead>
              <tbody>
                <tr v-for="item in data.countMaritalByAge">
                  <td>{{item.age.from}}-{{item.age.to}}</td>
                  <td>{{ item.status.single }}</td>
                  <td>{{ item.status.married }}</td>
                  <td>{{ item.status.consensual }}</td>
                  <td>{{ item.status.widow }}</td>
                  <td>{{ item.status.divorced }}</td>
                  <td>{{ item.status.commonLaw }}</td>
                  <td>{{ item.status.unknown }}</td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <MaleMarital :data="data"/>
      </VCol>

      <VCol cols="12" md="6">
        <FemaleMarital :data="data"/>
      </VCol>
    </VRow>


  </div>
</template>