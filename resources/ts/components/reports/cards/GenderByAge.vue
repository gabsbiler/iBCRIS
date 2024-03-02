<script setup lang="ts">
const props = defineProps(['data'])
</script>


<template>
  <VCard>
    <VCardTitle class="mt-3 d-flex justify-space-between">
      <h6 class="text-h6">Age Distribution by Gender</h6>
      <!-- <VBtn variant="text" @click="isTableVisible = !isTableVisible">Show Table</VBtn> -->
    </VCardTitle>
    <VCardText>
      <!-- <countGenderByAgeChart
        :data="props.data.countGenderByAge"
      /> -->
      <div >
        <VTable>
          <thead>
            <tr>
              <th>Age</th>
              <th>Male</th>
              <th>Female</th>
              <th>Unknown</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.data.countGenderByAge">
              <td>{{item.age.from}}-{{ item.age.to }}</td>
              <td>{{item.male}}</td>
              <td>{{item.female }}</td>
              <td>{{ item.unknown }}</td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardText>
    
  </VCard>
</template>
