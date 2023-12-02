<template>
  <VCard
    title="Filters"
    class="mb-6"
  >
    <VCardText>
      <VRow>
        <VCol
          v-for="(items, filterKey) in filters"
          :key="filterKey"
          cols="4"
        >
          <VSelect
            v-model="selectedFilters[filterKey]"
            :label="`Select ${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`"
            clearable
            clear-icon="mdi-close"
            :items="items"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  filters: String,
})

const selectedFilters = {}
</script>
