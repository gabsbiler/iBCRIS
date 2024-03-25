<script setup lang="ts">
const user = ref(JSON.parse(localStorage.getItem('userData')))
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12" md="6">
        <div>
          <h5 class="text-h4">
            Welcome <b>{{ user.name }}</b> <br>of Brgy.{{ user.barangay }} to <b>iBCRIS</b> 
          </h5>

          <p class="text-body-2 mt-2">
            Integrated Barangay Civil Registration System in an information system of civil records of household members in the 66 barangays of the City of Tayabas. It served as repository of records to produce analytical reports that can be used by the barangays and the Local Governement Unit of the City of Tayabas in making better decisions in relation to their various programs and projects.
          </p>
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
                14,000
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
                150,000
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
