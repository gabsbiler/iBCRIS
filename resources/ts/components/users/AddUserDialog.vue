<script setup lang="ts">
import axiosIns from '@/plugins/axios';
const isDialogOpen = ref(false)

const barangay = [
'Alitao',
'Alupay',
'Angeles Zone I (Pob.)',
'Angeles Zone II',
'Angeles Zone III',
'Angeles Zone IV',
'Angustias Zone I (Pob.)',
'Angustias Zone II',
'Angustias Zone III,',
'Angustias Zone IV',
'Anos',
'Ayaas',
'Baguio',
'Banilad',
'Calantas',
'Camaysa',
'Dapdap',
'Gibanga',
'Alsam Ibaba',
'Bukal Ibaba',
'Ilasan Ibaba',
'Nangka Ibaba',
'Palale Ibaba',
'Ibas',
'Alsam Ilaya',
'Bukal Ilaya',
'Ilasan Ilaya',
'Nangka Ilaya',
'Palale Ilaya',
'Ipilan',
'Isabang',
'Calumpang',
'Domoit Kanluran',
'Katigan Kanluran',
'Palale Kanluran',
'Lakawan',
'Lalo',
'Lawigue',
'Lita (Pob.)',
'Malaoa',
'Masin',
'Mate',
'Mateuna',
'Mayowe',
'Opias',
'Pandakaki',
'Pook',
'Potol',
'San Diego Zone I (Pob.)',
'San Diego Zone II',
'San Diego Zone III',
'San Diego Zone IV',
'San Isidro Zone I (Pob.)',
'San Isidro Zone II',
'San Isidro Zone III',
'San Isidro Zone IV',
'San Roque Zone I (Pob.)',
'San Roque Zone II',
'Domoit Silangan',
'Katigan Silangan',
'Palale Silangan',
'Talolong',
'Tamlong',
'Tongko',
'Valencia',
'Wakas'
]

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
      console.log(error)
    })
}

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
            <VCol cols="12" md="6">
              <VSelect
                v-model="user.role"
                :items="userTypes"
                item-title="name"
                item-value="value"
                label="Select User Type"
              />
            </VCol>
            
            <VCol cols="12" md="6">
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
        <VBtn type="submit" @click="addUser">
          Submit
        </VBtn>
        <VBtn
          variant="outlined"
          type="button"
        >
          Cancel
        </VBtn>
      </VCardAction>
    </VCard>
  </VDialog>
</template>
