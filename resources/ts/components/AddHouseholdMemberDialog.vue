<script setup lang="ts">
import axios from '@axios';

const emit  = defineEmits(['snackbar', 'refreshTable'])

const alertMessage = ref()
const type = ref()
const isDialogVisible = ref(false)

const saveData = async () => {
  // Prepare your data object based on your API requirements
  const postData = {
  }

  axios
    .post('/addhousehold', postData)
    .then(response => {
      
      // alertMessage.value = response.data.message
      // type.value = "success"
      resetForm()
      emit('snackbar', {
        'message': response.data.message,
        'type': "success",
      })
      emit('refreshTable')
    })
    .catch(error => {
      emit('snackbar', {
        'message': error,
        'type': "error",
      })
    })
}

const resetForm = () => {
  // Reset your form variables here
  baranggay.value = null
  sitio.value = ''
  HUSN.value = ''
  BSN.value = ''
  HSN.value = ''
  address.value = ''
  headLastname.value = ''
  headFirstname.value = ''
  headMiddlename.value = ''
  isDialogVisible.value = false
}
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Add Member
      </VBtn>
    </template>

    <!-- Dialog Content -->
    
    <VCard title="Add Household Record">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="isDialogVisible = false"
      />
      <VForm
        ref="refForm"
        @submit.prevent="() => {}"
      >
        <VCardText class="px-4 pt-0">
          <h1 class="text-subtitle-1 mb-1">
            <b>Geographic Identification</b>
          </h1>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSelect
                v-model="baranggay"
                :items="items"
                label="Select Baranggay"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="sitio"
                label="Sitio/Purok"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="HUSN"
                label="Housing Unit Serial Number (HUSN)"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="BSN"
                label="Building Serial Number (BSN)"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="HSN"
                label="Household Serial Number (HSN)"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="address"
                label="Address(House No., Street, Zone)"
              />
            </VCol>
          </VRow>
          <hr
            class="my-5"
            style=" opacity: 0.3;"
          >
          <h1 class="text-subtitle-1 mb-1">
            <b>Head of Household</b>
          </h1>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="headLastname"
                label="Lastname"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="headFirstname"
                label="Firstname"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="headMiddlename"
                label="Middlename"
              />
            </VCol>
          </VRow>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            @click="isDialogVisible = false"
          >
            Close
          </VBtn>
          <VBtn
            color="success"

            @click="saveData"
          >
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>

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
  </VDialog>
</template>
