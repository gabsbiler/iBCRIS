<script setup lang="ts">
import axiosIns from '@/plugins/axios';


const isSettingVisible = ref(true)
const generateLoading = ref(false)
const ageFrom = ref()
const ageTo = ref()
const data = ref()
const settings = ref({
  dateFrom:  new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  dateTo: new Date(),
  barangay: '',
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

const baranggayList = ref([])

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

function convertToCSV(obj) {
  if (!obj) {
    console.error('convertToCSV was called with undefined or null object');
    return '';
  }

  const rows = [];

  // General Information
  rows.push("General Information");
  rows.push(`Date From: ${obj.dateFrom}`);
  rows.push(`Date To: ${obj.dateTo}`);
  rows.push(`Barangay: ${obj.barangay}`);
  rows.push(""); // Separate sections

  // Age Range (assuming you want to list the ranges)
  rows.push("Age Ranges");
  if (obj.ageRange && Array.isArray(obj.ageRange)) {
    obj.ageRange.forEach(range => {
      rows.push(`From: ${range.from}, To: ${range.to}`);
    });
  
  // Convert totalCountGender
  if (obj.totalCountGender) {
    rows.push("Gender,Count");
    Object.entries(obj.totalCountGender).forEach(([key, value]) => {
      rows.push(`${key},${value}`);
    });
    rows.push(""); // Add a blank line to separate sections
  }

  // Convert countGenderByAge
  if (obj.countGenderByAge && Array.isArray(obj.countGenderByAge)) {
    rows.push("Age Range,Male,Female,Unknown");
    obj.countGenderByAge.forEach(item => {
      const ageRange = `${item.age.from}-${item.age.to}`;
      rows.push(`${ageRange},${item.male},${item.female},${item.unknown}`);
    });
    rows.push(""); // Separate sections
  }

  // Convert countMaritalByAge
  if (obj.countMaritalByAge && Array.isArray(obj.countMaritalByAge)) {
    rows.push("Age Range,Marital Status Counts");
    obj.countMaritalByAge.forEach(item => {
      const ageRange = `${item.age.from}-${item.age.to}`;
      const statusCounts = Object.entries(item.status).map(([status, count]) => `${status}: ${count}`).join(", ");
      rows.push(`${ageRange},${statusCounts}`);
    });
    rows.push(""); // Separate sections
  }

  // Convert countMaritalStatus
  if (obj.countMaritalStatus && Array.isArray(obj.countMaritalStatus)) {
    rows.push("Age Range,Marital Status Detailed Counts");
    obj.countMaritalStatus.forEach(item => {
      const ageRange = `${item.age.from}-${item.age.to}`;
      const maritalStatusCounts = Object.entries(item).filter(([key]) => key !== 'age').map(([status, count]) => `${status}: ${count}`).join(", ");
      rows.push(`${ageRange},${maritalStatusCounts}`);
    });
    rows.push(""); // Separate sections
  }

  // Convert countFemaleMaritalStats
  if (obj.countFemaleMaritalStats && Array.isArray(obj.countFemaleMaritalStats)) {
    rows.push("Age Range,Female Marital Status Counts");
    obj.countFemaleMaritalStats.forEach(item => {
      const ageRange = `${item.age.from}-${item.age.to}`;
      const femaleMaritalStatusCounts = Object.entries(item).filter(([key]) => key !== 'age').map(([status, count]) => `${status}: ${count}`).join(", ");
      rows.push(`${ageRange},${femaleMaritalStatusCounts}`);
    });
    rows.push(""); // Separate sections
  }
  }

  return rows.join("\n");
}



function downloadCSV(csvContent:any, fileName = "data.csv") {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportData() {
  const csvData = convertToCSV(data.value);
  downloadCSV(csvData, "exportedData.csv");
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
  <div class="d-flex flex-column gap-y-5">
    <VCard>
      <VCardTitle class="mt-2 ms-1">
        Generate Report for Age Distribution per Barangay
      </VCardTitle>
      <VCardText>
        This module allows you to generate a report for the Age distribution per brgy. Just select the barangay, Date range of reports and compose the age ranges. Defaults ranges are defined already but you can still modify it. The generated reports can also be exported to CSV format
      </VCardText>
    </VCard>
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center" @click="isSettingVisible = !isSettingVisible">
        
        <div class="d-flex gap-x-3 align-center">
          <h6 class="text-h6">Filter</h6>
          
        </div>
        <div class="d-flex gap-x-3 align-center">
          <VBtn 
            @click="exportData" 
            variant="outlined"
            :disabled="!(data)"
            v-if="!isSettingVisible"
          >
            Export Result
          </VBtn>
          <VBtn 
            :icon="isSettingVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            variant="text"
          />
        </div>
        
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
            <div class="d-flex justify-space-between">
              <VBtn @click="exportData" :disabled="!(data)" variant="outlined">
                Export Result
              </VBtn>
              <div>
                <VBtn variant="text" @click="clearData">
                Clear
              </VBtn>
              <VBtn variant="elevated" @click="generateReport" :loading="generateLoading" :disabled="!(settings.barangay.length > 0)">
                Generate
              </VBtn>
              </div>
              
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
        <VCard title="Age Distribution by Marital Status">
          <VCardText>
            <VTable>
              <thead>
                <th>Age</th>
                <th>Single</th>
                <th>Married</th>
                <th>Consensual</th>
                <th>Widow</th>
                <th>Divorced</th>
                <th>Common Law</th>
                <th>Legally Separated</th>
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
                  <td>{{ item.status.legallySeparated }}</td>
                  <td>{{ item.status.unknown }}</td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <Marital :data="data"/>
      </VCol>
    </VRow>


  </div>
</template>
