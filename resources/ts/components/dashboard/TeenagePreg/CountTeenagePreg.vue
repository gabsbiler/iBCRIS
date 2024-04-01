<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const data = ref()
const fetchData = async () => {
  try{  
    const response = await axiosIns.get(`/api/dashboard/member/count-lookup/53_1/1?barangay=${localStorage.getItem('selectedBarangay')}`)
    data.value = response.data
  }catch(e){
    console.log(e)
  }
}
onMounted(() => {
  fetchData()
})
</script>
<template>
  <VCard>
  <VCardText class="card">
    <div class="circle" style="background-color: #9c82e2;"></div>
    <div>
      <div class="text-body-2">
        Count of Teenage Pregnancy
      </div>
      <h4 class="text-h4">
        {{data}}
      </h4>
    </div>
  </VCardText>
</VCard>
</template>
<style scoped>
.circle {
  border-radius: 50%;
  block-size: 3rem;
  inline-size: 3rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  block-size: 10rem;
}
</style>
