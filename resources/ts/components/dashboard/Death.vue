<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">
          Death
        </h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <CountRecordedDeath></CountRecordedDeath>
      </VCol>
      <VCol cols="12">
        <ReasonDeathNotRegistered></ReasonDeathNotRegistered>
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
