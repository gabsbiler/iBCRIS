<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const isShow = ref(true)
const baranggayList = ref([])

const ageFrom = ref()
const ageTo = ref()

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
  <div class="d-flex gap-y-5 flex-column">
    <VCard>
      <VCardTitle class="mt-2 ms-1">
        Generate Death Reports
      </VCardTitle>
      <VCardText>
        This module allows you to generate a report of Death Records. Just select the barangay, then the date range of report. It will display the death records.
      </VCardText>
    </VCard>
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
            <VBtn :disabled="!(settings.barangay.length > 0)">
              Generate
            </VBtn>
          </div>
        </VCardText>
      </VExpandTransition>
    </VCard>

    <VCard>
      <VCardText>
        <h4 class="text-h4 text-center">
          Death Record in Development
        </h4>
      </VCardText>
    </VCard>
  </div>
</template>
