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
        <VCard>
          <VCardText class="card">
            <div class="circle" style="background-color: #9c82e2;"></div>
            <div>
              <div class="text-body-2">
                Count of Teenage Pregnancy
              </div>
              <h4 class="text-h4">
                14,000
              </h4>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard title="Next Action Plan">
          <VCardText>
            <VTable style="height: 25.2rem;">
              <thead>
                <tr>
                  <th>Action Plan</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Continue Studying</td>
                  <td>234</td>
                </tr>
                <tr>
                  <td>Job Seeking</td>
                  <td>763</td>
                </tr>
                <tr>
                  <td>Marriage</td>
                  <td>243</td>
                </tr>
                <tr>
                  <td>Stop Studying</td>
                  <td>65</td>
                </tr>
                <tr>
                  <td>For Adoption</td>
                  <td>12</td>
                </tr>
              </tbody>
            </VTable>
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
