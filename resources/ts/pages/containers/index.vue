<template>
  <div>
    <VCard>
      <VCardText>
        <VDataTable :headers="headers" :items="data">

          <template #top>
            <div class="d-flex justify-space-between my-2">
              <div>
                <h6 class="text-h6">Record Batch</h6>
              </div>
              <div class="d-flex align-center gap-x-3">
                <VTextField label="Search" density="compact" style="min-width: 20rem;"/>
                <ContainerAddDialog @finish="() => {fetchData(); SnackBarRef.show('success', 'Succesfully Added')}"/>
              </div>
            </div>
          </template>

          <template #item.action="{item}">
            <div class="d-flex gap-x-2">
              <VBtn icon="mdi-trash-outline" :loading="isDeleting" @click="()=>{
                deleteContainerId = item.raw.id; 
                isDeleteDialogVisible=true;
                isDeleting=true
                }"
                />
              <ContainerEditDialog :item="item.raw" @finish="() => {fetchData(); SnackBarRef.show('success', 'Edit Successful')}"/>
            </div>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>

    <ConfirmDialog 
      :isDialogVisible="isDeleteDialogVisible" 
      confirmationQuestion="This will be deleted permanently. Are you sure?" 
      @confirm="deleteContainer(deleteContainerId)"
      @cancel="isDeleteDialogVisible = false"
    />

    <SnackBar ref="SnackBarRef"/>
  </div>
  
</template>

<script setup lang="ts">
import ContainerAddDialog from '@/components/dialogs/Settings/HouseholdContainer/Add.vue';
import ContainerEditDialog from '@/components/dialogs/Settings/HouseholdContainer/Edit.vue';
import axios from '@axios';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const SnackBarRef=ref(null)
const data = ref()
const isDeleteDialogVisible=ref(false)
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

const isDeleting = ref(false);
const deleteContainerId = ref()
const deleteContainer = async (containerId:any) => {
  isDeleting.value = true;
  try {
    const response = await axios.delete(`/api/household-container/${containerId}`);
    fetchData()
    SnackBarRef.value.show('success', response.data.message)
  } catch (error) {
    SnackBarRef.value.show('error', error)
  } finally {
    isDeleting.value = false;
  }
};

onMounted(() => {
  fetchData()
})
</script>

