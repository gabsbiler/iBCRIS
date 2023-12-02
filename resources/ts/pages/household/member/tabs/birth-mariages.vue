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
            <!-- SKILLS DEVELOPMENT -->
            <div>
              <VText class="text-button ">
                <b>
                  BIRTH
                </b>
              </VText>
              <VRow class="mt-2">

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._17"
                    label="(17) In what City/ Municipality/ and province was born?"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                > 
                  <VSelect
                    v-model="member.demographic._18a"
                    label="(18) Is ____'s birth registered with the LRCO?"
                    :items="lookups.filter(lookup => lookup.column_number === '18')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._19b"
                    label="(19) Why was ___'s birth not registered?"
                    :items="lookups.filter(lookup => lookup.column_number === '19')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._20a"
                    label="(20a) Where was  __ delivered?"
                    :items="lookups.filter(lookup => lookup.column_number === '20a')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._20b"
                    label="(20b) Who attended in the delivery of __?"
                    :items="lookups.filter(lookup => lookup.column_number === '20b')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                
              </VRow>
            </div>

            <!-- MARRIAGE -->
            <div class="mt-5">
              <VText class="text-button ">
                <b>
                  MARRIAGE
                </b>
              </VText>
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._21"
                    label="(21) What is ______'s marital status?"
                    :items="lookups.filter(lookup => lookup.column_number === '21')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._22"
                    label="(22) When did ___'s marriage occur?"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="member.demographic._23"
                    label="(23) In what City/ Municipality/ and province did ___'s marriage occur?"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._24"
                    label="(24) Type of Marriage ceremony?"
                    :items="lookups.filter(lookup => lookup.column_number === '24')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                <VSelect
                    v-model="member.demographic._25"
                    label="(25) Is __'s marriage registered with the LCRO?"
                    :items="lookups.filter(lookup => lookup.column_number === '25')[0]?.lookup_list"
                    item-title="description"
                    item-value="lookup_key"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._26"
                    label="(26)Why was ___'s marriage not registered?"
                    :items="lookups.filter(lookup => lookup.column_number === '26')[0]?.lookup_list"
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
