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


const submitForm = async () => {
  try {

    const response = await axios.post('/api/household/member/update', { data: member.value })

    fetchMember()
    alertMessage.value = response.data.message
    isSnackbarSuccessVisible.value = true
    type.value = "success"

  } catch (error) {
    alertMessage.value = error
    isSnackbarSuccessVisible.value = true
    type.value = "error"
  }
}

const resetForm = async() => {
  member.value.demographic._13a = null
  member.value.demographic._13b = null
}


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
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._26"
                    label="(26) Place of Death"
                  />
                </VCol> -->
                <VCol
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._27"
                    label="(27) Name of household member (Surname, Given Name, Middle Name)"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                > 
                  <VSelect
                    v-model="member.demographic._28"
                    label="(28) Relationship of the deceassed to the household Head"
                    :items="lookups.filter(lookup => lookup.column_number === '28')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._29"
                    label="(29) Is __ Male or Female?"
                    :items="lookups.filter(lookup => lookup.column_number === '29')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <AppDateTimePicker
                    v-model="member.demographic._30"
                    label="(30) Date of Birth"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <AppDateTimePicker
                    v-model="member.demographic._31"
                    label="(31) Date of Death"
                  />
                </VCol>
                <VCol
                  md="4"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._32"
                    label="(32) Age at the time of death"
                  />
                </VCol>
                <VCol
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._33"
                    label="(33) Place of Death (Municipal/City, Province)"
                  />
                </VCol>
                <VCol
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._34"
                    label="(34) What is __'s cause of death?"
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
                  <VBtn @click.prevent="submitForm">
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
