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
  member.value.demographic._39a = null
  member.value.demographic._39b = null
  member.value.demographic._39c_1 = null
  member.value.demographic._39c_2 = null
  member.value.demographic._39d = null
  member.value.demographic._39e_1 = null
  member.value.demographic._39e_2 = null
  member.value.demographic._40 = null
  member.value.demographic._41a = null
  member.value.demographic._41b = null
  member.value.demographic._42_1 = null
  member.value.demographic._42_2 = null
  member.value.demographic._43_1 = null
  member.value.demographic._43_2 = null
  member.value.demographic._44_1 = null
  member.value.demographic._44_2 = null
}


</script>

<template>
  <VRow v-if="member && lookups">
    <VCol cols="12">
      <VCard>
        <VCardText>
          <!-- 👉 Form -->
          <VForm >         
            <!-- PREGNANCY -->
            <div v-show="member.demographic._5 == 2 && member.demographic._7 >= 10 && member.demographic._7 <= 54">
              <VText class="text-button ">
                <b>
                  PREGNANCY
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._39a"
                    label="(39a) Any pregnant female members in this household?"
                    :items="lookups.filter(lookup => lookup.column_number === '39a')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._39a ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                  v-show="member.demographic._39a == 1"
                >
                  <VTextField
                    v-model="member.demographic._39b"
                    label="(39b) Number of Pregnancies"
                    :base-color="member.demographic._39b ? null : 'warning'"
                  />
                </VCol>
              </VRow>
            </div>

            <div class="mt-5" v-show="member.demographic._5 == 2 && member.demographic._7 >= 10 && member.demographic._7 <= 54">
              <VText class="text-button ">
                <b>
                  FAMILY PLANNING (For Women 10-54 yrs old)
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  cols="12"
                  md="6"
                  
                >
                  <VSelect
                    v-model="member.demographic._39c_1"
                    label="(39c.1) Is female age 10-54 using Family Planning Method?"
                    :items="lookups.filter(lookup => lookup.column_number === '39c.1')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._39c_1 ? null : 'warning'"
                    
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  v-show="member.demographic._39c_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._39c_2"
                    label="(39c.2) Family Planning Method?"
                    :items="lookups.filter(lookup => lookup.column_number === '39c.2')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._39c_2 ? null : 'warning'"
                    
                  />
                </VCol>
                
                <VCol
                  cols="12"
                  md="6"
                  v-show="member.demographic._39c_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._39d"
                    label="(39d) Where did they obtain the FP method?"
                    :items="lookups.filter(lookup => lookup.column_number === '39d')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._39d ? null : 'warning'"
                    
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._39e_1"
                    label="(39e.1) Is there any intension to use Modern FP method?"
                    :items="lookups.filter(lookup => lookup.column_number === '39e.1')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._39e_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._39e_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._39e_2"
                    label="(39e.2) Modern FP method?"
                    :items="lookups.filter(lookup => lookup.column_number === '39e.2')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._39e_2 ? null : 'warning'"
                  />
                </VCol>
              </VRow>
            </div>

            <div class="mt-5">
              <VText class="text-button ">
                <b>
                  For all member of Household Members
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="member.demographic._40"
                    label="(40) What is the primary health insurance __ have?"
                    :items="lookups.filter(lookup => lookup.column_number === '40')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._40 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="member.demographic._41a"
                    label="(41a) What facility did __ visited in the past 12 months?"
                    :items="lookups.filter(lookup => lookup.column_number === '41a')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._41a ? null : 'warning'"
                  />
                </VCol>
                
                <VCol
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._41b"
                    label="(41b) What is the reason for the visit in health facility?"
                    :items="lookups.filter(lookup => lookup.column_number === '41b')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._41b ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._42_1"
                    label="(42.1) Is there a member of the HH that undergo Continuous Medical Care"
                    :items="lookups.filter(lookup => lookup.column_number === '42.1')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._42_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._42_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._42_2"
                    label="(42.2) Continuous Medical Care"
                    :items="lookups.filter(lookup => lookup.column_number === '42.2')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._42_2 ? null : 'warning'"
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
