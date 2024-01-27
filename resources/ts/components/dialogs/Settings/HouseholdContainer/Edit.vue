<template>
    <VDialog width="500" v-model="isDialogVisible">
      <template #activator="{ props }">
        <VBtn v-bind="props" icon="mdi-square-edit-outline"/>
      </template>

      <VCard>
        <VCardTitle>Edit Container</VCardTitle>
        <VCardText>
          <VTextField label="Name" v-model="item.name"/>
        </VCardText>
        <VCardActions>
          <VBtn>Save</VBtn>
          <VBtn @click="isDialogVisible = false">Cancel</VBtn>
        </VCardActions>
      </VCard>

    </VDialog>
</template>

<script setup lang="ts">
const isDialogVisible = ref(false)
const item = ref()

</script>
