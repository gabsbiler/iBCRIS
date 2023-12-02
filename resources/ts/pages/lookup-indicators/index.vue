<!-- eslint-disable vue/require-v-for-key -->
<template>
  
  <VRow>
    <VCol
      cols="12"
      sm="4"
      style=" max-height: 90vh;overflow-y: auto;"
    >
      <!-- Sidebar with tabs for Look ups / Indicators -->
      <h3 class="mb-2">LOOKUPS / INDICATORS</h3>
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
          @click="fetchLookupList(item.column_number)"
        >
          <VIcon
            start
            icon="mdi-account-outline"
          />
          {{ item.lookup_name }}
        </VTab>
      </VTabs>
    </VCol>

    <VCol
      cols="12"
      sm="8"
      
    >
      <!-- Main content area with windows for each tab -->
      <VWindow v-model="currentTab" >
        <!-- Window for creating a new lookup -->
        <VWindowItem>
          <AddLookupForm @run-after-submit="fetchData" />
        </VWindowItem>
        <!-- Window for each existing lookup -->
        <VWindowItem
          v-for="item in lookups"
          :key="item._id"
          
        >
          <VCard class="px-3 py-3" style=" max-height: 90vh;overflow-y: auto;">
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
                <tr v-for="listing in lookupList">
                  <td>{{ listing.lookup_key }}</td>
                  <td>
                    {{ listing.description }}
                  </td>
                  <td class="text-center">
                    <VBtn
                      variant="text"
                      @click="deleteLookupEntry(item.name, key)"
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
              :look-up-entry-name="lookUpEntryName"
              @run-after-submit="fetchData"
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
</template>

<script setup lang="ts">
import axios from '@axios';
import { onMounted, ref } from 'vue';

const lookUpEntryName = ref('')

// State variables
const lookups = ref([])
const lookupList = ref([])
const currentTab = ref(0)

const isSnackbarSuccessVisible=ref(false)
const alertMessage = ref('')
const type = ref('')

// Fetch data on component mount
onMounted(() => {
  fetchData()
})

// Async function to fetch data from the server
async function fetchData() {
  try {
    const response = await axios.get('/api/lookup')
    lookups.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function fetchLookupList(columnNumber){
  try {
    const response = await axios.get('/api/lookup-list', {
      params: {
        column_number: columnNumber
      }
    })
    lookupList.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function deleteLookupEntry(lookupName, lookupEntryKey){
  const requestData = {
    name: lookupName,
    lookupKey: lookupEntryKey,
  }

  axios.delete('/deletelookupentry', { data: requestData })
    .then(response => {
      fetchData()
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
</script>
