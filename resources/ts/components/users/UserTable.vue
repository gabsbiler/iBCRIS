<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable';
const headers = [
  {
    title: 'Full Name',
    key: 'fullname'
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

const users = ref([
  
])
</script>

<template>
  <VDataTable :headers="headers">

  </VDataTable>
</template>
