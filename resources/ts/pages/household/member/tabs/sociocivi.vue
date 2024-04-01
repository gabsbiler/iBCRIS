<script setup>
import axios from '@axios';

const member = ref(props.member)
const lookups = ref(props.lookups)
const barangay = [
'Alitao',
'Alupay',
'Angeles Zone I (Pob.)',
'Angeles Zone II',
'Angeles Zone III',
'Angeles Zone IV',
'Angustias Zone I (Pob.)',
'Angustias Zone II',
'Angustias Zone III,',
'Angustias Zone IV',
'Anos',
'Ayaas',
'Baguio',
'Banilad',
'Calantas',
'Camaysa',
'Dapdap',
'Gibanga',
'Alsam Ibaba',
'Bukal Ibaba',
'Ilasan Ibaba',
'Nangka Ibaba',
'Palale Ibaba',
'Ibas',
'Alsam Ilaya',
'Bukal Ilaya',
'Ilasan Ilaya',
'Nangka Ilaya',
'Palale Ilaya',
'Ipilan',
'Isabang',
'Calumpang',
'Domoit Kanluran',
'Katigan Kanluran',
'Palale Kanluran',
'Lakawan',
'Lalo',
'Lawigue',
'Lita (Pob.)',
'Malaoa',
'Masin',
'Mate',
'Mateuna',
'Mayowe',
'Opias',
'Pandakaki',
'Pook',
'Potol',
'San Diego Zone I (Pob.)',
'San Diego Zone II',
'San Diego Zone III',
'San Diego Zone IV',
'San Isidro Zone I (Pob.)',
'San Isidro Zone II',
'San Isidro Zone III',
'San Isidro Zone IV',
'San Roque Zone I (Pob.)',
'San Roque Zone II',
'Domoit Silangan',
'Katigan Silangan',
'Palale Silangan',
'Talolong',
'Tamlong',
'Tongko',
'Valencia',
'Wakas'
]

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
  member.value.demographic._45 = null
  member.value.demographic._47 = null
  member.value.demographic._49_1 = null
  member.value.demographic._49_2 = null
  member.value.demographic._46 = null
  member.value.demographic._50 = null
  member.value.demographic._48 = null
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
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._43_1"
                    label="(43.1) Is there a member of the HH that has Mental Health Issues"
                    :items="lookups.filter(lookup => lookup.column_number === '43.1')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._43_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._43_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._43_2"
                    label="(43.2) Mental Health Issue"
                    :items="lookups.filter(lookup => lookup.column_number === '43.2')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._43_2 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._44_1"
                    label="(44.1) Is there a member of HH that has Nutritional Issues?"
                    :items="lookups.filter(lookup => lookup.column_number === '44.1')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._44_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._44_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._44_2"
                    label="(44.2) Nutritional Issue?"
                    :items="lookups.filter(lookup => lookup.column_number === '44.2')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._44_2 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                > 
                  <VSelect
                    v-model="member.demographic._45"
                    label="(45) Is there a member of HH that has any disabilities?"
                    :items="lookups.filter(lookup => lookup.column_number === '45')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._15a ? null : 'warning'"
                  />
                </VCol>
                
                <VCol
                cols="12"
                md="6"
                v-show="member.demographic._45 == 1"
                > 
                  <VTextField
                    v-model="member.demographic._45_1"
                    label="(45) Disability/ies"
                    :base-color="member.demographic._45_1 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._46"
                    label="(46) Is there a member of the HH that is a solo parent?"
                    :items="lookups.filter(lookup => lookup.column_number === '45')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._46 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._46 == 1"
                >
                  <VSelect
                    v-model="member.demographic._46_1"
                    label="Is he/ she registered?"
                    :items="lookups.filter(lookup => lookup.column_number === '46')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._46_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._47"
                    label="(47) Is there a member of Indegenous People(IPs)"
                    :items="lookups.filter(lookup => lookup.column_number === '47')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._47 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                cols="12"
                md="6"
                v-show="member.demographic._47 == 1"
                > 
                  <VTextField
                    v-model="member.demographic._47_1"
                    label="(47) Specify the ethnic group belongs to"
                    :base-color="member.demographic._47_1 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._48"
                    label="(48) Is __ a registered senior citizen?"
                    :items="lookups.filter(lookup => lookup.column_number === '48')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._48 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._49_1"
                    label="(49.1) Is there a member of LGBTQ++ in the House Hold?"
                    :items="lookups.filter(lookup => lookup.column_number === '49.1')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._49_1 ? null : 'warning'"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"

                  v-show="member.demographic._49_1 == 1"
                >
                  <VSelect
                    v-model="member.demographic._49_2"
                    label="(49.2) Select gender"
                    :items="lookups.filter(lookup => lookup.column_number === '49.2')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._49_2 ? null : 'warning'"
                  />
                </VCol>
              </VRow>
            </div>

            <div class="mt-5">
              <VRow class="mt-2">
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="member.demographic._50"
                    label="(50) Is __ a registered voter?"
                    :items="lookups.filter(lookup => lookup.column_number === '50')[0]?.lookup_list.map(item => ({ ...item, description: item.lookup_key + ' - ' + item.description }))"
                    item-title="description"
                    item-value="lookup_key"
                    :base-color="member.demographic._50 ? null : 'warning'"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                  v-show="member.demographic._50 == 1"
                >
                  <VSelect
                    v-model="member.demographic._50_1"
                    label="(50) To what brgy is ___ a registered voter?"
                    :items="barangay"
                    :base-color="member.demographic._50_1 ? null : 'warning'"
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
