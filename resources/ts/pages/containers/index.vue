<template>
<VCard>
  <VCardText>
    <VDataTable :headers="headers" :items="data">

      <template #top>
        <div class="d-flex justify-space-between my-2">
          <div>
            <h6 class="text-h6">Household Container</h6>
          </div>
          <div class="d-flex align-center gap-x-3">
            <VTextField label="Search" density="compact" style="min-width: 20rem;"/>
            <VBtn>Add Container</VBtn>
          </div>
        </div>
      </template>

      <template #item.action="{item}">
        <div class="d-flex gap-x-2">
          <VBtn
            icon="mdi-trash-outline">
          </VBtn>
          <VBtn
            icon="mdi-square-edit-outline">
          </VBtn>
        </div>
      </template>
    </VDataTable>
  </VCardText>
  
</VCard>
</template>

<script setup lang="ts">
import axios from '@axios';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const data = ref()

const headers = [
  {
    title: 'Name', 
    key:'name'
  },
  {
    title: 'Action', 
    key:'action'
  },
]

const fetchData = async () => {
  try {
    const response = await axios.get('/api/container')

    data.value = response.data

  
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

