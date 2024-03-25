<template>
  <div>
    <VCard>
      <VCardText>
        <VDataTableServer :headers="headers" :items="data" :loading="loading" @update:options="fetchData" :search="search">

          <template #top>
            <div class="d-flex justify-space-between mb-2 align-center">
              <div>
                <h6 class="text-h6">Barangays</h6>
              </div>
              <div class="d-flex align-center gap-x-3">
                <VTextField v-model="search" label="Search" density="compact" style="min-width: 20rem;"/>
                <AddBarangay @finish="fetchData"></AddBarangay>
              </div>
            </div>
          </template>

          <template #item.action="{ item }">
            <div class="d-flex gap-x-2">
              <VBtn icon color="red" @click="deleteBarangay(item.raw.id)">
                <v-icon>mdi-trash-outline</v-icon>
              </VBtn>
            </div>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>

    <SnackBar ref="SnackBarRef"/>
  </div>
</template>


<script setup lang="ts">
import axiosIns from '@axios';
import { ref } from 'vue';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

const SnackBarRef = ref(null);
const data = ref([]);
const search = ref('');
const loading = ref(false);
const headers = [
  {
    title: 'Barangay', 
    key: 'barangay' // Updated to use `title` and `value` as per Vuetify's requirements
  },
  {
    title: 'Action', 
    key: 'action', // `value` is used for matching with item properties
    sortable: false // Indicates the column is not sortable
  },
];

// Method to fetch data, now reactive to options change
const fetchData = async (options = {}) => {
  loading.value = true;
  try {
    // Include search in the API call
    const response = await axiosIns.get('/api/barangays', {
      params: { search: search.value, ...options }
    });
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

// Function to handle barangay deletion
const deleteBarangay = async (id) => {
  loading.value = true
  try {
    await axiosIns.delete(`/api/barangays/${id}`);
    fetchData();
  } catch (error) {
    console.error('Error deleting barangay:', error);
  }finally{
    loading.value = false
  }
};

// Fetch initial data
fetchData();
</script>

