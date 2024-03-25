<script setup lang="ts">
const UserTableRef = ref()
</script>
<template>
  <div>
    <VCard >
      <VCardTitle class="mt-1 d-flex">
        <h6 class="text-h6">System User List</h6>
        <VSpacer/>
        <VTextField
          label="Search"
          class="mx-3"
          density="compact"
          style="max-width: 300px;"
        />
        <AddUserDialog @submitted="UserTableRef.fetchData()"/>
      </VCardTitle>
      <VCardText class="text-center">
        <UserTable ref="UserTableRef"/>
      </VCardText>
    </VCard>
  </div>
</template>
