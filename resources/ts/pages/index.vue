<script setup lang="ts">

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <HeadCard />
      </VCol>

      <VDivider/>
      
      <VCol cols="12">
        <Demographics/>
      </VCol>

      <VDivider/>

      <VCol cols="12">
        <Skills/>
      </VCol>

      <VDivider/>

      <VCol cols="12" md="6">
        <Residency/>
      </VCol>
      <VCol cols="12" md="6">
        <Birth/>
      </VCol>

      <VDivider/>

      <VCol cols="12" md="6">
        <Health/>
      </VCol>
      <VCol cols="12" md="3">
        <TeenagePregnancy/>
      </VCol>
      <VCol cols="12" md="3">
        <Death/>
      </VCol>

      <VDivider/>

      <VCol cols="12">
        <SocioCivic/>
      </VCol>
    </VRow>
  </div>
</template>
