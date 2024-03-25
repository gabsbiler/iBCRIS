<script setup lang="ts">
import axiosIns from '@/plugins/axios';
const isDialogOpen = ref(false)
const loading = ref(false)
const SnackBarRef = ref()
const barangay = ref([])
const changePasswordEntry = ref(false)
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
  name: '',
  email: '',
  username: '',
  role: null,
  barangay: null,
})

const password = ref({
  password: '', 
  c_password: ''
})

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

const fetchUser = async (id:number) => {
  try{
    const response = await axiosIns.get(`/api/user/${id}`)
    console.log(response)
    user.value = response.data
    isDialogOpen.value = true
  }catch(e){
    console.log(e)
  }
}

const updateUser = async () => {
  loading.value = true;

  let payload = {
    name: user.value.name,
    username: user.value.username,
    email: user.value.email, 
    role: user.value.role,
    barangay: user.value.barangay
  }
  if(password.value.password != ''){
    if(password.value.password == password.value.c_password){
      payload.password = password.value.password
    }
    else{
      SnackBarRef.value.show('error', 'Please check your password')
      loading.value = false
      return
    }
  }

  try {
    const response = await axiosIns.patch(`/api/user/${user.value.id}`, payload);
    emits('applied')
    isDialogOpen.value = false
    console.log('User updated successfully:', response);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    loading.value = false;
  }
};

const formattedDateTime =(datetime)=> {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Manila'};
  const date = new Date(datetime);
  return date.toLocaleDateString('en-US', options) 
}

onMounted(()=> {
  fetchBarangay()
})

defineExpose({fetchUser})

const emits = defineEmits(['applied'])
</script>

<template>

  <VDialog v-model="isDialogOpen" >
    <VCard 
      max-width="700" 
      class="mx-auto" 
      style="width: 100%;"
      title="Edit System User"
    >
      <VCardText>
        <VForm @submit.prevent="">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="user.name"
                label="Name"
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
            <VCol cols="12">
              <div>
                Created: {{ formattedDateTime(user.created_at) }}
              </div>
              <div>
                Last Updated: {{ formattedDateTime(user.updated_at) }}
              </div>
            </VCol>
            
            <VCol cols="12">
              <VExpandTransition>
                <div v-show="changePasswordEntry">
                  <VRow>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="password.password"
                        label="Password"
                        :error="password.password.length < 6"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="password.c_password"
                        label="Confirm Password"
                        :error="password.password != password.c_password"
                      />
                    </VCol>
                  </VRow>
                </div>
                
              </VExpandTransition>
            </VCol>
            
          </VRow>
        </VForm>
        
      </VCardText>
      <VCardAction class="d-flex justify-center gap-x-3 pb-5 px-5">
        <VBtn variant="outlined" @click="() => {
          if (!changePasswordEntry) {
            changePasswordEntry = !changePasswordEntry
          }else{
            password.password = ''
            password.c_password = ''
            changePasswordEntry = !changePasswordEntry
          } 
        }">
          {{changePasswordEntry ? 'Cancel' : 'Change password'}}
        </VBtn>
        <VSpacer></VSpacer>
        <VBtn type="submit" :loading="loading" @click="updateUser">
          Apply
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
