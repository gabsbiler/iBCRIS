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
        <VCard>
          <VCardText class="card">
            <div class="circle" style="background-color: #9c82e2;"></div>
            <div>
              <div class="text-body-2">
                Count of Recorded Death
              </div>
              <h4 class="text-h4">
                14,000
              </h4>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard title="Reason for not registration">
          <VCardText>
            <VTable>
              <thead>
                <tr>
                  <th>Action Plan</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Negligence</td>
                  <td>234</td>
                </tr>
                <tr>
                  <td>Lack of Awareness</td>
                  <td>763</td>
                </tr>
                <tr>
                  <td>LCRO too far/not accesible</td>
                  <td>243</td>
                </tr>
                <tr>
                  <td>Registration/other fees too high/cannot afford</td>
                  <td>65</td>
                </tr>
                <tr>
                  <td>Registration not part of culture</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Registration not important</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Others</td>
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
