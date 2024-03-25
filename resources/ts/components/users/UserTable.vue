<script setup lang="ts">
import axiosIns from '@/plugins/axios';
import avatar from '@images/avatars/avatar-1.png';
import { VDataTable } from 'vuetify/labs/VDataTable';
const headers = [
  {
    title: 'Full Name',
    key: 'name'
  },
  {
    title: 'Username',
    key: 'username'
  },
  {
    title: 'User Type',
    key: 'type'
  },
  {
    title: 'Barangay',
    key: 'barangay'
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center'
  }
]
const userList = ref([])
const SnackBarRef = ref()
const EditUserDialogRef = ref()

const fetchData = async () => {
  try {
    const response = await axiosIns.get('/api/users/all')

    userList.value = response.data.users
    console.log(response)
  } catch (error) {
    console.log(error)   
  }
}

const deleteUser = async (id:number) => {
  try{
    const response = await axiosIns.delete(`/api/user/${id}`)
    console.log(response)
    SnackBarRef.value.show('success', "Deleted Succesfully")
    fetchData()
  }catch(e){
    SnackBarRef.value.show('error', e.response.data.message)
    console.log(e)
  }
}

onMounted(() => {
  fetchData();
})

defineExpose({fetchData})

</script>

<template>
  <div>
    <VDataTable 
      :headers="headers" 
      :items="userList"
      class="text-left"
    >
      <template #item.name="{item}">
        <div class="d-flex align-center gap-x-3">
          <img 
            :src="avatar" 
            style="width: 2.3rem; border-radius: 8rem;"
          />
          <VText class="text-body-2">{{ item.raw.name }}</VText>
        </div>
      </template>

      <template #item.type="{item}">
        <div>
          {{ item.raw.role == "admin" ? 'Administrator' : '' }}
          {{ item.raw.role == "brgyAdmin" ? 'Brgy. Administrator' : '' }}
          {{ item.raw.role == "brgyEncoder" ? 'Brgy. Encoder/Enumerator' : '' }}
        </div>
      </template>

      <template #item.barangay="{item}">
        {{item.raw.barangay}}
      </template>
      
      <template #item.action="{item}">
        <div class="mx-auto">
          <VBtn 
            variant="text" 
            color="secondary" 
            density="compact" 
            icon="mdi-pencil-outline"
            @click="EditUserDialogRef.fetchUser(item.raw.id)"
          />
          <VBtn 
            variant="text" 
            color="secondary" 
            density="compact" 
            icon="mdi-delete-outline"
            @click="deleteUser(item.raw.id)"
          />
        </div>
      </template>
    </VDataTable>
    <SnackBar ref="SnackBarRef"></SnackBar>
    <EditUserDialog ref="EditUserDialogRef" @applied="fetchData()"></EditUserDialog>
  </div>
</template>
