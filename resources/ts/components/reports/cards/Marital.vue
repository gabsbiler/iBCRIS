

<script setup lang="ts">

const props = defineProps(['data'])

const isTableVisible = ref(false)
</script>

<template>
  <VCard>
    <VCardTitle class="mt-3 d-flex justify-space-between">
      <h6 class="text-h6">Age Distribution by Sex</h6>
    </VCardTitle>
    <VCardText>
      <div class="mt-5">
          <VTable>
            <thead>
              <th>Age</th>
              <th>Single<br>Male</th>
              <th>Single<br>Female</th>
              <th>Married<br>Male</th>
              <th>Married<br>Female</th>
            </thead>
            <tbody>
              
              <tr v-for="item in props.data.countMaritalStatus">
                <td>{{item.age.from}}-{{item.age.to}}</td>
                <td>{{ item.singleMale }}</td>
                <td>{{ item.singleFemale }}</td>
                <td>{{ item.marriedMale }}</td>
                <td>{{ item.marriedFemale }}</td>
              </tr>
            </tbody>
          </VTable>
        </div>
    </VCardText>
  </VCard>
</template>
