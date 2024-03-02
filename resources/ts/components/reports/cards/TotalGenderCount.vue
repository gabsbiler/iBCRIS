<script setup lang="ts">

const props = defineProps(['data'])

const transformData = (input) => {
    const labels = [];
    const data = [];

    for (const [key, value] of Object.entries(input)) {
        labels.push(key);
        data.push(String(value));
    }

    return { labels, data };
}
</script>

<template>
  <VCard
    style="height: 100%;" 
  >
    <VCardTitle class="mt-3 d-flex justify-space-between align-center">
      <h6 class="text-h6">Total Population Collected</h6>
      <!-- <VBtn variant="text" @click="isTableVisible = !isTableVisible">Show Table</VBtn> -->
    </VCardTitle>
    <VCardText>
      <!-- <totalCountGenderChart 
        class="mx-auto"
        :labels="transformData(props.data.totalCountGender).labels"
        :data="transformData(props.data.totalCountGender).data"
      /> -->

      <div >
        <VTable class="text-center">
          <thead>
            <tr>
              <th class="text-center">Male</th>
              <th class="text-center">Female</th>
              <th class="text-center">Unknown</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{props.data.totalCountGender.Male}}
              </td>
              <td>
                {{props.data.totalCountGender.Female}}
              </td>
              <td>
                {{props.data.totalCountGender.Unknown}}
              </td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardText>
  </VCard>
</template>
