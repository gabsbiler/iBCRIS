<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const user = ref(JSON.parse(localStorage.getItem('userData')))
const householdCount = ref(0)
const memberCount = ref(0)
const loading = ref()
const barangay = ref([])
const selectedBarangay = ref()

const emits = defineEmits(['changeBarangay'])

const fetchHouseholdCount = async () => {
  try {
    // Include the selectedBarangay in the API call
    const response = await axiosIns.get(`/api/dashboard/household/count?barangay=${encodeURIComponent(localStorage.getItem('selectedBarangay'))}`);
    console.log(response);
    householdCount.value = response.data;
  } catch (e) {
    console.log(e);
  }
};

const fetchMemberCount = async () => {
  try {
    // Include the selectedBarangay in the API call
    const response = await axiosIns.get(`/api/dashboard/household/member/count?barangay=${encodeURIComponent(localStorage.getItem('selectedBarangay'))}`);
    console.log(response);
    memberCount.value = response.data;
  } catch (e) {
    console.log(e);
  }
};


const fetchBarangay = async () => {
  loading.value = true;
  try {
    // Include search in the API call
    const response = await axiosIns.get('/api/barangays')
    
    barangay.value = response.data.map(item => item.barangay);
    const storedBarangay = localStorage.getItem('selectedBarangay')
    if(storedBarangay) {
      selectedBarangay.value = storedBarangay 
    } else{
      localStorage.setItem('selectedBarangay', barangay.value[0])
    } 
    

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchHouseholdCount()
  fetchMemberCount()
  fetchBarangay()
})

const changeBarangay  = (newBarangay) => {
  localStorage.setItem('selectedBarangay', newBarangay)
  emits('changeBarangay')
}

</script>

<template>
  <section>
    <VRow>
      <VCol cols="12" md="6">
        <div>
          <h5 class="text-h4" v-if="user.role != 'admin'">
            Welcome <b>{{ user.name }}</b> <br>of Brgy.{{ user.barangay }} to <b>iBCRIS</b> 
          </h5>
          <h5 class="text-h4" v-else>
            Welcome <b>{{ user.name }}</b> to <b>iBCRIS</b> 
          </h5>
          
          <!--  -->
          <p class="text-body-2 mt-2">
            Integrated Barangay Civil Registration System in an information system of civil records of household members in the 66 barangays of the City of Tayabas. It served as repository of records to produce analytical reports that can be used by the barangays and the Local Governement Unit of the City of Tayabas in making better decisions in relation to their various programs and projects.
          </p>
          <VSelect 
            style="max-width: 15rem;"
            v-if="user.role == 'admin'"
            variant="plain"
            :items="barangay"
            label="Selected Barangay"
            density="compact"
            v-model="selectedBarangay"
            @update:model-value="changeBarangay"
          />
        </div>
      </VCol>
      <VCol cols="12" md="3">
        <VCard>
          <VCardText class="card">
            <div class="circle" style="background-color: #9c82e2;"></div>
            <div>
              <div class="text-body-2">
                Household Recorded
              </div>
              <h4 class="text-h4">
                {{householdCount}}
              </h4>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="3">
        <VCard>
          <VCardText class="card">
            <div class="circle" style="background-color: #7dbc31;"></div>
            <div>
              <div class="text-body-2">
                Total Household Members recorded
              </div>
              <h4 class="text-h4">
                {{memberCount}}
              </h4>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
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
