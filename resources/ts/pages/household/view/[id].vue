<script setup>
import axios from '@axios';
import avatar1 from '@images/avatars/avatar-1.png';
import backdrop from '@images/pages/background-1.jpg';
import { VDataTable } from 'vuetify/labs/VDataTable';

const route = useRoute()
const router = useRouter()
const householdInfo = ref()
const progress = ref(97)
const search = ref()

const lookups = ref([])

const addMemberConfirmationBox = ref(false)
const deleteMemberConfirmationBox = ref(false)

const memberIdToDelete = ref(null);

const isSnackbarSuccessVisible = ref(false)
const alertMessage = ref()
const type = ref()

const showSnackBar = data =>{
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
  } catch (error) {
    console.log(error)
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
    key: 'demographic.lastname',
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
    console.log(response.data.message, newSurveyStatus); 
    householdInfo.value.surveyStatus = !newSurveyStatus
  } catch (error) {
    console.error('Error updating survey status:', error);
    // Handle the error, such as displaying an error message
  }
};

</script>

<template>
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
      <div class="d-flex h-0">
        <VAvatar
          rounded
          size="125"
          :image="avatar1"
          class="user-profile-avatar mx-auto"
        />
      </div>

      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <VRow>
            <VCol
              cols="12"
              sm="9"
            >
              <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-5">
                <span class="d-flex align-center">
                  <VText>Brgy (Purok/Sitio):<b>{{ householdInfo.Barangay }}</b></VText>
                </span>
                <span class="d-flex align-center">
                  <VText>BSN:<b>{{ householdInfo.BSN }}</b></VText>
                </span>
                <span class="d-flex align-center">
                  <VText>HUSN:<b>{{ householdInfo.HUSN }}</b></VText>
                </span>
                <span class="d-flex align-center">
                  <VText>HSN:<b>{{ householdInfo.HSN }}</b></VText>
                </span>
                <!-- <span class="d-flex align-center">
                  <VText>Complete Address:<b>{{ householdInfo.GeographicIdentification.Address }}</b></VText>
                </span> -->
              </div>
            </VCol>
            <VCol
              class="d-flex"
              cols="12"
              sm="3"
            >
              <VBtn
                class="mx-auto"
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
        <VCol offset-md="4">
          <VTextField
            v-model="search"
            density="compact"
            label="Search"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            dense
            outlined
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
        :items="householdInfo.household_members"
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

        <template #item.demographic.lastname="{ item }">
          {{ item.raw.demographic.lastname +', '+ item.raw.demographic.firstname + ' '+ item.raw.demographic.middlename }}
          <!-- {{ item.raw.demographic.lastname }} -->
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


        <!-- <template #item.Progress="{ }">
          <VProgressLinear
            v-model="progress"
            color="primary"
            height="20"
          >
            <template #default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </VProgressLinear>
        </template> -->

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
                Dead
              </VChip>
            </span>
            
            
          </span>
        </template>

      </VDataTable>
    </VCardText>
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
  </VCard>
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
