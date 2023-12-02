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
                  For all member of Household Members
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  cols="12"
                  md="6"
                > 
                  <VSelect
                    v-model="member.demographic._45"
                    label="(45) Is there a member of HH that has any disabilities?"
                    :items="lookups.filter(lookup => lookup.column_number === '45')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._47"
                    label="(47) Is there a member of Indegenous People(IPs)"
                    :items="lookups.filter(lookup => lookup.column_number === '47')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._49_1"
                    label="(49.1) Is there a member of LGBTQ++ in the House Hold?"
                    :items="lookups.filter(lookup => lookup.column_number === '49.1')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._49_2"
                    label="(49.2) LGBTQ++"
                    :items="lookups.filter(lookup => lookup.column_number === '49.2')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
              </VRow>
            </div>

            <div class="mt-5">
              <VText class="text-button ">
                <b>
                  for 10 years old & above
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._46"
                    label="(46) Is there a member of HH that  is a solo parent? Is he/ she registered?"
                    :items="lookups.filter(lookup => lookup.column_number === '46')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
              </VRow>
            </div>

            <div class="mt-5">
              <VText class="text-button ">
                <b>
                  for 15 years old and above	
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._50"
                    label="(50) Is __ a registered voter?"
                    :items="lookups.filter(lookup => lookup.column_number === '50')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
              </VRow>
            </div>

            <div class="mt-5">
              <VText class="text-button ">
                <b>
                  for 60 years old & above
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._48"
                    label="(48) Is __ a registered senior citizen?"
                    :items="lookups.filter(lookup => lookup.column_number === '48')[0]?.lookup_list"
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
