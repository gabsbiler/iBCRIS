<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div> 
    


    <VCard>
      <VCardText>
        <h1 class="text-h5 mb-3">Lookups / Indicators</h1>
        <VRow>
          <VCol
            cols="12"
            sm="4"
            style=" max-height: 90vh;overflow-y: auto;"
          >
            <!-- Sidebar with tabs for Look ups / Indicators -->
            
            <VTabs
              v-model="currentTab"
              direction="vertical"
              class="v-tabs-pill"
            >
              <!-- Create new lookup tab -->
              <VTab>
                <VIcon
                  start
                  icon="mdi-plus"
                />
                Create new lookup
              </VTab>
              <!-- Iterate over existing lookups for lookup tabs -->
              <VTab 
                v-for="item in lookups"
                :key="item.id"
                @click="fetchLookupList(item.id)"
              >
                <VIcon
                  start
                  icon="mdi-account-outline"
                />
                {{ "["+item.column_number+"] "+item.lookup_name }}
              </VTab>
            </VTabs>
          </VCol>
          <VCol
            cols="12"
            sm="8"
            
          >
            <!-- Main content area with windows for each tab -->
            <VWindow v-model="currentTab">
              <!-- Window for creating a new lookup -->
              <VWindowItem>
                <AddLookupForm @run-after-submit="fetchData" />
              </VWindowItem>
              <!-- Window for each existing lookup -->
              <VWindowItem
                v-for="item in lookups"
                :key="item.id"
                
              >
                <VCard class="px-3 py-3" style=" max-height: 90vh;overflow-y: auto;">
                  <VRow class="mb-1">
                    <VCol cols="12" md="3">
                      <VTextField label="Column Number" v-model="item.column_number" density="compact"/>
                    </VCol>
                    <VCol cols="12" md="7">
                      <VTextField label="Column Name" v-model="item.lookup_name" density="compact"/>
                    </VCol>
                    <VCol cols="12" md="2" class="d-flex gap-x-1">
                      <VBtn icon="mdi-content-save" @click="() => updateLookup(item.id, item.column_number, item.lookup_name)"/>
                      <VBtn icon="mdi-trash-outline" color="error" @click="() => deleteLookup(item.id)"/>
                    </VCol>
                  </VRow>
                  <VTable class="border" >
                    <thead>
                      <tr>
                        <th class="text-uppercase">
                          Code
                        </th>
                        <th class="text-uppercase">
                          Description
                        </th>
                        <th class="text-uppercase text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Iterate over existing lookup entries -->
                      <tr v-for="listing in lookupList" :key="listing.lookup_key ">
                        <td>{{ listing.lookup_key }}</td>
                        <td>
                          {{ listing.description }}
                        </td>
                        <td class="text-center">
                          <VBtn
                            variant="text"
                            @click="deleteLookupEntry(listing.lookup_id, listing.lookup_key)"
                          >
                            <VIcon icon="mdi-trash-outline" />
                          </VBtn>
                        </td>
                      </tr>
                    </tbody>
                  </VTable>
                  
                  <!-- Form row for adding a new lookup entry -->
                  <AddLookupEntry
                    class="my-3"
                    :lookUpEntryId="lookUpEntryName"
                    @run-after-submit="fetchLookupList"
                  />
                </VCard>
              </VWindowItem>
            </VWindow>
          </VCol>
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
        </VRow>
      </VCardText>
    </VCard>
  </div>
  
  
</template>

<script setup lang="ts">
import axios from '@axios';
import { onMounted, ref } from 'vue';

const currentTab = ref(); 

const lookUpEntryName = ref('')

const lookups = ref([])
const lookupList = ref([])

const isSnackbarSuccessVisible=ref(false)
const alertMessage = ref('')
const type = ref('')

onMounted(() => {
  fetchData(); // Fetch data after setting the tab
});
// Async function to fetch data from the server
async function fetchData() {
  try {
    const response = await axios.get('/api/lookup')
    lookups.value = response.data
    console.log("hello")
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function fetchLookupList(lookupid:any){
  lookUpEntryName.value = lookupid
  try {
    const response = await axios.get('/api/lookup-list', {
      params: {
        lookupid: lookupid
      }
    })
    lookupList.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function deleteLookupEntry(lookupid: any, lookupEntryKey: any){
  const requestData = {
    lookup_id: lookupid,
    lookupKey: lookupEntryKey,
  }

  await axios.delete('/api/lookup/entry', { data: requestData })
    .then(response => {
      fetchData()
      fetchLookupList(lookupid)
      alertMessage.value = response.data.message
      isSnackbarSuccessVisible.value = true
      type.value = "success"
    })
    .catch(error => {
      alertMessage.value = error.response.data.message
      isSnackbarSuccessVisible.value = true
      type.value = "error"
    })
}

async function deleteLookup(lookupId:any) {
  const requestData = {
    lookup_id: lookupId
    
  }
  try {
    const response = await axios.delete('/api/lookup', {data: requestData})
    .then(response => {
      fetchData()
      alertMessage.value = response.data.message
      isSnackbarSuccessVisible.value = true
      type.value = "success"
    })
    

  } catch (error) {
    console.error('Error deleting the lookup:', error.response.data);
    // Handle the error, such as showing an error message to the user
  }
}

async function updateLookup(lookupId:any, columnNumber:any, lookupName:any){
  try {
    const response = await axios.put('/api/lookup', {
      lookup_id: lookupId,
      column_number: columnNumber,
      lookup_name: lookupName
    });

    alertMessage.value = response.data.message
    isSnackbarSuccessVisible.value = true
    type.value = "success"

  } catch (error) {
    console.error('Error updating the lookup:', error);
    alertMessage.value = error.response.data.message
    isSnackbarSuccessVisible.value = true
    type.value = "error"
  }
}
</script>
