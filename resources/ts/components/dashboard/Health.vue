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
            <VCard>
              <VCardText class="card">
                <div class="circle" style="background-color: #9c82e2;"></div>
                <div>
                  <div class="text-body-2">
                    Number of Pregnant
                  </div>
                  <h4 class="text-h4">
                    1,000
                  </h4>
                </div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <VCard>
              <VCardText class="card">
                <div class="circle" style="background-color: #9c82e2;"></div>
                <div>
                  <div class="text-body-2">
                    Number of Family who used Family Planning
                  </div>
                  <h4 class="text-h4">
                    1,000
                  </h4>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="8">
        <VCard title="Health Insurance">
          <VCardText>
            <HealthInsurance/>
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
  block-size: 20.5rem;
}
</style>
