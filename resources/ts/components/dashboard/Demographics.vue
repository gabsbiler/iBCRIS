<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h5">Demographics</h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="3">
        <SexDistribution></SexDistribution>
      </VCol>
      <VCol cols="12" md="5">
        <VCard>
          <VCardTitle>
            <h6 class="text-h6">
              Religion/Religious Affiliation
            </h6>
            <div class="d-flex gap-x-3">
              <div>
                <p class="text-body-2">
                  Highest Count | Roman Catholic inc Catholic Charismatic: <b>30,000</b>
                </p>
              </div>
            </div>
          </VCardTitle>
          <VCardText>
            <ReligiousAffiliation/>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard>
          <VCardTitle>
            <h6 class="text-h6">
              Highest Grade/Year Completed
            </h6>
            <div class="d-flex gap-x-3">
              <div>
                <p class="text-body-2">
                  Highest Count | HS Graduate: <b>5,000</b>
                </p>
              </div>
            </div>
          </VCardTitle>
          <VCardText>
            <HighestGradeCompleted/>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
