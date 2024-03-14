<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">Birth and Marriages</h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <VCard title="Birth Registration">
          <VCardText>
            <BirthRegistration/>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard title="Marriage Registration">
          <VCardText>
            <MarriageRegistration/>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
