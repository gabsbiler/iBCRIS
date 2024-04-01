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


const onSubmit = async() => {
  try {
    const response = await axios.post('/api/updateDeceasedMember', member.value.demographic);

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


const resetForm = async() => {
  member.value.demographic._27a = null
  member.value.demographic._27b = null
  member.value.demographic._27c = null
  member.value.demographic._28 = null
  member.value.demographic._29 = null
  member.value.demographic._30 = null
  member.value.demographic._31 = null
  member.value.demographic._32 = null
  member.value.demographic._33 = null
  member.value.demographic._34 = null
  member.value.demographic._35 = null
  member.value.demographic._36 = null
  member.value.demographic._37 = null
  member.value.demographic._38 = null
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
            <div>
              <VText>
                <b>
                  DEATH INFORMATION
                </b>
                <p>Person who died in the last five years</p>
              </VText>
              <VRow class="mt-2">
                <!-- <VCol
                  cols="12"
                  md="4"
                >
                  <VTextField
                    v-model="member.demographic._27a"
                    label="(27a) Surname"
                    :base-color="member.demographic._27a ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <VTextField
                    v-model="member.demographic._27b"
                    label="(27b) Given Name"
                    :base-color="member.demographic._27b ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <VTextField
                    v-model="member.demographic._27c"
                    label="(27c) Middle Name"
                    :base-color="member.demographic._27c ? null : 'warning'"
                  />
                </VCol> -->
                <!-- <VCol
                  md="6"
                  cols="12"
                > 
                  <VSelect
                    v-model="member.demographic._28"
                    label="(28) Relationship of the deceased to the Household Head"
                    :items="lookups.filter(lookup => lookup.column_number === '28')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._28 ? null : 'warning'"
                  />
                </VCol> -->
                
                <!-- <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._29"
                    label="(29) Is __ Male or Female?"
                    :items="lookups.filter(lookup => lookup.column_number === '29')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._29 ? null : 'warning'"
                  />
                </VCol> -->
                <!-- <VCol
                  cols="12"
                  md="4"
                >
                  <AppDateTimePicker
                    v-model="member.demographic._30"
                    label="(30) Date of Birth"
                    :base-color="member.demographic._30 ? null : 'warning'"
                  />
                </VCol> -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppDateTimePicker
                    v-model="member.demographic._31"
                    label="(31) Date of Death"
                    :base-color="member.demographic._31 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._32"
                    label="(32) Age at the time of death"
                    :base-color="member.demographic._32 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._33"
                    label="(33) Place of Death (Municipal/City, Province)"
                    :base-color="member.demographic._33 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._34"
                    label="(34) What is __'s cause of death?"
                    :base-color="member.demographic._34 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._35"
                    label="(35) Is ____'s death registered with the LCRO?"
                    :items="lookups.filter(lookup => lookup.column_number === '35')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._35 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._36"
                    label="(36) Why was ___'s death not registered?"
                    :items="lookups.filter(lookup => lookup.column_number === '36')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._36 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._37"
                    label="(37) Is deceased female age 15-49?"
                    :items="lookups.filter(lookup => lookup.column_number === '37')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._37 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._38"
                    label="(38) Maternal Condition"
                    :items="lookups.filter(lookup => lookup.column_number === '38')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._38 ? null : 'warning'"
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
