<template>
  <section class="d-flex gap-y-3 flex-column" >
    <VCard>
      <VCardTitle class="mt-2 d-flex justify-space-between">
        <div>
          Batches
        </div>
        <VBtn
          :icon="filterShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="filterShow = !filterShow"
          variant="text"
        ></VBtn>
      </VCardTitle>
      
      <VExpandTransition>
        <div v-show="filterShow">

          <VCardText>
            <VRow>
              <VCol v-for="i in containers" :key="i" >
                <VBtn block variant="outlined" v-if="search!=i.name" @click="() => {search = search === i.name ? '' : i.name}">
                  {{ i.name }}
                </VBtn>
                <VBtn block  v-else  @click="() => {search = search === i.name ? '' : i.name}">
                  {{ i.name }}
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </div>
      </VExpandTransition>
    </VCard>

    <!-- Data tables -->
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4 flex-column">
        <VRow>
          <VCol class="d-flex align-middle">
            <h1 class="text-h6">
              Household List
            </h1>
            
            
          </VCol>
          <VCol class="d-flex justify-end">
            <VTextField
              v-model="search"
              density="compact"
              label="Search"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              dense
              outlined
              style="max-width: 300px; margin-inline: 0.8rem;"
            />
            <AddHouseholdDialog
              @snackbar="showSnackBar"
              @refresh-table="fetchData"
            />
          </VCol>
        </VRow>
        <VDataTableServer
          class="mt-3"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="households"
          :items-length="totalHouseholds"
          :search="search"
          :loading="isLoading"
          @update:options="fetchData"
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
        </VDataTableServer>
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

<script setup lang="ts">

import axiosIns from '@/plugins/axios';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

const filterShow = ref(false)
const containers = ref()
const isLoading = ref(false)
const itemsPerPage = ref(15)
const households = ref([]);
const totalHouseholds = ref(0);
const search = ref('');

const isSnackbarSuccessVisible = ref(false)
const alertMessage = ref()
const type = ref()

const user = JSON.parse(localStorage.getItem('userData'))

const headers = [
  {
    title: 'Record Batch',
    key: 'household_container.name'
  },
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

const fetchData = async (options) => {
  isLoading.value = true
  try {
    let response = {}
    // const sortByField = sortBy?.[0] ?? '';
    if(user.role == 'admin'){
      response = await axiosIns.get('/api/household', {
        params: options,
      });
    }else{
      response = await axiosIns.get(`/api/household/${user.barangay}`, {
        params: options,
      });
    }
    

    households.value = response.data.data;
    totalHouseholds.value = response.data.total;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  isLoading.value=false
};

const fetchContainers = async () => {
  try {
    const response = await axiosIns.get('/api/container')

    containers.value = response.data
  
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const deleteItem = async (householdId) => {
  try {
    // Make the delete request
    const response = await axiosIns.delete(`/api/households`, { data: { household_id: householdId } });

    // Show success message
    showSnackBar({ message: 'Household successfully deleted', type: 'success' });

    // Refresh the table data
    fetchData();
  } catch (error) {
    console.error('Error deleting household:', error);
    // Show error message
    showSnackBar({ message: 'Error deleting household', type: 'error' });
  }
};

onMounted(() => {
  fetchContainers()
})

</script>


