<script setup>
import axios from '@axios';
import avatar1 from '@images/avatars/avatar-1.png';

const member = ref(props.member)
// const lookups = ref(props.lookups)
// const member = ref()
const lookups = ref([])

const props = defineProps({
  member: Array,
  // lookups: Array
})

const refInputEl = ref()
let avatarImg = ref(avatar1)

const alertMessage = ref()
const type = ref()
const isSnackbarSuccessVisible = ref(false)

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        avatarImg.value= fileReader.result
    }
  }
}

async function fetchLookup() {
  try {
    const response = await axios.get('/api/lookup/')
    lookups.value = response.data
  } catch (error) {
    console.error("Error fetching lookups:", error)
  }
}

const resetAvatar = () => {
  avatarImg.value = avatar1
}

const route = useRoute()

const resetForm = async() => {
  member.value.demographic.lastname = null
  member.value.demographic.firstname = null
  member.value.demographic.middlename = null
  member.value.demographic._3 = null
  member.value.demographic._4 = null
  member.value.demographic._5 = null
  member.value.demographic._6 = null
  member.value.demographic._7 = null
  member.value.demographic._8 = null
  member.value.demographic._9 = null
  member.value.demographic._10 = null
  member.value.demographic._11 = null
  member.value.demographic._12a = null
  member.value.demographic._12b = null
  member.value.demographic._12c = null

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
    console.log(error)
  }
}

const calculatedAge = computed(() => {
  if (!member.value.demographic._6) return 0;

  const birthDate = new Date(member.value.demographic._6);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDayDifference = today.getMonth() - birthDate.getMonth();

  if (monthDayDifference < 0 || (monthDayDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  member.value.demographic._7 = age.toString()
  return age;
});

onBeforeMount(() => {
  fetchLookup()
})
// fetchLookup()

</script>

<template>
  <VRow v-if="member && lookups">
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="sm"
            size="120"
            class="me-6"
            :image="avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-4">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>
            <p class="text-xs mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
          <VSpacer />
          <!-- <VBtn
            icon="mdi-content-save-outline"
            @click.prevent="submitForm"
          /> -->
        </VCardText>
        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" @submit.prevent="onSubmit" ref="refForm">
            <!-- DEMOGRAPHICS CHARACTERISTICS -->
            <div>
              <VText class="text-button">
                <b>
                  DEMOGRAPHICS CHARACTERISTICS
                </b>
              </VText>
              <VRow class="mt-2">
                <!-- Last Name -->
                <VCol
                  md="4"
                  cols="12"
                >
                  <VTextField 
                    v-model="member.demographic.lastname"
                    label="Last Name"
                    :base-color="member.demographic.lastname ? null : 'warning'"
                  />
                </VCol>
                <!-- First Name -->
                <VCol
                  md="4"
                  cols="12"
                >
                  <VTextField 
                    v-model="member.demographic.firstname"
                    label="First Name"
                    :base-color="member.demographic.firstname ? null : 'warning'"
                  />
                </VCol>
                <!-- Middle Name -->
                <VCol
                  md="4"
                  cols="12"
                >
                  <VTextField 
                    v-model="member.demographic.middlename"
                    label="Middle Name"
                    :base-color="member.demographic.middlename ? null : 'warning'"
                  />
                </VCol>
                <!-- How is __ related to household head? -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._3"
                    label="(3) How is __ related to household head?"
                    :items="lookups.filter(lookup => lookup.column_number === '3')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._3 ? null : 'warning'"
                  />
                </VCol>
                <!-- (4) Family Nucleus -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._4"
                    label="(4) Family Nucleus"
                    :items="lookups.filter(lookup => lookup.column_number === '4')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._4 ? null : 'warning'"
                  />
                </VCol>
                <!-- (5) is __ Male or Female -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._5"
                    label="(5) is __ Male or Female"
                    :items="lookups.filter(lookup => lookup.column_number === '5')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._5 ? null : 'warning'"
                    
                  />
                </VCol>
                <!-- (6) When was ____ born? (mm-dd-yyyy) -->
                <VCol cols="12" md="4">
                  <AppDateTimePicker
                    v-model="member.demographic._6"
                    label="(6) When was ____ born? (mm-dd-yyyy)"
                    :base-color="member.demographic._6 ? null : 'warning'"
                  />
                </VCol>
                <VCol cols="12" md="4">
                  <VTextField
                    v-model="member.demographic._7"
                    :value="calculatedAge"
                    label="(7) How old is ___ as of his/her last birthday?"
                    :base-color="member.demographic._7 ? null : 'warning'"
                  />
                </VCol>
                <!-- (8) What __'s citizenship? -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._8"
                    label="(8) What __'s citizenship?"
                    :items="lookups.filter(lookup => lookup.column_number === '8')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._8 ? null : 'warning'"
                  />
                </VCol>
                <!-- (9) What is ____'s religion/ religious affiliation? -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._9"
                    label="(9) What is ____'s religion/ religious affiliation?"
                    :items="lookups.filter(lookup => lookup.column_number === '9')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._9 ? null : 'warning'"
                  />
                </VCol>
                <!-- (10) What is ____'s ethnicity? -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._10"
                    label="(10) What is ____'s ethnicity?"
                    :items="lookups.filter(lookup => lookup.column_number === '10')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._10 ? null : 'warning'"
                  />
                </VCol>
                <!-- (11) What is __'s highest educational attainment? -->
                <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="member.demographic._11"
                    label="(11) What is __'s highest educational attainment?"
                    :items="lookups.filter(lookup => lookup.column_number === '11')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._11 ? null : 'warning'"
                  />
                </VCol>
                <!-- (12a) Is __ currently enrolled? -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="member.demographic._12a"
                    label="(12a) Is __ currently enrolled?"
                    :items="lookups.filter(lookup => lookup.column_number === '12a')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._12a ? null : 'warning'"
                  />
                </VCol>
                <!-- (12b) What type of school is __ on? -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                  
                    v-model="member.demographic._12b"
                    label="(12b) What type of school is __ on?"
                    :items="lookups.filter(lookup => lookup.column_number === '12b')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._12b ? null : 'warning'"
                  />
                </VCol>
                <!-- (12c) In what baranagay and city/ municipality is __ currently attending school? -->
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextField 
                    v-model="member.demographic._12c"
                    label="(12c) In what baranagay and city/ municipality is __ currently attending school?"
                    :base-color="member.demographic._12c ? null : 'warning'"
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
                  <VBtn type="submit" @click="refForm?.validate()">
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
