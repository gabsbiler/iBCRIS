<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">
          Socio-Civic Information
        </h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="3">
        <ContinousMedicalCare></ContinousMedicalCare>
      </VCol>
      <VCol cols="12" md="3">
        <NutritionalIssue></NutritionalIssue>
      </VCol>
      <VCol cols="12" md="3">
        <SoloParent/>
      </VCol>
      <VCol cols="12" md="3">
        <LGBTQ/>
      </VCol>
    </VRow>
  </section>
</template>
<style scoped>
.card {
  block-size: 36rem;
}
</style>
