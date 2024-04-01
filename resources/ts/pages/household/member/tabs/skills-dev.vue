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

const router = useRouter(); // This is the router instance

const goBack = () => {
  router.go(-1); // Navigate to the previous page
};
</script>

<template>
  <VRow v-if="member && lookups">
    <VCol cols="12">
      <VCard>
        <VCardText>
          <!-- 👉 Form -->
          <VForm>         
            <!-- SKILLS DEVELOPMENT -->
            <div v-show="member.demographic._7 >= 15" class="mb-5">
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
                    :items="lookups.filter(lookup => lookup.column_number === '13a')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._15a ? null : 'warning'"
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
                    :items="lookups.filter(lookup => lookup.column_number === '13b')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._13b ? null : 'warning'"
                  />
                </VCol>
              </VRow>
            </div>

            <!-- ECONOMIC ACTIVITY (FOR 15 YEARS OLD AND ABOVE) -->
            <div>
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
                    :items="lookups.filter(lookup => lookup.column_number === '14a')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._14a ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._14a == 9"
                >
                  <VTextField
                    v-model="member.demographic._14a_1"
                    label="(14a) Indicate Reason (for NOT WORKING)"
                    :base-color="member.demographic._14a_1 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._14a == 1"
                >
                  <VTextField
                    v-model="member.demographic._14a_2"
                    label="(14a) How many years working as OFW"
                    type="number"
                    :base-color="member.demographic._14a_2 ? null : 'warning'"
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
                    :base-color="member.demographic._14b ? null : 'warning'"
                  />
                </VCol>
                <!-- (14c) What is the major source of __'s income? -->
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._7 >= 15"
                >
                  <VSelect
                    v-model="member.demographic._14c"
                    label="(14c) What is the major source of __'s income?"
                    :items="lookups.filter(lookup => lookup.column_number === '14c')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._14c ? null : 'warning'"
                    
                  />
                </VCol>
                <!-- (14d) Monthly Income -->
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._14c == 1 || member.demographic._c == 2"
                >
                  <VTextField
                    v-model="member.demographic._14d"
                    label="(14d) Monthly Income"
                    :base-color="member.demographic._14c ? null : 'warning'"
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
                    :items="lookups.filter(lookup => lookup.column_number === '14e')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._14e ? null : 'warning'"
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
                    :base-color="member.demographic._14f ? null : 'warning'"
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
                    @click="goBack"
                  >
                    Back
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
