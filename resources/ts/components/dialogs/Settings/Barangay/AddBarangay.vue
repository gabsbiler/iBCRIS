<template>
  <div>
    <VBtn @click="openDialog">
      <VIcon icon="mdi-plus"/>
      Add Barangay
    </VBtn>

    <VDialog max-width="400" v-model="isDialogVisible">
      <VCard title="Add Barangay">
        <VCardText>
          <VRow>
            <VCol>
              <VTextField label="Name" v-model="data.name"/>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="d-flex justify-end">
          <VBtn variant="text" @click="isDialogVisible=false">
            Cancel
          </VBtn>
          <VBtn variant="elevated" @click="upload" :loading="loadingSave">
            Add
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import axios from '@axios';
const isDialogVisible = ref(false)
const data = ref({
  name: ''
})

const emits = defineEmits(['finish'])
const loadingSave = ref(false)

const openDialog = () => {
  isDialogVisible.value = true
}

const upload = async () => {
  loadingSave.value = true
  try {
    const response = await axios.post(`/api/barangays`,{barangay: data.value.name});
    console.log(response.data)
    data.value.name = ''
    
  } catch (error) {
    console.log(error)
  } finally {
    emits('finish')
    loadingSave.value = false
    isDialogVisible.value=false
  }
  
}

</script>
