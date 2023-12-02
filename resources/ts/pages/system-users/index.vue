<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const selectedRole = ref()
const selectedBrgy = ref()
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'FULL NAME',
    key: 'full_name',
  },
  {
    title: 'USER NAME',
    key: 'user_name',
  },
  {
    title: 'USER TYPE',
    key: 'user_type',
  },
  {
    title: 'BARANGGAY',
    key: 'baranggay',
  },
  {
    title: 'ACTION',
    key: 'actions',
    sortable: false,
  },
]

// 👉 search filters
const userTypes = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Brgy. Admin',
    value: 'brgyAdmin',
  },
  {
    title: 'Brgy. Encoder',
    value: 'brgyEncoder',
  },
]

// 👉 barangays
const barangays = [
  {
    title: 'Alitao',
    value: 'alitao',
  },
  {
    title: 'Ankog',
    value: 'ankog',
  },
  {
    title: 'Baguio',
    value: 'baguio',
  },
  {
    title: 'Banawang',
    value: 'banawang',
  },
  {
    title: 'Baras',
    value: 'baras',
  },
  {
    title: 'Buenavista',
    value: 'buenavista',
  },
  {
    title: 'Cabuyao',
    value: 'cabuyao',
  },
  {
    title: 'Calantas',
    value: 'calantas',
  },
  {
    title: 'Isabang',
    value: 'isabang',
  },
  {
    title: 'Katigan',
    value: 'katigan',
  },
  {
    title: 'Lalo',
    value: 'lalo',
  },
  {
    title: 'Lumingon',
    value: 'lumingon',
  },
  {
    title: 'Mateuna',
    value: 'mateuna',
  },
  {
    title: 'Nangka Ibaba',
    value: 'nangkaIbaba',
  },
  {
    title: 'Nangka Ilaya',
    value: 'nangkaIlaya',
  },
  {
    title: 'Opias',
    value: 'opias',
  },
  {
    title: 'Oyama',
    value: 'oyama',
  },
  {
    title: 'Perez',
    value: 'perez',
  },
  {
    title: 'Polo',
    value: 'polo',
  },
  {
    title: 'Potol',
    value: 'potol',
  },
  {
    title: 'Quipot',
    value: 'quipot',
  },
  {
    title: 'San Diego Zone I',
    value: 'sanDiegoZoneI',
  },
  {
    title: 'San Diego Zone II',
    value: 'sanDiegoZoneII',
  },
  {
    title: 'San Diego Zone III',
    value: 'sanDiegoZoneIII',
  },
  {
    title: 'San Isidro',
    value: 'sanIsidro',
  },
  {
    title: 'San Jose',
    value: 'sanJose',
  },
  {
    title: 'San Juan',
    value: 'sanJuan',
  },
  {
    title: 'San Vicente',
    value: 'sanVicente',
  },
  {
    title: 'Santo Angel Central',
    value: 'santoAngelCentral',
  },
  {
    title: 'Santo Angel Norte',
    value: 'santoAngelNorte',
  },
  {
    title: 'Santo Angel Sur',
    value: 'santoAngelSur',
  },
  {
    title: 'Santo Cristo',
    value: 'santoCristo',
  },
  {
    title: 'Santo Tomas',
    value: 'santoTomas',
  },
  {
    title: 'Silangang Malicboy',
    value: 'silangangMalicboy',
  },
  {
    title: 'Silangang Nayon',
    value: 'silangangNayon',
  },
]
</script>

<template>
  <section>
    <!-- Filter -->
    <VCard
      title="Filters"
      class="mb-2"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Role -->
          <VCol>
            <VSelect
              v-model="selectedRole"
              label="Select User Type"
              :items="userTypes"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>

          <!-- 👉 Select Plan -->
          <VCol>
            <VSelect
              v-model="selectedBrgy"
              label="Select Brgy"
              :items="barangays"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- System Users Table -->
    <VCard>
      <VCardText>
        <VDataTable :headers="headers">
          Hello
        </VDataTable>
      </VCardText>
    </VCard>
  </section>
</template>
i
