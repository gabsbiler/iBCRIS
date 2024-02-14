<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const isFilterOpen = ref(false)


const userList = ref([])

const fetchData = async () => {
  try {
    const response = await axiosIns.get('/api/users/all')

    userList.value = response.data.users
    console.log(response)
  } catch (error) {
    console.log(error)   
  }
}

onMounted(() => {
  fetchData();
})
</script>
<template>
  <div>
    <VCard>
      <VCardTitle class="mt-1">
        <div class="d-flex justify-space-between" @click="isFilterOpen = !isFilterOpen">
          <h6 class="text-h6">Filters</h6>
          <VBtn
            :icon="isFilterOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'"
            variant="text"
          />
        </div>
      </VCardTitle>
      <VExpandTransition>
        <VCardText v-if="isFilterOpen">
          <VRow>
            <VCol cols="12" md="6">
              <VSelect
                label="Select Role"
              />
            </VCol>
            <VCol>
              <VSelect
                label="Select Brgy"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VExpandTransition>
    </VCard>
    <VCard class="mt-5">
      <VCardTitle class="mt-1 d-flex">
        <h6 class="text-h6">System User List</h6>
        <VSpacer/>
        <VTextField
          label="Search"
          class="mx-3"
          density="compact"
          style="max-width: 300px;"
        />
        <AddUserDialog @submitted="fetchData"/>
      </VCardTitle>
      <VCardText class="text-center">
        <UserTable :user-list="userList"/>
      </VCardText>
    </VCard>
  </div>
</template>
