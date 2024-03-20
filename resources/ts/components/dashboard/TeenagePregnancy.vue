<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">
          Teenage Pregnacy
        </h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <CountTeenagePreg></CountTeenagePreg>
      </VCol>
      <VCol cols="12">
        <NextActionPlan></NextActionPlan>
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
