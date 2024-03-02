

<script setup lang="ts">

const props = defineProps(['data'])

const isTableVisible = ref(false)
</script>

<template>
  <VCard>
    <VCardTitle class="mt-3 d-flex justify-space-between">
      <h6 class="text-h6">Female (Single & Married)</h6>
      <!-- <VBtn variant="text" @click="isTableVisible = !isTableVisible">Show Table</VBtn> -->
    </VCardTitle>
    <VCardText>
      <!-- <countMaritalStatsChart
        :data="props.data.countFemaleMaritalStats"
      /> -->
      <div>
          <VTable>
            <thead>
              <th>Age</th>
              <th>Single</th>
              <th>Married</th>
            </thead>
            <tbody>
              <tr v-for="item in props.data.countFemaleMaritalStats">
                <td>{{item.age.from}}-{{item.age.to}}</td>
                <td>{{ item.single }}</td>
                <td>{{ item.married }}</td>
              </tr>
            </tbody>
          </VTable>
        </div>
    </VCardText>
  </VCard>
</template>
