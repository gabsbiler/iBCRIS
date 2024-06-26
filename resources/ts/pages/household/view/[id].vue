<script setup lang="ts">
import axios from '@axios';
import backdrop from '@images/pages/background-1.jpg';
import { VDataTable } from 'vuetify/labs/VDataTable';

const route = useRoute()
const router = useRouter()
const householdInfo = ref()
const containers = ref()
const progress = ref(97)
const search = ref()
const searchDeceased = ref()
const containerId = ref()

const lookups = ref([])

const folderLoading = ref(false)

const addMemberConfirmationBox = ref(false)
const deleteMemberConfirmationBox = ref(false)

const memberIdToDelete = ref(null);

const isSnackbarSuccessVisible = ref(false)
const alertMessage = ref()
const type = ref()

const deceasedCount = ref()

const showSnackBar = data => {
  alertMessage.value = data.message
  type.value = data.type
  isSnackbarSuccessVisible.value = true
}
// 

async function fetchData(){
  try {
    const id = route.params.id
    const response = await axios.get('/api/household-list',{
      params: {id:route.query.household_id}
    })

    householdInfo.value = response.data
    containerId.value = householdInfo.value.household_container.id

    deceasedCount.value = householdInfo.value.household_members.filter(item => {
      if(item.demographic.tags == 'dead') {
        return item
      }
    }).length
  } catch (error) {
    console.log(error)
  }

  try {
    const response = await axios.get('/api/container');
    containers.value = response.data

  } catch (error) {
    console.error(error);
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

const updateContainer = async () => {
  folderLoading.value=true
  try {
    const response = await axios.put(`/api/household/${route.query.household_id}/update-container`, {
      container_id: containerId.value
    });
    showSnackBar({message: response.data.message, type: 'success'})
    folderLoading.value=false

  } catch (error) {
    showSnackBar({message: error, type: 'error'})
    folderLoading.value=false
  }
};

async function addMember () {
  try {
    const response = await axios.post('/api/addMember',{
        household_id:route.query.household_id
    })

    router.push('/household/member/demographics?member_id='+response.data.household_member_id+'&household_id='+route.query.household_id)
  } catch (error) {
    console.log(error)
  }

}

const deleteItem = async () => {
  try {
    // Make the delete request
    await axios.delete(`/api/household/member`, { data: { household_member_id: memberIdToDelete.value } });
    showSnackBar({ message: 'Household member successfully deleted', type: 'success' });

    // Refresh the table data
    fetchData();
  } catch (error) {
    showSnackBar({ message: error.response.data.message, type: 'warning' });
  }
  // Reset memberIdToDelete and close the dialog
  memberIdToDelete.value = null;
  deleteMemberConfirmationBox.value = false;
};

// Function to trigger the delete confirmation dialog
const confirmDelete = (id) => {
  memberIdToDelete.value = id;
  deleteMemberConfirmationBox.value = true;
};

const headers = [
  {
    title: "Full Name",
    key: 'name',
  },
  {
    title: "Relationship",
    key: 'demographic.relationship',
  },
  {
    title: "Sex",
    key: 'demographic.sex',
  },
  {
    title: "Age",
    key: 'demographic.age',
  },
  {
    title: "Status",
    key: 'demographic.tags',
  },
  // {
  //   title: "Info Progress",
  //   key: 'Progress',
  // },
  {
    title: "Action",
    key: 'actions',
  },
]

onMounted(() => {
  fetchData()
  fetchLookup()
  
})


const updateHouseholdSurveyStatus = async (householdId, newSurveyStatus) => {
  try {
    
    const response = await axios.put('/api/household/survey-status', {
      household_id: householdId,
      surveyStatus: !newSurveyStatus
    });
    showSnackBar({ message: response.data.message, type: 'success' });
    householdInfo.value.surveyStatus = !newSurveyStatus
  } catch (error) {
    showSnackBar({ message: error.response.data.message, type: 'error' });
  }
};

</script>

<template>
  <section>
    <VCard v-if="householdInfo && lookups">
      <VImg
        :src="backdrop"
        min-height="125"
        max-height="175"
        cover
      />

      <VCardText
        class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-4"
        style="min-height: 125px;"
      >

        <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
          <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
            <VRow>
              <VCol
                cols="12"
                sm="8"
                class="d-flex flex-column"
              >
                <div class="d-flex gap-x-5">
                  <span class="d-flex align-center" v-if="householdInfo.Barangay">
                    <VText>Brgy: <b>{{ householdInfo.Barangay }}</b></VText>
                  </span>
                  <span class="d-flex align-center" v-if="householdInfo.sitio">
                    <VText>Purok/Sitio: <b>{{ householdInfo.sitio }}</b></VText>
                  </span>
                  <span class="d-flex align-center" v-if="householdInfo.BSN">
                    <VText>BSN: <b>{{ householdInfo.BSN }}</b></VText>
                  </span>
                  <span class="d-flex align-center" v-if="householdInfo.HUSN">
                    <VText>HUSN: <b>{{ householdInfo.HUSN }}</b></VText>
                  </span>
                  <span class="d-flex align-center" v-if="householdInfo.HSN">
                    <VText>HSN: <b>{{ householdInfo.HSN }}</b></VText>
                  </span>
                </div>
                <div class="d-flex" v-if="householdInfo.address">
                    <VText>Complete Address: <b>{{ householdInfo.address }}</b></VText>
                </div>
              </VCol>
              <VCol 
                class="d-flex flex-column gap-y-2"
                cols="12"
                sm="4"
              >
                <VRow>
                  <VCol>
                    <VSelect 
                      v-model=containerId
                      :items="containers" 
                      item-title="name" 
                      item-value="id" 
                      density="compact" 
                      label="Record Batch"
                      @update:modelValue="updateContainer"
                      :loading="folderLoading"
                    />
                  </VCol>
                  <VCol>
                    <EditHouseholdDialog :household-data="householdInfo" @finish="fetchData"/>
                  </VCol>
                </VRow>
                
                <VBtn
                  @click="() => {updateHouseholdSurveyStatus(householdInfo.id, householdInfo.surveyStatus)}"
                  :color="householdInfo.surveyStatus ? 'success' : 'warning'"
                >
                  {{householdInfo.surveyStatus ? 'Completed' : 'Mark as Complete'}}
                </VBtn>
              </VCol>
            </VRow>
          </div>
        </div>
      </VCardText>
    </VCard>

    <VCard
      v-if="householdInfo"
      class="mt-3"
    >
      <VCardText>
        <VRow>
          <VCol  class="d-flex gap-x-3">
            <VBtn
              color="primary"
              @click="addMemberConfirmationBox = true"
            >
              Add Member
            </VBtn>
          </VCol>
          <VCol class="d-flex justify-end">
            <VTextField
              v-model="search"
              density="compact"
              label="Search"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              dense
              outlined
              style="max-width: 20rem;"
            />
          </VCol>
          
          <ConfirmDialog 
            :isDialogVisible="addMemberConfirmationBox" 
            confirmationQuestion="Add another member?" 
            @confirm="addMember"
            @cancel="addMemberConfirmationBox=false"
          />
          <VBtn
            class="me-3 my-3 d-md-none"
            color="primary"
            icon="mdi-plus"
          />
        </VRow>
      </VCardText>
      
      <VCardText>
        <VDataTable
          :headers="headers"
          :items="householdInfo.household_members.filter(item => {
            if(item.demographic.tags == 'alive') {
              return item
            }
          })"
          :search="search"
        >
          <template #item.actions="{ item }">
            <div class="d-flex px-auto gap-1">
              <IconBtn @click="confirmDelete(item.raw.id)">
                <VIcon icon="mdi-delete-outline" />
              </IconBtn>
              <IconBtn>
                <RouterLink :to="{name: 'household-member-tab', params: {tab: 'demographics'}, query:{
                  member_id:item.raw.id,
                  household_id: item.raw.household_id}}">
                  <VIcon
                    icon="
                  mdi-information-slab-circle-outline"
                  />
                </RouterLink>
              </IconBtn>
            </div>
          </template>

          <template #item.name="{ item }">
            {{ item.raw.demographic.lastname +', '+ item.raw.demographic.firstname + ' '+ item.raw.demographic.middlename }}
          </template>
          <!-- lookups.value.find(lookup => lookup.lookup_name === 'Relationship').find(lookupkey => lookupkey === '') -->
          <template #item.demographic.relationship="{ item }">
            {{lookups.filter(lookup => lookup.column_number === '3')[0]?.lookup_list.filter(lookupkey => lookupkey.lookup_key === item.raw.demographic._3)[0]?.description || "Not Specified" }}
          </template>

          <template #item.demographic.sex="{ item }">
            {{lookups.filter(lookup => lookup.column_number === '5')[0]?.lookup_list.filter(lookupkey => lookupkey.lookup_key === item.raw.demographic._5)[0]?.description || "Not Specified"}}
          </template>

          <template #item.demographic.age="{ item }">
            {{
              new Date().getFullYear() - new Date(item.raw.demographic._6).getFullYear() - (new Date().getMonth() < new Date(item.raw.demographic._6).getMonth() || (new Date().getMonth() === new Date(item.raw.demographic._6).getMonth() && new Date().getDate() < new Date(item.raw.demographic._6).getDate()) ? 1 : 0)
            }}
          </template>

          <template #item.demographic.tags="{ item }">
            <span v-for="(val, index) in item.raw.demographic.tags.split(',')" :key="index">
              <span v-if="val.trim() == 'alive'">
                <VChip
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  Alive
              </VChip>
              </span>
              <span v-if="val.trim() == 'teenage_pregnancy'">
                <VChip
                  color="gray"
                  class="font-weight-medium"
                  size="small"
                >
                  Teenage Pregnancy
              </VChip>
              </span>
              <span v-if="val.trim() == 'dead'">
                <VChip
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  Deceased
                </VChip>
              </span>
              
              
            </span>
          </template>

        </VDataTable>
      </VCardText>
    </VCard>

    <VCard
      v-if="householdInfo && deceasedCount>0"
      class="mt-3"
    >
      <VCardText>
        <VRow>
          <VCol class="d-flex justify-space-between">
            <div class="text-h6">
              Deceased Members
            </div>
            <VTextField
              v-model="searchDeceased"
              density="compact"
              label="Search"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              dense
              outlined
              style="max-width: 20rem;"
            />
          </VCol>

          <VBtn
            class="me-3 my-3 d-md-none"
            color="primary"
            icon="mdi-plus"
          />
        </VRow>
      </VCardText>
      
      <VCardText>
        <VDataTable
          :headers="headers"
          :items="householdInfo.household_members.filter(item => {
            if(item.demographic.tags == 'dead') {
              return item
            }
          })"
          :search="searchDeceased"
        >
          <template #item.actions="{ item }">
            <div class="d-flex px-auto gap-1">
              <IconBtn @click="confirmDelete(item.raw.id)">
                <VIcon icon="mdi-delete-outline" />
              </IconBtn>
              <IconBtn>
                <RouterLink :to="{name: 'household-member-tab', params: {tab: 'demographics'}, query:{
                  member_id:item.raw.id,
                  household_id: item.raw.household_id}}">
                  <VIcon
                    icon="
                  mdi-information-slab-circle-outline"
                  />
                </RouterLink>
              </IconBtn>
            </div>
          </template>

          <template #item.name="{ item }">
            {{ item.raw.demographic.lastname +', '+ item.raw.demographic.firstname + ' '+ item.raw.demographic.middlename }}
          </template>
          <!-- lookups.value.find(lookup => lookup.lookup_name === 'Relationship').find(lookupkey => lookupkey === '') -->
          <template #item.demographic.relationship="{ item }">
            {{lookups.filter(lookup => lookup.column_number === '3')[0]?.lookup_list.filter(lookupkey => lookupkey.lookup_key === item.raw.demographic._3)[0]?.description || "Not Specified" }}
          </template>

          <template #item.demographic.sex="{ item }">
            {{lookups.filter(lookup => lookup.column_number === '5')[0]?.lookup_list.filter(lookupkey => lookupkey.lookup_key === item.raw.demographic._5)[0]?.description || "Not Specified"}}
          </template>

          <template #item.demographic.age="{ item }">
            {{
              new Date().getFullYear() - new Date(item.raw.demographic._6).getFullYear() - (new Date().getMonth() < new Date(item.raw.demographic._6).getMonth() || (new Date().getMonth() === new Date(item.raw.demographic._6).getMonth() && new Date().getDate() < new Date(item.raw.demographic._6).getDate()) ? 1 : 0)
            }}
          </template>

          <template #item.demographic.tags="{ item }">
            <span v-for="(val, index) in item.raw.demographic.tags.split(',')" :key="index">
              <span v-if="val.trim() == 'alive'">
                <VChip
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  Alive
              </VChip>
              </span>
              <span v-if="val.trim() == 'teenage_pregnancy'">
                <VChip
                  color="gray"
                  class="font-weight-medium"
                  size="small"
                >
                  Teenage Pregnancy
              </VChip>
              </span>
              <span v-if="val.trim() == 'dead'">
                <VChip
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  Deceased
                </VChip>
              </span>
              
              
            </span>
          </template>

        </VDataTable>
      </VCardText>
    </VCard>

    <!-- Confirmation Dialog for Deletion -->
    <ConfirmDialog 
        :isDialogVisible="deleteMemberConfirmationBox" 
        confirmationQuestion="This will be deleted permanently. Are you sure?" 
        @confirm="deleteItem"
        @cancel="deleteMemberConfirmationBox = false"
      />
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
  </section>
</template>

<style lang="scss">
.user-profile-avatar {
  border: 5px solid rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-surface)) !important;
  inset-block-start: -3rem;

  .v-img__img {
    border-radius: 0.125rem;
  }
}
</style>
