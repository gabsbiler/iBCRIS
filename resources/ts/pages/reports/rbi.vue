<script setup lang="ts">
import SnackBar from '@/components/SnackBar.vue';
import axiosIns from '@/plugins/axios';
const isShow = ref(true)
const baranggayList = ref([])

const SnackBarRef = ref(null)
const ageFrom = ref()
const ageTo = ref()

const data = ref()

const settings = ref({
  barangay: [],
  dateFrom: new Date(),
  dateTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
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


const removeElementArray = (index: any) => {
  if(index >= 0 && index < settings.value.ageRange.length) {
    settings.value.ageRange.splice(index, 1);
  }
};

const addAndSortByFrom = (from:any, to:any) => {
  settings.value.ageRange.push({ from, to });
  settings.value.ageRange.sort((a, b) => a.from - b.from);
};

const generate = async () => {
  try{
    const response = await axiosIns.get('/api/get-rbi', {
      params: settings.value
    })

    data.value = response.data
    console.log(response.data)
    SnackBarRef.value.show('success', "Data Fetch Successful")
  }
  catch(e){
    SnackBarRef.value.show('error', e.response.data.message)
  }
}

const user = JSON.parse(localStorage.getItem('userData'))
const fetchBarangay = async () => {
  try {
    // Include search in the API call
    const response = await axiosIns.get('/api/barangays')
    baranggayList.value = response.data.map(item => item.barangay);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(()=> {
  if(user.role === 'admin'){
    fetchBarangay()
  }else{
    baranggayList.value  = [user.barangay]
  }
  
})
</script>

<template>
  <div>
    <VCard class="mb-5">
      <VCardTitle class="mt-2 ms-1">
        Generate Registry of Barangay Inhabitants (RBI)
      </VCardTitle>
      <VCardText>
        This module allows you to generate a formatted report of RBI per barangay. Just select the barangay you want to generate, the date range and the age range. The default age ranges are already defined there but you can still modify if needed.
      </VCardText>
    </VCard>
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
                  multiple
                  chips
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

            <!-- Age Picker -->
            <div class="mb-3">
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
              <VBtn @click="generate" :disabled="!(settings.barangay.length > 0)">
                Generate
              </VBtn>
            </div>
          </VCardText>
        </VExpandTransition>
    </VCard>

    <VCard class="mt-3" v-if="data">
      <VTable>
        <thead>
          <tr>
            <th>
              Barangay
            </th>
            <th>No. of Households</th>
            <th>Male Count</th>
            <th>Female Count</th>
            <th>Unkown Count</th>
            <th>Total</th>
            <th v-for="i in settings.ageRange" class="text-center">
              <div>
                Age
              </div>
              <div>
                {{ i.from }} - {{ i.to }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in data">
            <td>
              {{ i.barangay }}
            </td>
            <td>
              {{ i.household }}
            </td>
            <td>
              {{ i.male }}
            </td>
            <td>
              {{ i.female }}
            </td>
            <td>
              {{ i.unknown }}
            </td>
            <td>
              {{ i.male + i.female + i.unknown }}
            </td>

            <td v-for="k in i.ageRange" :key="k">
              {{ k }}
            </td>

          </tr>
        </tbody>
      </VTable>
    </VCard>

    <SnackBar ref="SnackBarRef"></SnackBar>
  </div>
</template>
