<script setup lang="ts">
import countGenderByAgeChart from '@/components/reports/countGenderByAge.vue';
const props = defineProps(['data'])
const isTableVisible = ref()
</script>


<template>
  <VCard>
    <VCardTitle class="mt-3 d-flex justify-space-between">
      <h6 class="text-h6">Gender By Age</h6>
      <VBtn variant="text" @click="isTableVisible = !isTableVisible">Show Table</VBtn>
    </VCardTitle>
    <VCardText>
      <countGenderByAgeChart
        :data="props.data.countGenderByAge"
      />
      <VExpandTransition>
      <div v-show="isTableVisible">
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
    </VExpandTransition>
    </VCardText>
    
  </VCard>
</template>
