<template>
  <VForm @submit.prevent="addNewLookupEntry">
    <VRow>
      <VCol cols="2">
        <VTextField
          id="lookUpEntryCode"
          v-model="lookUpEntryCode"
          label="Code"
          density="compact"
        />
      </VCol>
      <VCol cols="8">
        <VTextField
          id="lookUpEntryDescription"
          v-model="lookUpEntryDescription"
          label="Description"
          density="compact"
        />
      </VCol>
      <VCol cols="2">
        <VBtn type="submit">
          <VIcon
            start
            icon="mdi-add"
          />Save
        </VBtn>
      </VCol>
    </VRow>
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
  </VForm>
</template>

<script setup>
import axios from '@axios'
import { defineProps, ref } from 'vue'

const props = defineProps({
  lookUpEntryId: String,
})

const emit = defineEmits(['runAfterSubmit'])

const lookUpEntryCode = ref('')
const lookUpEntryDescription = ref('')

const isSnackbarSuccessVisible=ref(false)
const alertMessage = ref('')
const type = ref('')

const addNewLookupEntry = () => {
  const formData = {
    lookupid: props.lookUpEntryId, // Assuming you have the correct lookup ID here
    code: lookUpEntryCode.value,
    description: lookUpEntryDescription.value,
  };

  // Send a POST request to add a new entry
  axios.post('/api/lookup/entry/add', formData)
    .then(response => {
      // Clear input fields and show success alert
      lookUpEntryCode.value = ''
      lookUpEntryDescription.value = ''
      emit('runAfterSubmit', props.lookUpEntryId)
      alertMessage.value = response.data.message
      isSnackbarSuccessVisible.value = true
      type.value = "success"
    })
    .catch(error => {
      alertMessage.value = error
      isSnackbarSuccessVisible.value = true
      type.value = "error"
      console.log(error)
    })
}
</script>
