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
  member.value.demographic._13a = null
  member.value.demographic._13b = null

  member.value.demographic._14a = null
  member.value.demographic._14b = null
  member.value.demographic._14c = null
  member.value.demographic._14d = null
  member.value.demographic._14e = null
  member.value.demographic._14f = null

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


</script>

<template>
  <VRow v-if="member && lookups">
    <VCol cols="12">
      <VCard>
        <VCardText>
          <!-- 👉 Form -->
          <VForm>         
            <!-- SKILLS DEVELOPMENT -->
            <div>
              <VText class="text-button ">
                <b>
                  SKILLS DEVELOPMENT
                </b>
              </VText>
              <VRow class="mt-2">
                <!-- (13a) What type of skills do you have? -->
                <VCol
                  md="6"
                  cols="12"
                > 
                  <VSelect
                    v-model="member.demographic._13a"
                    label="(13a) What type of skills do you have?"
                    :items="lookups.filter(lookup => lookup.column_number === '13a')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <!-- (13a) What type of skills do you have? -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._13b"
                    label="(13b) What type of skills development training is __ interested to join?"
                    :items="lookups.filter(lookup => lookup.column_number === '13a')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
              </VRow>
            </div>

            <!-- ECONOMIC ACTIVITY (FOR 15 YEARS OLD AND ABOVE) -->
            <div class="mt-5">
              <VText class="text-button ">
                <b>
                  ECONOMIC ACTIVITY (FOR 15 YEARS OLD AND ABOVE)
                </b>
              </VText>
              <VRow class="mt-2">
                <!-- (14a) Indicator for OFW/OCW and Not Working? -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._14a"
                    label="(14a) Indicator for OFW/OCW and Not Working?"
                    :items="lookups.filter(lookup => lookup.column_number === '14a')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <!-- (14b) What is __'s usual activity/ occupation during the past 12 months? -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._14b"
                    label="(14b) What is __'s usual activity/ occupation during the past 12 months?"
                  />
                </VCol>
                <!-- (14c) What is the major source of __'s income? -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._14c"
                    label="(14c) What is the major source of __'s income?"
                    :items="lookups.filter(lookup => lookup.column_number === '14c')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <!-- (14d) Monthly Income -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._14d"
                    label="(14d) Monthly Income"
                  />
                </VCol>
                <!-- (14e) What is the status of __'s work/ business? -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._14e"
                    label="(14e) What is the status of __'s work/ business?"
                    :items="lookups.filter(lookup => lookup.column_number === '14e')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <!-- (14f) In what barangay and city/ municipality is __'s work/business located? -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._14f"
                    label="(14f) In what barangay and city/ municipality is __'s work/business located?"
                  />
                </VCol>
              </VRow>
            </div>

            <!-- RESIDENCY -->
            <div class="mt-5">
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
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._15b"
                    label="(15b) Before moving in this housing unit, where did __ reside?"
                    :items="lookups.filter(lookup => lookup.column_number === '15b')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._15c"
                    label="(15c) In what barangay/ city/ municipality did __ resides before?"
                  />
                </VCol>
              </VRow>
            </div>

            <!-- MIGRATION -->
            <div class="mt-5">
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
                    :items="lookups.filter(lookup => lookup.column_number === '16a')[0]?.lookup_list"
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
                    :items="lookups.filter(lookup => lookup.column_number === '16b')[0]?.lookup_list"
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
                    label="(16c) Does __ plan to return to previous residence? When?"
                    :items="lookups.filter(lookup => lookup.column_number === '16c')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                <VSelect
                    v-model="member.demographic._16d"
                    label="(16d) What are the reasons why __ transferred in this barangay?"
                    :items="lookups.filter(lookup => lookup.column_number === '16d')[0]?.lookup_list"
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
                    :items="lookups.filter(lookup => lookup.column_number === '16d')[0]?.lookup_list"
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
                    :items="lookups.filter(lookup => lookup.column_number === '16f')[0]?.lookup_list"
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
