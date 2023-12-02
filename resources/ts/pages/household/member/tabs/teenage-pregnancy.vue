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
              <VText class="text-button ">
                <b>
                  Teenage Pregnancy
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppDateTimePicker
                    v-model="member.demographic._51"
                    label="(51) When the incidence occurred?"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._52"
                    label="(52) Age of Father of the child during incidence occurred?"
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
                  />
                </VCol>
                <VCol
                  cols="12"
                >
                  <VTextField
                    v-model="member.demographic._54"
                    label="(54) Where he/she is studying?"
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
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._56"
                    label="(56) What are the complications?"
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
