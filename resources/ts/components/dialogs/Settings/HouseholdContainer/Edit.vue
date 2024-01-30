<template>
  <div>
    <VBtn icon="mdi-square-edit-outline" @click="openDialog"/>

    <VDialog max-width="400" v-model="isDialogVisible">
      <VCard title="Edit Folder">
        <VCardText>
          <VRow>
            <VCol cols="12" md="4">
              <VTextField label="ID" v-model="data.id" disabled/>
            </VCol>
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
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
const isDialogVisible = ref(false)
const data = ref()
const loadingSave = ref(false)
const props = defineProps(['item'])

const emits = defineEmits(['finish'])

const openDialog = () => {
  isDialogVisible.value = true
  data.value = {...props.item}
}

const upload = async () => {
  loadingSave.value = true
  try {
    const response = await axios.put(`/api/household-container/${data.value.id}`,{name: data.value.name});
    const isDialogVisible = ref(false)
    loadingSave.value = false
    emits('finish')
  } catch (error) {
    console.log(error)
  }
  
}
</script>
