<script setup lang="ts">
import axiosIns from '@/plugins/axios';
const isDialogOpen = ref(false)
const loading = ref(false)
const SnackBarRef = ref()
const barangay = ref([])

const userTypes = [
  {
    name: 'Administrator',
    value: 'admin'
  },
  {
    name: 'Brgy. Administrator',
    value: 'brgyAdmin'
  },
  {
    name: 'Brgy. Encoder/Enumerator',
    value: 'brgyEncoder'
  },
]

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  c_password: '',
  role: null,
  barangay: null,
})

const addUser = async () => {
  loading.value=true
  axiosIns.post('/api/auth/register', user.value).then(
    response => {
      console.log(response)

      user.value = {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        c_password: '',
        role: null,
        barangay: null,
      }
      isDialogOpen.value = false
      emits('submitted')
    })
    .catch(error => {
      SnackBarRef.value.show('error', error.response.data.message)
      console.log(error)
    })
  loading.value=false
}


const fetchBarangay = async () => {
  loading.value = true;
  try {
    // Include search in the API call
    const response = await axiosIns.get('/api/barangays')
    barangay.value = response.data.map(item => item.barangay);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(()=> {
  fetchBarangay()
})
const emits = defineEmits(['submitted'])
</script>

<template>
  <VBtn @click="isDialogOpen=true">
    Add User
  </VBtn>

  <VDialog v-model="isDialogOpen" >
    <VCard 
      max-width="700" 
      class="mx-auto" 
      style="width: 100%;"
      title="Add System User"
    >
      <VCardText>
        <VForm @submit.prevent="addUser">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.first_name"
                label="First Name"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.last_name"
                label="Last Name"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.username"
                label="Username"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.email"
                label="Email"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.password"
                label="Password"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.c_password"
                label="Confirm Password"
              />
            </VCol>
            <VCol>
              <VSelect
                v-model="user.role"
                :items="userTypes"
                item-title="name"
                item-value="value"
                label="Select User Type"
              />
            </VCol>
            
            <VCol v-show="user.role != 'admin'">
              <VSelect
                v-model="user.barangay"
                label="Select Barangay"
                :items="barangay"
              />
            </VCol>
            
          </VRow>
        </VForm>
        
      </VCardText>
      <VCardAction class="d-flex justify-center gap-x-3 pb-5">
        <VBtn type="submit" @click="addUser" :loading="loading">
          Submit
        </VBtn>
        <VBtn
          variant="outlined"
          type="button"
          @click="isDialogOpen = false"
        >
          Cancel
        </VBtn>
      </VCardAction>
    </VCard>

    <SnackBar ref="SnackBarRef"></SnackBar>
  </VDialog>
</template>
