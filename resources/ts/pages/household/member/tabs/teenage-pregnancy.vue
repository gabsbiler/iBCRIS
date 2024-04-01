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
const isPregnant = ref(false)
const route = useRoute()


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

const resetForm = async() => {
  member.value.demographic._51 = null
  member.value.demographic._52 = null
  member.value.demographic._53_1 = null
  member.value.demographic._53_2 = null
  member.value.demographic._54 = null
  member.value.demographic._55 = null
  member.value.demographic._56 = null
  member.value.demographic._57 = null
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
              <VText class="text-button ">
                <b>
                  Teenage Pregnancy
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  cols="12"
                >
                <VSelect
                  v-model="isPregnant"
                  label="Is the household engaged in a teenage pregnancy incident in the last 3 years?"
                  :items="[{ description: 'Yes', lookup_key: true }, { description: 'No', lookup_key: false }]"
                  item-title="description"
                  item-value="lookup_key"
                />
                </VCol>
              </VRow>
              <VRow v-show="isPregnant == true">
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._51"
                    label="(51) When the incidence occurred?"
                    min="1960" max="2999"
                    type="number"
                    :base-color="member.demographic._51 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._51_1"
                    label="(51) Age during the incidence occurred?"
                    min="0" max="999"
                    type="number"
                    :base-color="member.demographic._51_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._52"
                    label="(52) Age of Father of the child during incidence occurred?"
                    min="0" max="999"
                    type="number"
                    :base-color="member.demographic._52 ? null : 'warning'"
                  />
                </VCol>

                
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._53_1"
                    label="(53.1) Is teenager studying?"
                    :items="lookups.filter(lookup => lookup.column_number === '53.1')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._53_1 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                  v-show="member.demographic._53_1==1"
                >
                  <VTextField
                    v-model="member.demographic._54_1"
                    label="(54.1) Where he/she studying"
                    :base-color="member.demographic._54_1 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._53_2"
                    label="(53.2) Is Father Studying?"
                    :items="lookups.filter(lookup => lookup.column_number === '53.2')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._53_2 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  v-show="member.demographic._53_2 == 1"
                >
                  <VTextField
                    v-model="member.demographic._54"
                    label="(54) Where he/she is studying?"
                    :base-color="member.demographic._54 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._55"
                    label="(55) Delivery Complication?"
                    :items="lookups.filter(lookup => lookup.column_number === '55')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._55 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  v-show="member.demographic._55==1"
                >
                  <VTextField
                    v-model="member.demographic._56"
                    label="(56) What are the complications?"
                    :base-color="member.demographic._56 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._57"
                    label="(57) Next Action Plan"
                    :items="lookups.filter(lookup => lookup.column_number === '57')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._57 ? null : 'warning'"
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
