

<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const data =ref()

const fetchData = async () => {
  try{  
    const response = await axiosIns.get(`/api/dashboard/member/count/36?barangay=${localStorage.getItem('selectedBarangay')}`)
    const sortedArray = Object.entries(response.data).sort((a, b) => b[1] - a[1]);

    const top7 = sortedArray.slice(0, 7);

    // Optionally, convert the top 7 back into an object
    const top7Data = top7.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    data.value =top7Data
  }catch(e){
    console.log(e)
  }
}
onMounted(() => {
  fetchData()
})
</script>
<template>
  <VCard title="Reason for not registration">
    <VCardText>
      <VTable style=" height: 406px;margin-top: -3px;">
        <thead>
          <tr>
            <th>Action Plan</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in data">
            <td>
              {{ key }}
            </td>
            <td>
              {{ value }}
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
