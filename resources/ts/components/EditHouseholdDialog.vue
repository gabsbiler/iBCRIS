<template>
  <div>
    <SnackBar ref="SnackBarRef"></SnackBar>
    <VBtn @click="openDialog" block>Edit</VBtn>
    <VDialog v-model="isDialogVisible" max-width="800">
      <VCard title="Edit Household" v-if="data">
        <VCardText>
          <VRow>
            <VCol cols="12" >
              <VTextField label="Household Key" disabled v-model="data.HouseholdKey"/>
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="HSN" v-model="data.HSN"/>
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="BSN" v-model="data.BSN"/>
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="HUSN" v-model="data.HUSN"/>
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="Baranggay" v-model="data.Barangay"/>
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="Sitio" v-model="data.sitio"/>
            </VCol>
            <VCol cols="12">
              <VTextarea label="Address" v-model="data.address"/>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="d-flex justify-end">
          <VBtn @click="isDialogVisible=false">
            Cancel
          </VBtn>
          <VBtn variant="elevated" @click="updateHousehold" :loading="loadingSave">
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import axios from '@axios';
const isDialogVisible = ref(false)
const data = ref()
const SnackBarRef = ref()

const loadingSave = ref(false)

const route = useRoute()

const openDialog = () => {
  isDialogVisible.value =true
  data.value = { ...props.householdData }; 
}

const props = defineProps(['householdData'])
const emits = defineEmits(['finish'])
const updateHousehold = async () => {
  loadingSave.value = true
  try {
    const response = await axios.put(`/api/household/${route.query.household_id}`, {
      barangay: data.value.Barangay,
      sitio: data.value.sitio,
      husn: data.value.HUSN,
      bsn: data.value.BSN,
      hsn: data.value.HSN,
      address: data.value.address
    });
    emits('finish')
    SnackBarRef.value.show('success', response.data.message)

  } catch (error) {
    SnackBarRef.value.show('error', error)
  }
  isDialogVisible.value = false
  loadingSave.value = false
};



</script>
