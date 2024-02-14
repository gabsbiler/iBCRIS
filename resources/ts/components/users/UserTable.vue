<script setup lang="ts">
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
    key: 'action'
  }
]

const props = defineProps(['userList'])
</script>

<template>
  <VDataTable 
    :headers="headers" 
    :items="props.userList"
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
    
    <template #item.action>
      <div>
        <VBtn 
          variant="text" 
          color="secondary" 
          density="compact" 
          icon="mdi-information-outline"
        />
      </div>
    </template>
  </VDataTable>
</template>
