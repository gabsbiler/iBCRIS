<script setup>
import BirthMariages from '@/pages/household/member/tabs/birth-mariages.vue';
import Death from '@/pages/household/member/tabs/death.vue';
import Demographic from '@/pages/household/member/tabs/demographic.vue';
import Health from '@/pages/household/member/tabs/health.vue';
import Skills from '@/pages/household/member/tabs/skills-dev.vue';
import Residency from '@/pages/household/member/tabs/residency.vue';
import SocioCivi from '@/pages/household/member/tabs/sociocivi.vue'
import teenagePregnancy from '@/pages/household/member/tabs/teenage-pregnancy.vue'
import avatar1 from '@images/avatars/avatar-1.png';

import axios from "axios"

const route = useRoute()

const activeTab = ref(route.params.tab)

const member = ref()
const lookups = ref([])
const householdInfo = ref()


const teenage_pregnant = ref(false)
const death=ref(false)

const tabs = [
  {
    title: 'Demographics',
    icon: 'mdi-account-outline',
    tab: 'demographics',
  },
  {
    title: 'Skills Dev & Economic Act.',
    icon: 'mdi-lock-open-outline',
    tab: 'skills-dev',
  },
  {
    title: 'Residency & Migration',
    icon: 'mdi-lock-open-outline',
    tab: 'residency',
  },
  {
    title: 'Birth & Marriages',
    icon: 'mdi-bookmark-outline',
    tab: 'birth-marriages',
  },
  
  {
    title: 'Health Information',
    icon: 'mdi-medication',
    tab: 'health',
  },
  {
    title: 'Socio Civi Information',
    icon: 'mdi-account-details',
    tab: 'sociocivi',
  },
  {
    title: 'Teenage Pregnancy',
    icon: 'mdi-human-pregnant',
    tab: 'teenage-pregnancy',
  },
]

async function fetchHousehold(){
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

async function fetchMember() {
  try {
    const response = await axios.get('/api/household-member', {
      params: {
        member_id: route.query.member_id,
        household_id: route.query.household_id
      }
    })

    member.value = response.data
    // console.log(member.value.demographic.tags.split(','))
    for (var item of member.value.demographic.tags.split(','))  {
      death.value = item.trim()=="dead" ? true : false
    }
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

onMounted(() => {
  fetchLookup()
  fetchMember()
  fetchHousehold()
})
</script>

<template>
  <div v-if="member && householdInfo">
    <VCard v-if="householdInfo">

      <VCardText
        class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-4"
        style="min-height: 160px;"
      >
        <VRow>
          <VCol>
              <VAvatar
                rounded
                size="125"
                :image="avatar1"
                class="user-profile-avatar mx-auto"
              />
          </VCol>
        </VRow>
        <div class="user-profile-info w-100 d-flex">
          <div class="mt-auto w-100">
            <VRow>
              <VCol
                cols="12"
              >
                <VRow class="mt-auto">
                  <VCol>
                    <h1>{{ member.demographic.lastname }}, {{ member.demographic.firstname }} {{ member.demographic.middlename }}</h1>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="10">
                    <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-5">
                      <span class="d-flex align-center">
                        <VText>Brgy (Purok/Sitio):<b class="text-primary">{{ householdInfo.Barangay }}</b></VText>
                      </span>
                      <span class="d-flex align-center">
                        <VText>BSN:<b class="text-primary">{{ householdInfo.BSN }}</b></VText>
                      </span>
                      <span class="d-flex align-center">
                        <VText>HUSN:<b class="text-primary">{{ householdInfo.HUSN }}</b></VText>
                      </span>
                      <span class="d-flex align-center">
                        <VText>HSN:<b class="text-primary">{{ householdInfo.HSN }}</b></VText>
                      </span>
                      <!-- <span class="d-flex align-center">
                        <VText>Complete Address:<b>{{ householdInfo.GeographicIdentification.Address }}</b></VText>
                      </span> -->
                    </div>
                  </VCol>
                  <VCol cols="2">
                    <VBtn color="primary ms-auto">
                      Change Photo
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </div>
        </div>
      </VCardText>
    </VCard>
    <VRow>
      <VCol cols="12" class="mt-5">
        <VTabs
          v-model="activeTab"
          direction="horizontal"
          class="v-tabs-pill"
        >
          <VTab
            v-if="!death"
            v-for="item in tabs"
            :key="item.icon"
            :value="item.tab"
            :to="{ name: 'household-member-tab', params: { tab: item.tab }, query:{member_id:route.query.member_id, household_id:route.query.household_id}}"
          >
              <VIcon
                size="20"
                start
                :icon="item.icon"
              />
              {{ item.title }}
          </VTab>
          <VTab
            v-if="death"
            key="mdi-coffin"
            value="death"
            :to="{ name: 'household-member-tab', params: { tab: 'death' }, query:{member_id:route.query.member_id, household_id:route.query.household_id}}"
          >
            <VIcon
              size="20"
              start
              icon="mdi-coffin"
            />
            Death
          </VTab>

          
        </VTabs>
      </VCol>
      <VCol cols="12">
        <VWindow
          v-model="activeTab"
          class="disable-tab-transition"
          :touch="true"
        >
          <!-- Demographics -->
          <VWindowItem value="demographics">
            <Demographic :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!-- Skills Development -->
          <VWindowItem value="skills-dev">
            <Skills :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!--Residency -->
          <VWindowItem value="residency">
            <Residency :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!-- Registration of Birth and Mariages -->
          <VWindowItem value="birth-marriages">
            <BirthMariages :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!-- Death -->
          <VWindowItem value="death">
            <Death :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!-- Death -->
          <VWindowItem value="health">
            <Health :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!-- Socio Civi Information -->
          <VWindowItem value="sociocivi">
            <SocioCivi :member="member" :lookups="lookups"/>
          </VWindowItem>

          <!-- Teenage Pregnancy -->
          <VWindowItem value="teenage-pregnancy">
            <teenagePregnancy :member="member" :lookups="lookups"/>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
    

    
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-household-member-tab
</route>
