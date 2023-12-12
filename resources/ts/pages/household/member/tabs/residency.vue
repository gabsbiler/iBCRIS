<script setup>
import axios from '@axios';

const member = ref(props.member)
const lookups = ref(props.lookups)

const props = defineProps({
  member: Array,
  lookups: Array
})

const alertMessage = ref()
const type = ref()
const isSnackbarSuccessVisible = ref(false)

const route = useRoute()

const resetForm = async() => {

  member.value.demographic._15a = null
  member.value.demographic._15b = null
  member.value.demographic._15c = null

  member.value.demographic._16a = null
  member.value.demographic._16b = null
  member.value.demographic._16c = null
  member.value.demographic._16d = null
  member.value.demographic._16e = null
  member.value.demographic._16f = null
}

const onSubmit = async() => {
  try {
    const response = await axios.post('/api/updateMember', member.value.demographic);

    alertMessage.value = response.data.message;
    isSnackbarSuccessVisible.value = true;
    type.value = "success";
  } catch (error) {
    console.error("There was an error updating the member:", error);
    alertMessage.value = error.response?.data?.message || "An error occurred";
    isSnackbarSuccessVisible.value = true;
    type.value = "error";
  }
}

const is15bDisabled = computed(() => {
  return member.value.demographic._15a !== '0000' || ['1', '4', '5'].includes(member.value.demographic._15b);
});

const is15cDisabled = computed(() => {
  return member.value.demographic._15a !== '0000';
});


</script>

<template>
  <VRow v-if="member && lookups">
    <VCol cols="12">
      <VCard>
        <VCardText>
          <!-- 👉 Form -->
          <VForm>   
            <!-- RESIDENCY -->
            <div>
              <VText class="text-button">
                <b>
                  RESIDENCY
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._15a"
                    label="(15a) In what year did __ started residing in this housing unit?"
                    type="number"
                    min="0000" max="9999" step="1"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                  v-show="is15bDisabled"
                >
                  <VSelect
                    v-model="member.demographic._15b"
                    label="(15b) Before moving in this housing unit, where did __ reside?"
                    :items="lookups.filter(lookup => lookup.column_number === '15b')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="12"
                  v-show="is15cDisabled"
                >
                  <VTextField
                    v-model="member.demographic._15c"
                    
                    label="(15c) In what barangay/ city/ municipality did __ resides before?"
                  />
                </VCol>
              </VRow>
            </div>

            <!-- MIGRATION -->
            <div class="mt-5" v-show="is15bDisabled">
              <VText class="text-button">
                <b>
                  MIGRATION
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._16a"
                    label="(16a) Type of Resident"
                    :items="lookups.filter(lookup => lookup.column_number === '16a')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._16b"
                    label="(16b) What are the reason why  __ left his/her previous residence?"
                    :items="lookups.filter(lookup => lookup.column_number === '16b')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                <VSelect
                    v-model="member.demographic._16c"
                    label="(16c) Does __ plan to return to previous residence?"
                    :items="lookups.filter(lookup => lookup.column_number === '16c')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._16c == 1"
                >
                  <VTextField
                    v-model="member.demographic._16c_1"
                    label="(16c) WHEN to return"
                    type="number"
                    min="1600" max="9999" step="1"
                  />
                </VCol>



                <VCol
                  md="6"
                  cols="12"
                >
                <VSelect
                    v-model="member.demographic._16d"
                    label="(16d) What are the reasons why __ transferred in this barangay?"
                    :items="lookups.filter(lookup => lookup.column_number === '16d')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                <VSelect
                    v-model="member.demographic._16e"
                    label="(16e) Is Migration permanent?"
                    :items="lookups.filter(lookup => lookup.column_number === '16e')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                <VSelect
                    v-model="member.demographic._16f"
                    label="(16f) How long do they intend to stay in the community?"
                    :items="lookups.filter(lookup => lookup.column_number === '16f')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
              </VRow>
            </div>

            <!-- 👉 Form Actions -->
            <div class="mt-5">
              <VRow>
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click.prevent="onSubmit">
                    Save changes
                  </VBtn>

                  <VBtn
                    color="secondary"
                    variant="outlined"
                    type="reset"
                    @click.prevent="resetForm"
                  >
                    Reset
                  </VBtn>
                </VCol>
              </VRow>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    
    <VSnackbar
      v-model="isSnackbarSuccessVisible"
      location="top center"
      variant="flat"
      :color="type"
    >
      {{ alertMessage }}
      <template #actions>
        <VBtn
          color="white"
          @click="isSnackbarSuccessVisible = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </VRow>
</template>
