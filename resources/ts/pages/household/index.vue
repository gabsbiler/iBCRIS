<template>
  <section>
    <!-- Data tables -->
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <VRow>
          <VCol class="d-flex align-middle">
            <h1 class="text-h6">
              Household List
            </h1>
            <VSpacer />
            <AddHouseholdDialog
              @snackbar="showSnackBar"
              @refresh-table="fetchData"
            />
          </VCol>
        </VRow>
    
        <VDataTable
          class="mt-3"
          :headers="headers"
          :items="households"
          :search="search"
        >
          <!-- Count -->
          <template #item.Count="{ item }">
            {{item.raw.household_members.length }}
          </template>
        
          <template #item.Head.Lastname="{ item }">
            {{ 
            item.raw.household_members.find(member => member.head == 1) ?
              item.raw.household_members.find(member => member.head == 1).demographic.lastname  + ", " +
              item.raw.household_members.find(member => member.head == 1).demographic.firstname + " " +
              item.raw.household_members.find(member => member.head == 1).demographic.middlename
            : 'No Assigned Head'
        
            }}
          </template>

          <!-- Survey Status -->
          <template #item.surveyStatus="{ item }">
            <VChip
            :color="item.raw.surveyStatus ? 'success' : 'error'"
            class="font-weight-medium"
            size="small"
            >
            {{item.raw.surveyStatus ? 'Complete' : 'Not Completed'}}
            </VChip>
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <div class="d-flex px-auto gap-1">
              <IconBtn @click="deleteItem(item.raw.id)">
                <VIcon icon="mdi-delete-outline" />
              </IconBtn> 

              <IconBtn>
                <RouterLink :to="{name: 'household-view-id', params: { id: item.raw.id }, query: {household_id: item.raw.id}}">
                  <VIcon
                    icon="
                mdi-information-slab-circle-outline"
                  />
                  
                </RouterLink>
              </IconBtn>
            </div>
          </template>
        </VDataTable>
      </VCardText>
      <VSnackbar
        v-model="isSnackbarSuccessVisible"
        location="top center"
        variant="flat"
        :color="type"
      >
        {{ alertMessage }}
        <template #actions>
          <VBtn
            color="white"
            @click="isSnackbarSuccessVisible = false"
          >
            Close
          </VBtn>
        </template>
      </VSnackbar>
    </VCard>
  </section>
</template>

<script setup>

import axios from '@axios';
import { VDataTable } from 'vuetify/labs/VDataTable';


const households = ref()

const isSnackbarSuccessVisible = ref(false)
const alertMessage = ref()
const type = ref()

const headers = [
  {
    title: "BRGY/PUROK/SITIO",
    key: 'Barangay',
  },
  {
    title: "BSN",
    key: 'BSN',
  },
  {
    title: "HUSN",
    key: 'HUSN',
  },
  {
    title: "HSN",
    key: 'HSN',
  },
  {
    title: "HEAD OF HOUSEHOLD",
    key: 'Head.Lastname',
  },
  {
    title: "COUNT",
    key: 'Count',
  },
  {
    title: "SURVEY STATUS",
    key: 'surveyStatus',

  },
  {
    title: "ACTION",
    key: 'actions',
  },
]

const showSnackBar = data =>{
  alertMessage.value = data.message
  type.value = data.type
  isSnackbarSuccessVisible.value = true
}

async function fetchData(){
  try {
    const response = await axios.get('/api/household')

    households.value = response.data
    console.log(households)
  
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}


onMounted(() => {
  fetchData()
})
</script>


