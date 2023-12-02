<script setup>
import BirthMariages from '@/pages/household/member/tabs/birth-mariages.vue';
import Death from '@/pages/household/member/tabs/death.vue';
import Demographic from '@/pages/household/member/tabs/demographic.vue';
import Health from '@/pages/household/member/tabs/health.vue';
import Residency from '@/pages/household/member/tabs/residency.vue';
import SocioCivi from '@/pages/household/member/tabs/sociocivi.vue'
import teenagePregnancy from '@/pages/household/member/tabs/teenage-pregnancy.vue'

import axios from "axios"

const route = useRoute()

const activeTab = ref(route.params.tab)

const member = ref()
const lookups = ref([])


const teenage_pregnant = ref(false)
const death=ref(false)

const tabs = [
  {
    title: 'Demographics',
    icon: 'mdi-account-outline',
    tab: 'demographics',
  },
  {
    title: 'Residency/Migration',
    icon: 'mdi-lock-open-outline',
    tab: 'residency',
  },
  {
    title: 'Registration of Birth and Mariages',
    icon: 'mdi-bookmark-outline',
    tab: 'birth-mariages',
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
  }
]

async function fetchMember() {
  try {
    const response = await axios.get('/api/household-member', {
      params: {
        member_id: route.query.member_id,
        household_id: route.query.household_id
      }
    })

    member.value = response.data
    console.log(member.value.demographic.tags.split(','))
    for (var item of member.value.demographic.tags.split(','))  {
      death.value = item.trim()=="dead" ? true : false
      teenage_pregnant.value = item.trim()=="teenage_pregnancy" ? true : false
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
})
</script>

<template>
  <div v-if="member">
    <VTabs
      v-model="activeTab"
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

      <VTab
        v-if="teenage_pregnant"
        key="mdi-human-pregnant"
        value="teenage-pregnancy"
        :to="{ name: 'household-member-tab', params: { tab: 'teenage-pregnancy' }, query:{member_id:route.query.member_id, household_id:route.query.household_id}}"
      >
        <VIcon
          size="20"
          start
          icon="mdi-human-pregnant"
        />
        Teenage Pregnancy
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-4 disable-tab-transition"
      :touch="true"
    >
      <!-- Demographics -->
      <VWindowItem value="demographics">
        <Demographic :member="member" :lookups="lookups"/>
      </VWindowItem>

      <!-- Residency -->
      <VWindowItem value="residency">
        <Residency :member="member" :lookups="lookups"/>
      </VWindowItem>

      <!-- Registration of Birth and Mariages -->
      <VWindowItem value="birth-mariages">
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
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-household-member-tab
</route>
