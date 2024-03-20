<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">
          Health Information
        </h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12">
            <Pregnant></Pregnant>
          </VCol>
          <VCol cols="12">
            <FamilyPlanning></FamilyPlanning>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="8">
        <HealthInsurance/>
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
  block-size: 20.5rem;
}
</style>
