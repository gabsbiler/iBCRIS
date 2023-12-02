<!-- eslint-disable vue/no-restricted-class -->
<template>
  <VForm @submit.prevent="addNewLookup">
    <VCard class="px-3 py-3">
      <VTextField
        id="lookupName"
        v-model="lookupName"
        label="Lookup Name"
        density="compact"
        class="pb-3"
        required
      />

      <VTable class="border">
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
          <tr
            v-for="(item, index) in items"
            :key="index"
          >
            <td>
              <VTextField
                :id="'code_' + index"
                v-model="item.code"
                label="Code"
                density="compact"
                required
              />
            </td>
            <td>
              <VTextField
                :id="'description_' + index"
                v-model="item.description"
                label="Description"
                density="compact"
                required
              />
            </td>
            <td class="text-center">
              <VBtn @click="removeItem(index)">
                <VIcon
                  start
                  icon="mdi-delete"
                />
                Remove
              </VBtn>
            </td>
          </tr>
        </tbody>
      </VTable>
      
      <VBtn
        class="mt-3 mr-3"
        @click="addItem"
      >
        <VIcon
          start
          icon="mdi-add"
        />
        Add Item
      </VBtn>

      <VBtn
        class="mt-3"
        type="submit"
      >
        <VIcon
          start
          icon="mdi-content-save"
        />
        Save
      </VBtn>
    </VCard>
  </VForm>
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
</template>

<script setup>
import axios from '@axios'
import { ref } from 'vue'

const emit = defineEmits(['runAfterSubmit'])

const isSnackbarSuccessVisible=ref(false)
const alertMessage = ref('')
const type = ref('')

const lookupName = ref('')
const items = ref([{ code: '', description: '' }])

const addNewLookup = () => {
  const formData = {
    name: lookupName.value,
    items: items.value,
  }

  axios
    .post('/addnewlookup', formData)
    .then(response => {
      emit('runAfterSubmit')
      alertMessage.value = response.data.message
      isSnackbarSuccessVisible.value = true
      type.value = "success"
    })
    .catch(error => {
      alertMessage.value = error
      isSnackbarSuccessVisible.value = true
      type.value = "error"
    })
}

const addItem = () => {
  items.value.push({ code: '', description: '' })
}

const removeItem = index => {
  items.value.splice(index, 1)
}
</script>
